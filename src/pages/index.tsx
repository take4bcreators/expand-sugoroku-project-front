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
    <>
      <h1>{PAGE_TITLE}</h1>
      <div>
        {playingState === '' ? <p>つづきから</p> : <Link to="playing/">つづきから</Link>}
      </div>
      <div>
        <Link to='setup/?state=board'>
          はじめから
        </Link>
      </div>
    </>
  );
}


export const Head = () => {
  return (
    <>
      <title>{PAGE_TITLE}</title>
    </>
  );
}
