import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import SvgButtonDice from '../../icon/svg/SvgButtonDice';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
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
      console.error('[SGPJ] numPlayers is undefined');
      return;
    }
    const numberArr = [...Array(numPlayers).keys()];
    numberArr.sort(() => Math.random() - 0.5);
    
    // ストレージからユーザー情報を取得
    const playerInfoArr = stdao.getPlayerInfoObject();
    if (typeof playerInfoArr === 'undefined') {
      console.error('[SGPJ] playerInfoArr is undefined');
      return;
    }
    
    // ランダム配列を用いて各プレイヤーの順番を決定してオブジェクト配列で保持
    type SetupPlayerInfo = {
      playerName: string,
      iconFile: string,
    }
    const sortedPlayerInfoList: SetupPlayerInfo[] = [];
    numberArr.forEach((randomNumber, index) => {
        playerInfoArr[index].order = randomNumber;
        const playerInfo: SetupPlayerInfo = {
          playerName: playerInfoArr[index].name,
          iconFile: playerInfoArr[index].icon,
        }
        sortedPlayerInfoList[randomNumber] = playerInfo;
    });
    
    // 順番決め結果画面の要素の組み立て
    const displayRetultElem = (
      <ul>
        {
          sortedPlayerInfoList.map((playerInfo, index) => {
            const orderNumber = index + 1;
            const animationDelaySec = index * 0.1;
            const playerName = playerInfo.playerName;
            const iconFile = playerInfo.iconFile ?? AppConst.DEFAULT_PLAYER_ICON_FILE;
            const playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + iconFile;
            
            return (
              <li
                key={index}
                className="p-setup-player-panel p-setup-player-panel--playing-decideorder"
              >
                <div className="p-playing-decideorder-player-panel-ordernumber">
                  {orderNumber}
                </div>
                <div className="p-setup-player-icon">
                  <img
                    src={playerIconSrc}
                    alt="プレイヤーアイコン"
                    width="50"
                    height="50"
                  />
                </div>
                <p className="p-setup-player-input p-setup-player-input--confirmation">
                  {playerName}
                </p>
              </li>
            )
          })
        }
      </ul>
    );
    
    // ストレージと情報保持用ステートにプレイヤー情報と結果表示用要素を戻す
    const newPlayerInfoJSON = JSON.stringify(playerInfoArr);
    stdao.setItem(StorageKeys.PlayingPlayers, newPlayerInfoJSON);
    setResultElem(displayRetultElem);
    return;
  }
  
  // 順番決めのボタンを押す前後で表示を変える
  let CenterButton = () => (
    <div className="p-playing-decideorder-dices">
      <div onClick={decideOrder} className="p-playing-decideorder-dices__image">
        <SvgButtonDice />
      </div>
      <div className="p-playing-decideorder-dices__text">
        押して順番ぎめ
      </div>
    </div>
  );
  let NextGuide = () => <></>;
  if (typeof resultElem !== 'undefined') {
    CenterButton = () => resultElem;
    NextGuide = () => (
      <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.Standby)}}>
        <div className="p-control-next-guide">
          <div className="p-control-next-panel">
            <div className="p-control-next-panel__text">
              最初の<wbr />プレイヤーへ
            </div>
          </div>
          <div className="p-control-next-icon">
            <SvgButtonNext />
          </div>
        </div>
      </Link>
    )
  }
  
  return (
    <>
      <main>
        <section className="p-playing-decideorder-container">
          <CenterButton />
        </section>
        <div className="p-control-buttons-container">
          <div className="p-control-buttons">
              <div className="p-control-button">
                <Link to='/'>
                  <SvgButtonExit />
                </Link>
              </div>
              <NextGuide />
          </div>
        </div>
      </main>
    </>
  );
}
