import { StorageKeys } from './StorageKeys';
import type { PlayerInfo } from '../type/PlayerInfo';


export default class SgpjStorageIO {
  
  /** オブジェクト内で使用するストレージ */
  strage: Storage;
  
  constructor(strage: Storage = localStorage) {
    this.strage = strage;
  }
  
  /** 現在のプレイヤー情報オブジェクトを取得 */
  getCurrentPlayer(playersKey: string = StorageKeys.playingPlayers, curOrderKey: string = StorageKeys.playingCurrentOrderNum): PlayerInfo | undefined {
    // ストレージからプレイヤー情報を配列で取得
    const playerInfoArr = this.getPlayerInfoObject(playersKey);
    if (playerInfoArr === undefined) {
      console.error('playerInfoArr is ' + playerInfoArr);
      return undefined;
    }
    
    // ストレージから現在の順番番号を取得
    const curOrder = this.getCurrentOrderNumber(curOrderKey);
    if (curOrder === undefined) {
      console.error('curOrder is ' + curOrder);
      return undefined;
    }
    
    // プレイヤー情報と現在の順番番号から、現在のプレイヤーの名前を取得
    const curPlayerObject = playerInfoArr.find(e => e.order === curOrder);
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined;
    }
    return curPlayerObject;
  }
  
  /** 現在のプレイヤー名を取得 */
  getCurrentPlayerName(playersKey: string = StorageKeys.playingPlayers, curOrderKey: string = StorageKeys.playingCurrentOrderNum): string | undefined {
    const curPlayerObject = this.getCurrentPlayer(playersKey, curOrderKey);
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.name;
  }
  
  /** 現在のプレイヤーのポイントを取得 */
  getCurrentPlayerPoint(playersKey: string = StorageKeys.playingPlayers, curOrderKey: string = StorageKeys.playingCurrentOrderNum): number | undefined {
    const curPlayerObject = this.getCurrentPlayer(playersKey, curOrderKey);
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.point;
  }
  
  /** 現在のプレイヤーの場所番号を取得 */
  getCurrentPlayerLocation(playersKey: string = StorageKeys.playingPlayers, curOrderKey: string = StorageKeys.playingCurrentOrderNum): number | undefined {
    const curPlayerObject = this.getCurrentPlayer(playersKey, curOrderKey);
    if (curPlayerObject === undefined) {
      console.error('curPlayerObject is ' + curPlayerObject);
      return undefined
    }
    return curPlayerObject.location;
  }
  
  
  
  
  
  /** ストレージからプレイヤー情報をオブジェクトで取得 */
  getPlayerInfoObject(key: string = StorageKeys.playingPlayers): PlayerInfo[] | undefined {
    const playerInfoJSON = this.strage.getItem(key);
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
  getCurrentOrderNumber(key: string = StorageKeys.playingCurrentOrderNum): number | undefined {
    const curOrderStr = this.strage.getItem(key);
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
  
  
  getPlayingBoardID(key: string = StorageKeys.playingBoardID): number | undefined  {
    const playingBoardIdStr = this.strage.getItem(key);
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
  
  
  
  
}
