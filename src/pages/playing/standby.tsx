import React from 'react';
// import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss';

import type { PlayingStateIO } from '../../ts/type/PlayingStateIO';


const PAGE_TITLE: string = '〇〇さんのターン | すごろくツール';


export default function Standby(props: PlayingStateIO): JSX.Element {
  
  console.log('props.playingState : ' + props.playingState);
  
  return (
    <>
      <main>
        <section>
          <h1>〇〇さんのターン</h1>
          <p>現在地：</p>
          <p>現在のポイント：</p>
          <p>さいころをふる</p>
        </section>
        <section>
          <div>プレイヤー情報</div>
          <div>すごろく盤面</div>
          <Link to='/'>トップ画面へ</Link>
        </section>
      </main>
    </>
  )
}

export function Head() {
  return (
    <>
      <title>{PAGE_TITLE}</title>
    </>
  );
}

