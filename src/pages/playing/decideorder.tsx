import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';



export default (props: PlayingPageChildProps): JSX.Element => {
  const [resultElem, setResultElem] = useState<JSX.Element | undefined>(undefined);
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SugorokuManager | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SugorokuManager(props.setPlayingState, localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  if (typeof sgmgr === 'undefined') {
    console.error('[SGPJ] sgmgr is undefined');
    return (<></>);
  }
  
  // 順番決めボタンが押された時の処理
  const decideOrder = (): void => {
    // 連番をランダムにした配列を生成
    const numPlayers = stdao.getNumPlayers();
    if (typeof numPlayers === 'undefined') {
      console.error('numPlayers is ' + numPlayers);
      // @remind ここにエラー時にトップへ戻る処理を追加する
      return;
    }
    const numberArr = [...Array(numPlayers).keys()];
    numberArr.sort(() => Math.random() - 0.5);
    
    // ストレージからユーザー情報を取得
    const playerInfoArr = stdao.getPlayerInfoObject();
    if (typeof playerInfoArr === 'undefined') {
      console.error('playerInfoArr is ' + playerInfoArr);
      // @remind ここにエラー時にトップへ戻る処理を追加する
      return;
    }
    
    // ランダム配列を用いて各プレイヤーの順番を決定してオブジェクト配列で保持
    type SetupPlayerInfo = {
      playerName: string,
      iconFile: string,
    }
    const displayResultArr: SetupPlayerInfo[] = [];
    numberArr.forEach((randomNumber, index) => {
        playerInfoArr[index].order = randomNumber;
        const playerInfo: SetupPlayerInfo = {
          playerName: playerInfoArr[index].name,
          iconFile: playerInfoArr[index].icon,
        }
        displayResultArr[randomNumber] = playerInfo;
    });
    
    // 順番決め結果画面の要素の組み立て
    let playerNameElem: JSX.Element[] = [];
    for (let index = 0; index < displayResultArr.length; index++) {
        const orderNumber = index + 1;
        const playerName = displayResultArr[index].playerName;
        const iconFile = displayResultArr[index].iconFile;
        let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + iconFile;
        if (iconFile === '' || typeof iconFile === 'undefined') {
          playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
        }
        
        playerNameElem.push((
          <div key={index}>
            <img
              src={playerIconSrc}
              alt="プレイヤーアイコン"
              width="50"
              height="50"
            />
            <p key={orderNumber}>
              {orderNumber} : {playerName} さん
            </p>
          </div>
        ))
    }
    const displayRetultElem = (
      <>
        <h1>-- 順番結果 --</h1>
        {
          playerNameElem.map((elem) => elem)
        }
        <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.Standby)}}>
          → 次に進む
        </Link>
      </>
    );
    
    // ストレージと情報保持用ステートにプレイヤー情報と結果表示用要素を戻す
    const newPlayerInfoJSON = JSON.stringify(playerInfoArr);
    stdao.setItem(StorageKeys.PlayingPlayers, newPlayerInfoJSON);
    setResultElem(displayRetultElem);
    return;
  }
  
  // 順番決めのボタンを押す前後で表示を変える
  let buttonElem = (<div onClick={decideOrder}>→→ ここをクリックしてください ←←</div>);
  if (typeof resultElem !== 'undefined') {
    buttonElem = resultElem;
  }
  
  return (
    <>
      <main>
        <section>
          <h1>順番決め</h1>
          {buttonElem}
        </section>
        <section>
          <div>
          </div>
        </section>
      </main>
    </>
  );
}
