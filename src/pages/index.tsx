import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { StorageKeys } from '../ts/config/StorageKeys';
import '../sass/style.scss';



const PAGE_TITLE: string = 'すごろくツール';

export default () => {
  const [playingState, setPlayingState] = useState('');
  useEffect(() => {
    setPlayingState(localStorage.getItem(StorageKeys.PlayingState) ?? '');
  }, []);
  
  return (
    <section>
      <h1>{PAGE_TITLE}</h1>
      <ul>
        <li>
          {playingState === '' ? <>つづきから</> : <Link to="playing/">つづきから</Link>}
        </li>
        <li><Link to='setup/?state=board'>はじめから</Link></li>
        <li><Link to='boards'>ボード一覧</Link></li>
        <li><Link to='minigames'>ミニゲーム一覧</Link></li>
      </ul>
    </section>
  );
}


export const Head = () => {
  return (
    <>
      <title>{PAGE_TITLE}</title>
    </>
  );
}
