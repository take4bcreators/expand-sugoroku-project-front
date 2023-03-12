import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from 'gatsby';
import '../../sass/style.scss';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';
import Standby from './standby';
import DecideOrder from './decideorder';


const PAGE_TITLE: string = 'すごろくツール';



export default function Playing() {
  
  
  const [playingState, setPlayingState] = useState('');
  
  // ローカルストレージから現在の値を取得
  useEffect(() => {
    setPlayingState(localStorage.getItem(StorageKeys.playingState) ?? '');
  }, []);
  console.log('[load] ' + StorageKeys.playingState + ' : ' + playingState);
  
  let usePageElem: JSX.Element = (
    <>
      <div>
          ロード中...
      </div>
    </>
  );
  console.log('playingState : ' + playingState);
  switch (playingState) {
    case PlayingStates.decideOrder:
      usePageElem = (<DecideOrder />);
      break;
    case PlayingStates.standy:
      usePageElem = (<Standby />);
      break;
    default:
      break;
  }
  
  
  return (
    <>
      {usePageElem}
    </>
  );
}


// export function changeState(state: string): void {
//   setPlayingState(state);
//   localStorage.setItem(STORAGE_SAVE_KEY_NAME, state);
//   console.log('[save] ' + STORAGE_SAVE_KEY_NAME + state);
// }


export function Head() {
  return (
    <>
      <title>{PAGE_TITLE}</title>
    </>
  );
}
