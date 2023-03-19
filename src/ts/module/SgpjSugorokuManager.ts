import { StorageKeys } from './StorageKeys';


export default class SgpjSugorokuManager {
  storage: Storage;
  setPlayingStateFunc: React.Dispatch<React.SetStateAction<string>>;
  
  constructor(setPlayingStateFunc: React.Dispatch<React.SetStateAction<string>>, storage: Storage = localStorage) {
    this.setPlayingStateFunc = setPlayingStateFunc;
    this.storage = storage;
  }
  
  /** 指定した画面へ移動する */
  moveScreenTo(screen: string): void {
    this.storage.setItem(StorageKeys.playingState, screen);
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
    // ゴール順に応じたポイント
    // @remind 設定ファイルで管理したい
    const GOAL_POINT_MAP = new Map([
      [1, 100],
      [2, 50],
      [3, 30],
    ]);
    let goalPoint = GOAL_POINT_MAP.get(goalOrder);
    if (typeof goalPoint === 'undefined') {
      goalPoint = 0;
    }
    return goalPoint;
  }
  
  
  
}

