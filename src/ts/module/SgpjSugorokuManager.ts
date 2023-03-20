import { StorageKeys } from '../config/StorageKeys';
import { AppConst } from '../config/const';


export default class SgpjSugorokuManager {
  storage: Storage;
  setPlayingStateFunc: React.Dispatch<React.SetStateAction<string>>;
  
  constructor(setPlayingStateFunc: React.Dispatch<React.SetStateAction<string>>, storage: Storage = localStorage) {
    this.setPlayingStateFunc = setPlayingStateFunc;
    this.storage = storage;
  }
  
  /** 指定した画面へ移動する */
  moveScreenTo(screen: string): void {
    this.storage.setItem(StorageKeys.PlayingState, screen);
    this.setPlayingStateFunc(screen);
    return;
  }
  
  /** サイコロを振る */
  rollDice(): number {
    const DICE_VALUE_COUNT = 6;
    const randomValue = Math.floor(Math.random() * DICE_VALUE_COUNT);
    const diceResult = randomValue + 1;
    return diceResult;
  }
  
  /** ゴール時に付与されるポイントを返す */
  getGoalPoint(goalOrder: number): number {
    return AppConst.GOAL_POINTS.get(goalOrder) ?? 0;
  }
  
  
}

