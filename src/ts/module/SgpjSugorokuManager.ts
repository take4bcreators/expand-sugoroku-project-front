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
  
}

