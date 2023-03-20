import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';

import StorageDAO from '../../ts/module/StorageDAO';
import SgpjSugorokuManager from '../../ts/module/SgpjSugorokuManager';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
  const [resultElem, setResultElem] = useState<JSX.Element | undefined>(undefined);
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SgpjSugorokuManager | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SgpjSugorokuManager(props.setPlayingState, localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  if (typeof sgmgr === 'undefined') {
    console.error('[SGPJ] SgpjSugorokuManager is undefined');
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
    // ランダム配列を用いて各プレイヤーの順番を決定して連想配列で保持
    const resultMap = new Map();
    numberArr.forEach((value, index) => {
        playerInfoArr[index]['order'] = value;
        resultMap.set(value, playerInfoArr[index]['name']);
    });
    
    // 順番決め結果画面の要素の組み立て
    let playerNameElem: JSX.Element[] = [];
    for (let index = 0; index < resultMap.size; index++) {
        const orderNumber = index + 1;
        const playerName = resultMap.get(index);
        playerNameElem.push((
          <p key={orderNumber}>
            {orderNumber} : {playerName} さん
          </p>
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
