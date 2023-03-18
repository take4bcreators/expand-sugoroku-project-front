import { StorageKeys } from './StorageKeys';
import type { PlayerInfo } from '../type/PlayerInfo';
import type { PlayingPageChildProps } from '../type/PlayingPageProps';

import { PlayingStates } from './PlayingStates';



export default class SgpjSugorokuManager {
  
  // props: PlayingPageChildProps;
  storage: Storage;
  setPlayingStateFunc: React.Dispatch<React.SetStateAction<string>>;
  
  // constructor(props: PlayingPageChildProps, storage: Storage = localStorage) {
  constructor(setPlayingStateFunc: React.Dispatch<React.SetStateAction<string>>, storage: Storage = localStorage) {
    // this.props = props;
    this.setPlayingStateFunc = setPlayingStateFunc;
    this.storage = storage;
  }
  
  /** 指定した画面へ移動する */
  moveScreenTo(screen: string): void {
    this.storage.setItem(StorageKeys.playingState, screen);
    // this.props.setPlayingState(screen);
    this.setPlayingStateFunc(screen);
    return;
  }
  
  
}

