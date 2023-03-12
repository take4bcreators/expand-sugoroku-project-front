import React from 'react';
import { Link } from 'gatsby';
import '../sass/style.scss';

import { useState, useEffect } from 'react';
import { StorageKeys } from '../ts/module/StorageKeys';


const PAGE_TITLE: string = 'すごろくツール';

export default function Home() {
  
  // 初回であれば「つづきから」のリンクを無効にする
  const [playingState, setPlayingState] = useState('');
  useEffect(() => {
    setPlayingState(localStorage.getItem(StorageKeys.playingState) ?? '');
  }, []);
  let continueLink: JSX.Element = (<Link to="playing/">つづきから</Link>);
  if (playingState === '') {
    continueLink = (<p>つづきから</p>);
  }
  
  
  return (
    <>
      <h1>{PAGE_TITLE}</h1>
      <div>
        {continueLink}
      </div>
      <div>
        <Link to='setup/?state=board'>
          はじめから
        </Link>
      </div>
    </>
  );
}

export function Head() {
  return (
    <>
      <title>{PAGE_TITLE}</title>
    </>
  );
}
