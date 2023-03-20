import { StorageKeys, storageKeysType } from './StorageKeys';
import type { PlayerInfo } from '../type/PlayerInfo';
import type { BoardData } from '../type/BoardData';


export default class SgpjStorageIO {
  
  /** オブジェクト内で使用するストレージ */
  strage: Storage;
  /** ストレージに入出力する際のキーとなる文字列 */
  playersKey: string = StorageKeys.playingPlayers;
  curOrderNumKey: string = StorageKeys.playingCurrentOrderNum;
  boardIdKey: string = StorageKeys.playingBoardID;
  numPlayers: string = StorageKeys.playingNumPlayers;
  boardData: string = StorageKeys.playingBoardData;
  
  
  constructor(strage: Storage = localStorage) {
    this.strage = strage;
  }
  
  
  /** 単純にストレージから取得 */
  getItem(item: storageKeysType): string | null {
    return this.strage.getItem(item);
  }
  
  /** 単純にストレージへ保存 */
  setItem(key: storageKeysType, value: string): void {
    this.strage.setItem(key, value);
    return;
  }
  
  /** 単純にストレージから削除 */
  removeItem(key: storageKeysType): void {
    this.strage.removeItem(key);
    return;
  }
  
  /** ストレージから定義されているすべてのデータを削除 */
  removeAllItem(): void {
    for (const storageKey of Object.values(StorageKeys)) {
      this.strage.removeItem(storageKey);
    }
    return;
  }
  
  /** ストレージからすべてのデータを削除（内部でclear使用） */
  removeAllItemPurge(): void {
    this.strage.clear();
    return;
  }
  
  /** 現在のプレイヤー情報オブジェクトを取得 */
  getCurrentPlayer(): PlayerInfo | undefined {
    // ストレージからプレイヤー情報を配列で取得
    const playerInfoArr = this.getPlayerInfoObject();
    if (playerInfoArr === undefined) {
      console.warn('playerInfoArr is ' + playerInfoArr);
      return undefined;
    }
    
    // ストレージから現在の順番番号を取得
    const curOrder = this.getCurrentOrderNumber();
    if (curOrder === undefined) {
      console.warn('curOrder is ' + curOrder);
      return undefined;
    }
    
    // プレイヤー情報と現在の順番番号から、現在のプレイヤーのオブジェクトを取得
    const curPlayerObject = playerInfoArr.find(e => e.order === curOrder);
    if (curPlayerObject === undefined) {
      console.warn('curPlayerObject is ' + curPlayerObject);
      return undefined;
    }
    return curPlayerObject;
  }
  
