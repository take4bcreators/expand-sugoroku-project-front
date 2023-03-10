import React from 'react';
import { useLocation } from '@reach/router';
import SetupBoard from './setupboard';
import SetupPlayer from './setupplayer';
import SetupConfirmation from './setupconfirmation';
import '../../sass/style.scss';


const PAGE_TITLE: string = 'はじめから | すごろくツール';

export default function Setup() {
  
  const locat = useLocation();
  const params = new URLSearchParams(locat.search);
  const state = params.get('state') ?? '';
  
  let usePageElem: JSX.Element = (<></>);
  switch (state) {
    case 'board':
      usePageElem = (<SetupBoard />);
      console.log('board');
      break;
    case 'player':
      usePageElem = (<SetupPlayer />);
      console.log('player');
      break;
    case 'confirmation':
      usePageElem = (<SetupConfirmation />);
      console.log('confirmation');
      break;
    default:
      break;
  }
  
  return (
    <>
      <div className='page'>
          {usePageElem}
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
