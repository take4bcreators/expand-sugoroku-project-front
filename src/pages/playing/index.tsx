import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from 'gatsby';
import '../../sass/style.scss';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';
import Standby from './standby';
import DecideOrder from './decideorder';

import PlayingLayout from '../../components/PlayingLayout';

import SEO from '../../components/SEO';





export default function Playing(): JSX.Element {
  
  
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
      usePageElem = (
        <DecideOrder playingState={playingState} setPlayingState={setPlayingState} />
      );
      break;
    case PlayingStates.standy:
      usePageElem = (
        <Standby playingState={playingState} setPlayingState={setPlayingState} />
      );
      break;
    default:
      break;
  }
  
  return (
    <>
      <PlayingLayout>
        {usePageElem}
      </PlayingLayout>
    </>
  );
}


export const Head = () => {
  const pageTitle: string = 'SUGOROKU!!';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
