import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "gatsby"
import '../../sass/style.scss'

import StorageDAO from '../../ts/module/StorageDAO';

import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';


type ThisPageProps = {
  data: AllBoardsJson,
}

export default ({ data }: ThisPageProps) => {
  const [boardID, setBoardID] = useState('');
  const [playerList, setPlayerList] = useState(['']);
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setBoardID(localStorage.getItem(StorageKeys.SetupBoard) ?? '');
    const playerListJSON = localStorage.getItem(StorageKeys.SetupPlayer) ?? '[""]';
    setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  
  // 選択中のボードのボードIDと名前を取得する
  const boards = data.allBoardsJson.edges;
  const selectedBoard = boards.filter(board => board.node.board.id === boardID)[0];
  const selectedBoardID = selectedBoard.node.board.id;
  const selectedBoardName = selectedBoard.node.board.name;
  
  
  const saveNewGameData = (): void => {
    // プレイヤー配列から空要素を除去
    const cleanPlayerList = playerList.filter(Boolean);
    // プレイヤー数は 1000 人以下に限定する
    if (cleanPlayerList.length > 1000) {
      // @remind エラー表示処理を追加したい（画面上部にエラー表示→トップに自動遷移）
      console.error('cleanPlayerList.length is ' + cleanPlayerList.length);
      return;
    }
    // プレイヤー情報配列の生成
    const playersInfoArr = [];
    for (const index in cleanPlayerList) {
        const playerID = index.padStart(3, '0');
        const onePlayerObj: PlayerInfo = {
            id: playerID,
            name: cleanPlayerList[index],
            icon: '0',
            order: -1,
            point: 0,
            location: 0,
            skipcnt: 0,
            isfinish: false,
        };
        playersInfoArr.push(onePlayerObj);
    }
    const playersInfoJSON = JSON.stringify(playersInfoArr);
    
    // 今回使用するボードの情報をJSONに変換
    const boardDataJSON = JSON.stringify(selectedBoard.node);
    
    // ゲーム実施用ストレージをセット
    stdao.setItem(StorageKeys.PlayingNumPlayers, cleanPlayerList.length.toString()); // プレイヤー人数
    stdao.setItem(StorageKeys.PlayingBoard, selectedBoardName); // ボード名
    stdao.setItem(StorageKeys.PlayingBoardID, selectedBoardID); // ボードID
    stdao.setItem(StorageKeys.PlayingPlayers, playersInfoJSON); // プレイヤー情報のオブジェクト配列
    stdao.setItem(StorageKeys.PlayingState, PlayingStates.DecideOrder); // 状態ID
    stdao.setItem(StorageKeys.PlayingCurrentOrderNum, '0'); // 現在の順番番号
    stdao.setItem(StorageKeys.PlayingLastDiceNum, '-1'); // サイコロの出目
    stdao.setItem(StorageKeys.PlayingBoardData, boardDataJSON); // ボードの内容情報
    stdao.setItem(StorageKeys.PlayingIsEnd, 'false'); // 終了フラグ
    stdao.setItem(StorageKeys.PlayingLastMinigameRank, ''); // ミニゲームの結果（ランク文字列）
    stdao.setItem(StorageKeys.PlayingLastMinigameKey, ''); // ミニゲームの結果を保存するためのキー
  }
  
  const removeSetupData = (): void => {
    stdao.removeItem(StorageKeys.SetupBoard);
    stdao.removeItem(StorageKeys.SetupPlayer);
  }
  
  
  return (
    <>
      <main>
        <div>
          <div>1.ボード選択</div>
          <div>2.プレイヤー情報入力</div>
          <div><em>3.確認</em></div>
        </div>
        <section>
          <h1>確認</h1>
          <h2>ボード</h2>
          <p>{selectedBoardName}</p>
          <h2>プレイヤー</h2>
          {
            playerList.map((playerName, index) => {
              return (
                <p className='player' key={index}>
                  {playerName}
                </p>
              )
            })
          }
        </section>
        <form name="userForm">
          <button type="button" name="prevbtn" className="c-button">
            <Link to='./?state=player'>戻る</Link>
          </button>
          <button type="button" name="nextbtn" className="c-button">
            <Link to='/playing/' onClick={() => {
                saveNewGameData();
                removeSetupData();
            }}>
              ゲームスタート！
            </Link>
          </button>
        </form>
      </main>
    </>
  )
}
