import React from 'react';
import { Link } from "gatsby"
import '../sass/style.scss'


const PAGE_TITLE: string = 'すごろくツール';

export default function Home() {
  return (
    <>
      <h1>{PAGE_TITLE}</h1>
      <div>
        <Link to="/">
          つづきから
        </Link>
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
