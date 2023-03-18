import { StorageKeys } from './StorageKeys';
import type { PlayerInfo } from '../type/PlayerInfo';
import type { PlayingPageChildProps } from '../type/PlayingPageProps';

import { PlayingStates } from './PlayingStates';



export default class SgpjSugorokuManager {
  
  props: PlayingPageChildProps;
  storage: Storage;
  
  constructor(props: PlayingPageChildProps, storage: Storage = localStorage) {
    this.props = props;
    this.storage = storage;
  }
  
  /** 指定した画面へ移動する */
  moveScreenTo(screen: string): void {
    this.storage.setItem(StorageKeys.playingState, screen);
    this.props.setPlayingState(screen);
    return;
  }
  
  
}