  /** 現在のプレイヤー名を取得 */
  getCurrentPlayerName(): string | undefined {
    const curPlayerObject = this.getCurrentPlayer();
    if (curPlayerObject === undefined) {
      console.warn('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.name;
  }
  
  /** 現在のプレイヤーのポイントを取得 */
  getCurrentPlayerPoint(): number | undefined {
    const curPlayerObject = this.getCurrentPlayer();
    if (curPlayerObject === undefined) {
      console.warn('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.point;
  }
  
  /** 現在のプレイヤーの場所番号を取得 */
  getCurrentPlayerLocation(): number | undefined {
    const curPlayerObject = this.getCurrentPlayer();
    if (curPlayerObject === undefined) {
      console.warn('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.location;
  }
  
  
  
  
  
  /** ストレージからプレイヤー情報をオブジェクトで取得 */
  getPlayerInfoObject(): PlayerInfo[] | undefined {
    const playerInfoJSON = this.strage.getItem(this.playersKey);
    if (playerInfoJSON === null) {
      console.warn('playerInfoJSON is ' + playerInfoJSON);
      return undefined;
    }
    let playerInfoArr: PlayerInfo[];
    try {
      playerInfoArr = JSON.parse(playerInfoJSON);
    } catch (error) {
      console.warn('playerInfoJSON JSON.parse Error');
      return undefined;
    }
    return playerInfoArr;
  }
  
  
  /** ストレージから現在の順番番号を数値で取得 */
  getCurrentOrderNumber(): number | undefined {
    const curOrderStr = this.strage.getItem(this.curOrderNumKey);
    if (curOrderStr === null) {
      console.warn('curOrderStr is ' + curOrderStr);
      return undefined;
    }
    const curOrder = parseInt(curOrderStr);
    if (isNaN(curOrder)) {
      console.warn('curOrder is NaN');
      return undefined;
    }
    return curOrder;
  }
  
  // /** 現在プレイ中のボードの番号を取得 */
  // getPlayingBoardID(): number | undefined  {
  //   const playingBoardIdStr = this.strage.getItem(this.boardIdKey);
  //   if (playingBoardIdStr === null) {
  //     console.warn('playingBoardIdStr is ' + playingBoardIdStr);
  //     return undefined;
  //   }
  //   const playingBoardID = parseInt(playingBoardIdStr);
  //   if (isNaN(playingBoardID)) {
  //     console.warn('playingBoardID is NaN');
  //     return undefined;
  //   }
  //   return playingBoardID;
  // }
  
  
  /** 現在プレイ中のボードを取得 */
  getPlayingBoard(): BoardData | undefined {
    const playingBoardDataStr = this.strage.getItem(this.boardData);
    if (playingBoardDataStr === null) {
      console.warn('playingBoardDataStr is ' + playingBoardDataStr);
      return undefined;
    }
    let playingBoardData: BoardData;
    try {
      playingBoardData = JSON.parse(playingBoardDataStr);
    } catch (error) {
      console.warn('JSON.parse ERROR');
      console.warn(error);
      return undefined;
    }
    return playingBoardData;
  }
  
  
  
  /** ストレージから現在のプレイヤー数を数値で取得 */
  getNumPlayers(): number | undefined {
    const numPlayersStr = this.strage.getItem(this.numPlayers);
    if (numPlayersStr === null) {
      console.warn('numPlayersStr is ' + numPlayersStr);
      return undefined;
    }
    const numPlayersInt = parseInt(numPlayersStr);
    if (isNaN(numPlayersInt)) {
      console.warn('numPlayersInt is NaN');
      return undefined;
    }
    return numPlayersInt;
  }
  
  
  /** 現在ゴール済みのプレイヤーの数を返す
   * 情報取得に失敗した場合は NaN を返す
   */
  getGoalPlayerCount(): number {
    const players = this.getPlayerInfoObject();
    if (typeof players === 'undefined') {
      return NaN;
    }
    const count = players.filter(player => player.isfinish).length;
    return count;
  }
  
  
  /** 現在のプレイヤー情報を更新 */
  updateCurrentPlayer(playerObject: PlayerInfo): boolean {
    // ストレージからプレイヤー情報を配列で取得
    const playerInfoArr = this.getPlayerInfoObject();
    if (playerInfoArr === undefined) {
      console.warn('playerInfoArr is ' + playerInfoArr);
      return false;
    }
    
    // ストレージから現在の順番番号を取得
    const curOrder = this.getCurrentOrderNumber();
    if (curOrder === undefined) {
      console.warn('curOrder is ' + curOrder);
      return false;
    }
    
    // プレイヤー情報と現在の順番番号から、現在のプレイヤーの配列内番号を取得
    const curPlayerIndex = playerInfoArr.findIndex(e => e.order === curOrder)
    if (curPlayerIndex === -1) {
      console.warn('curPlayerIndex is ' + curPlayerIndex);
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
      console.warn('curOrderNum is ' + curOrderNum);
      return false;
    }
    
    // 現在のプレイヤー数を取得
    const numPlayersInt = this.getNumPlayers();
    if (numPlayersInt === undefined) {
      console.warn('numPlayersInt is ' + numPlayersInt);
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
  
  /** 現在のプレイヤーのお休み数を1減らす */
  decrementCurPlayerSkipCnt(): boolean {
    const curPlayer = this.getCurrentPlayer();
    if (curPlayer === undefined) {
      return false;
    }
    curPlayer.skipcnt = curPlayer.skipcnt - 1;
    if (curPlayer.skipcnt < 0) {
      curPlayer.skipcnt = 0;
    }
    const updateResult = this.updateCurrentPlayer(curPlayer);
    return updateResult;
  }
  
  
  
}
