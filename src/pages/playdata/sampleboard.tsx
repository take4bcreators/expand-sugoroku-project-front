import React from 'react';
// import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss';
// import { PlayingStates } from '../../ts/module/PlayingStates';
// import { StorageKeys } from '../../ts/module/StorageKeys';
// import PlayingLayout from '../../components/PlayingLayout';
import SEO from '../../components/SEO';



export default () => {
  return (
    <>
      <div>
        <h1>サンプルボード</h1>
        <p>これはサンプルボードです1！！</p>
        <p>これはサンプルボードです2！！</p>
        <p>これはサンプルボードです3！！</p>
        <p>これはサンプルボードです4！！</p>
        <p>これはサンプルボードです5！！</p>
      </div>
      <Link to="../board">
        戻る
      </Link>
    </>
  );
}

export const Head = () => {
  const pageTitle: string = 'サンプルボード';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
