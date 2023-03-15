import { StorageKeys } from './StorageKeys';
import type { PlayerInfo } from '../type/PlayerInfo';


export default class SgpjStorageIO {
  
  /** オブジェクト内で使用するストレージ */
  strage: Storage;
  /** ストレージに入出力する際のキーとなる文字列 */
  playersKey: string = StorageKeys.playingPlayers;
  curOrderNumKey: string = StorageKeys.playingCurrentOrderNum;
  boardIdKey: string = StorageKeys.playingBoardID
  
  
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
  
  
  
  
  
  
}
