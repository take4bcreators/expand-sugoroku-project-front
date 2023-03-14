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
        プレイヤー情報
      </div>
      <Link to="../../playing/">
        すごろくに戻る
      </Link>
    </>
  );
}


export const Head = () => {
  const pageTitle: string = 'プレイヤー';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
