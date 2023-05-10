import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "gatsby"
import StorageDAO from '../../ts/module/StorageDAO';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';
import '../../sass/style.scss'
import { AppConst } from '../../ts/config/const';

import SetupProgressTracker from '../../components/SetupProgressTracker';
import SvgButtonPrev from '../../icon/svg/SvgButtonPrev';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';


type ThisPageProps = {
  data: AllBoardsJson,
}

export default ({ data }: ThisPageProps) => {
  const [boardID, setBoardID] = useState('');
  const [playerList, setPlayerList] = useState(['']);
  const [playerIconList, setPlayerIconList] = useState(['']);
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setBoardID(localStorage.getItem(StorageKeys.SetupBoard) ?? '');
    const playerListJSON = localStorage.getItem(StorageKeys.SetupPlayer) ?? '[""]';
    try {
      setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    } catch (error) {
      setPlayerList(['']);
    }
    const playerIconListJSON = localStorage.getItem(StorageKeys.SetupPlayerIcon) ?? '[""]';
    try {
      setPlayerIconList(JSON.parse(playerIconListJSON) ?? ['']);
    } catch (error) {
      setPlayerIconList(['']);
    }
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  
  // 選択中のボードのボードIDと名前を取得する
  const boards = data.allBoardsJson.edges;
  const selectedBoard = boards.filter(board => board.node.board.id === boardID)[0];
  const selectedBoardID = selectedBoard.node.board.id;
  const selectedBoardName = selectedBoard.node.board.name;
  
  // プレイヤー名とアイコンをまとめたプレイヤー情報オブジェクトの作成
  const playerIconListCopy = playerIconList.slice(0, playerList.length);
  type SetupPlayerInfo = {
    playerName: string,
    iconFile: string,
  }
  const playerInfoList: SetupPlayerInfo[] = [];
  for (let index = 0; index < playerList.length; index++) {
    // プレイヤー名がない場合、プレイヤー情報としては無視する
    if (playerList[index] === '' || playerList[index] === null || typeof playerList[index] === 'undefined') {
      continue;
    }
    // プレイヤーアイコンがない場合はデフォルトにする
    let iconFile = playerIconListCopy[index];
    if (iconFile === '' || iconFile === null || typeof iconFile === 'undefined') {
      iconFile = AppConst.DEFAULT_PLAYER_ICON_FILE;
    }
    const playerInfo: SetupPlayerInfo = {
      playerName: playerList[index],
      iconFile: iconFile,
    };
    playerInfoList.push(playerInfo);
  }
  
  // ゲームスタート時にストレージに必要なデータを保存する
  const saveNewGameData = (): void => {
    // プレイヤー情報配列の生成
    const playersInfoArr = [];
    for (let index = 0; index < playerInfoList.length; index++) {
      const onePlayerObj: PlayerInfo = {
          id: index.toString().padStart(3, '0'),
          name: playerInfoList[index].playerName,
          icon: playerInfoList[index].iconFile,
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
    stdao.setItem(StorageKeys.PlayingNumPlayers, playerInfoList.length.toString()); // プレイヤー人数
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
  
  // ゲームスタート時にストレージからセットアップ用情報を削除する
  const removeSetupData = (): void => {
    stdao.removeItem(StorageKeys.SetupBoard);
    stdao.removeItem(StorageKeys.SetupPlayer);
    stdao.removeItem(StorageKeys.SetupPlayerIcon);
  }
  
  return (
    <>
      <SetupProgressTracker length={3} current={2} />
      <section className="p-setup-confirmation-container">
        <ul className="p-setup-confirmation-board">
          <li className="p-setup-board-menu-item p-setup-board-menu-item--confirmation">
            {selectedBoardName}
          </li>
        </ul>
        <ul>
          {
            playerInfoList.map((playerInfo, index) => {
              return (
                <li key={index} className="p-setup-player-panel p-setup-player-panel--confirmation">
                  <div className="p-setup-player-icon">
                    <img
                      src={AppConst.PLAYER_ICON_DIR + '/' + playerInfo.iconFile}
                      alt="プレイヤーアイコン"
                      width="50"
                      height="50"
                    />
                  </div>
                  <p className="p-setup-player-input p-setup-player-input--confirmation">
                    {playerInfo.playerName}
                  </p>
                </li>
              )
            })
          }
        </ul>
      </section>
      <div className="p-control-buttons-container">
        <div className="p-control-buttons">
          <div className="p-control-button">
            <Link to='./?state=player'>
              <SvgButtonPrev />
            </Link>
          </div>
          <Link to='/playing/' onClick={() => {
            saveNewGameData();
            removeSetupData();
          }}>
            <div className="p-control-next-guide">
              <div className="p-control-next-panel">
                <div className="p-control-next-panel__text">
                  ゲーム<wbr />スタート！
                </div>
              </div>
              <div className="p-control-next-icon">
                <SvgButtonNext />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
