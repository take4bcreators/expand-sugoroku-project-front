import { StorageKeys } from './StorageKeys';
import type { PlayerInfo } from '../type/PlayerInfo';


export default class SgpjStorageIO {
  
  /** オブジェクト内で使用するストレージ */
  strage: Storage;
  /** ストレージに入出力する際のキーとなる文字列 */
  playersKey: string = StorageKeys.playingPlayers;
  curOrderNumKey: string = StorageKeys.playingCurrentOrderNum;
  boardIdKey: string = StorageKeys.playingBoardID
  numPlayers: string = StorageKeys.playingNumPlayers
  
  
  constructor(strage: Storage = localStorage) {
    this.strage = strage;
  }
  
  
  /** 現在のプレイヤー情報オブジェクトを取得 */
  getCurrentPlayer(): PlayerInfo | undefined {
    // ストレージからプレイヤー情報を配列で取得
    const playerInfoArr = this.getPlayerInfoObject();
    if (playerInfoArr === undefined) {
      console.error('playerInfoArr is ' + playerInfoArr);
      return undefined;
    }
    
    // ストレージから現在の順番番号を取得
    const curOrder = this.getCurrentOrderNumber();
    if (curOrder === undefined) {
      console.error('curOrder is ' + curOrder);
      return undefined;
    }
    
    // プレイヤー情報と現在の順番番号から、現在のプレイヤーのオブジェクトを取得
    const curPlayerObject = playerInfoArr.find(e => e.order === curOrder);
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined;
    }
    return curPlayerObject;
  }
  
  /** 現在のプレイヤー名を取得 */
  getCurrentPlayerName(): string | undefined {
    const curPlayerObject = this.getCurrentPlayer();
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.name;
  }
  
  /** 現在のプレイヤーのポイントを取得 */
  getCurrentPlayerPoint(): number | undefined {
    const curPlayerObject = this.getCurrentPlayer();
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.point;
  }
  
  /** 現在のプレイヤーの場所番号を取得 */
  getCurrentPlayerLocation(): number | undefined {
    const curPlayerObject = this.getCurrentPlayer();
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.location;
  }
  
  
  
  
  
  /** ストレージからプレイヤー情報をオブジェクトで取得 */
  getPlayerInfoObject(): PlayerInfo[] | undefined {
    const playerInfoJSON = this.strage.getItem(this.playersKey);
    if (playerInfoJSON === null) {
      console.error('playerInfoJSON is ' + playerInfoJSON);
      return undefined;
    }
    let playerInfoArr: PlayerInfo[];
    try {
      playerInfoArr = JSON.parse(playerInfoJSON);
    } catch (error) {
      console.error('playerInfoJSON JSON.parse Error');
      return undefined;
    }
    return playerInfoArr;
  }
  
  
  /** ストレージから現在の順番番号を数値で取得 */
  getCurrentOrderNumber(): number | undefined {
    const curOrderStr = this.strage.getItem(this.curOrderNumKey);
    if (curOrderStr === null) {
      console.error('curOrderStr is ' + curOrderStr);
      return undefined;
    }
    const curOrder = parseInt(curOrderStr);
    if (isNaN(curOrder)) {
      console.error('curOrder is NaN');
      return undefined;
    }
    return curOrder;
  }
  
  /** 現在プレイ中のボードの番号を取得 */
  getPlayingBoardID(): number | undefined  {
    const playingBoardIdStr = this.strage.getItem(this.boardIdKey);
    if (playingBoardIdStr === null) {
      console.error('playingBoardIdStr is ' + playingBoardIdStr);
      return undefined;
    }
    const playingBoardID = parseInt(playingBoardIdStr);
    if (isNaN(playingBoardID)) {
      console.error('playingBoardID is NaN');
      return undefined;
    }
    return playingBoardID;
  }
  
  /** ストレージから現在のプレイヤー数を数値で取得 */
  getNumPlayers(): number | undefined {
    const numPlayersStr = this.strage.getItem(this.numPlayers);
    if (numPlayersStr === null) {
      console.error('numPlayersStr is ' + numPlayersStr);
      return undefined;
    }
    const numPlayersInt = parseInt(numPlayersStr);
    if (isNaN(numPlayersInt)) {
      console.error('numPlayersInt is NaN');
      return undefined;
    }
    return numPlayersInt;
  }
  
  
  
  
  /** 現在のプレイヤー情報を更新 */
  updateCurrentPlayer(playerObject: PlayerInfo): boolean {
    // ストレージからプレイヤー情報を配列で取得
    const playerInfoArr = this.getPlayerInfoObject();
    if (playerInfoArr === undefined) {
      console.error('playerInfoArr is ' + playerInfoArr);
      return false;
    }
    
    // ストレージから現在の順番番号を取得
    const curOrder = this.getCurrentOrderNumber();
    if (curOrder === undefined) {
      console.error('curOrder is ' + curOrder);
      return false;
    }
    
    // プレイヤー情報と現在の順番番号から、現在のプレイヤーの配列内番号を取得
    const curPlayerIndex = playerInfoArr.findIndex(e => e.order === curOrder)
    if (curPlayerIndex === -1) {
      console.error('curPlayerIndex is ' + curPlayerIndex);
      return false;
    }
    
    // プレイヤーオブジェクトを更新後、文字列にしてストレージに保存
    playerInfoArr[curPlayerIndex] = playerObject;
    const nextPlayersJSON = JSON.stringify(playerInfoArr);
    this.strage.setItem(this.playersKey, nextPlayersJSON);
    return true;
  }
  
  
  /** 次の順番に更新 */
  updateNextOrderNum(): boolean {
    const curOrderNum = this.getCurrentOrderNumber();
    if (curOrderNum === undefined) {
      console.error('curOrderNum is ' + curOrderNum);
      return false;
    }
    
    // 現在のプレイヤー数を取得
    const numPlayersInt = this.getNumPlayers();
    if (numPlayersInt === undefined) {
      console.error('numPlayersInt is ' + numPlayersInt);
      return false;
    }
    
    //  次の順番番号を設定
    let nextOrder = curOrderNum + 1;
    if (nextOrder >= numPlayersInt) {
        nextOrder = 0;
    }
    localStorage.setItem(this.curOrderNumKey, nextOrder.toString());
    
    return true;
  }
  
  
  
  /** すべてのプレイヤーがゴールしたかを確認する */
  checkAllPlayersGoalReached(): boolean | undefined {
    // プレイヤー数を取得
    const numPlayers = this.getNumPlayers();
    if (numPlayers === undefined) {
      return undefined;
    }
    // プレイヤーオブジェクトを取得
    const playerObjects = this.getPlayerInfoObject();
    if (playerObjects === undefined) {
      return undefined;
    }
    // ゴール済みプレイヤーをカウント
    let finishedPlayerCount = 0;
    for (const playerObject of playerObjects) {
        if (playerObject['isfinish']) {
            finishedPlayerCount++;
        }
    }
    // 判定
    if (numPlayers === finishedPlayerCount) {
      return true;
    }
    return false;
  }
  
  
  
  
}