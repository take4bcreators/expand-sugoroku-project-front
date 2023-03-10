import React from 'react';
// import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss';


const PAGE_TITLE: string = '順番決め | すごろくツール';


export default function DecideOrder() {
  
  
  return (
    <>
      <main>
        <section>
          <h1>順番決め</h1>
          <p>-- 画面をクリックしてください --</p>
        </section>
        <section>
          <div>
          </div>
        </section>
        <section>
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

