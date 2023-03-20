import React from 'react';
import { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import '../../sass/style.scss';

import Standby from './standby';
import DecideOrder from './decideOrder';
import Dice from './dice';
import SquareEvent from './squareEvent';
import MinigameReady from './minigameReady';
import MinigameResult from './minigameResult';
import Ending from './ending';

import PlayingLayout from '../../components/PlayingLayout';
import SEO from '../../components/SEO';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';
import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayingPageParentProps } from '../../ts/type/PlayingPageProps';



export default ({data, location}: PlayingPageParentProps): JSX.Element => {
  const [stio, setStio] = useState<SgpjStorageIO | undefined>(undefined);
  const [playingState, setPlayingState] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStio(new SgpjStorageIO(localStorage));
    setPlayingState(localStorage.getItem(StorageKeys.playingState) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stio === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  console.log('[SGPJ] [load] ' + StorageKeys.playingState + ' : ' + playingState);
  
  // 現在のストレージの状態によりページ内容の表示を変える
  let usePageElem: JSX.Element;
  let footerType: ('A' | 'B') = 'A';
  switch (playingState) {
    case PlayingStates.decideOrder:
      usePageElem = (
        <DecideOrder
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'B';
      break;
    case PlayingStates.standby:
      usePageElem = (
        <Standby
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'A';
      break;
    case PlayingStates.dice:
      usePageElem = (
        <Dice
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'B';
      break;
    case PlayingStates.squareEvent:
      usePageElem = (
        <SquareEvent
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'A';
      break;
    case PlayingStates.minigameReady:
      usePageElem = (
        <MinigameReady
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'A';
      break;
    case PlayingStates.minigameResult:
      usePageElem = (
        <MinigameResult
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'B';
      break;
    case PlayingStates.ending:
      usePageElem = (
        <Ending
          data={data}
          location={location}
          playingState={playingState}
          setPlayingState={setPlayingState}
        />
      );
      footerType = 'B';
      break;
    default:
      usePageElem = (<div>ロード中...</div>);
      break;
  }
  
  return (
    <PlayingLayout footerType={footerType}>
      {usePageElem}
    </PlayingLayout>
  );
}


export const Head = () => {
  // const pageTitle: string = 'SUGOROKU!!';
  // return (
  //     <SEO
  //         pageTitle={pageTitle}
  //     />
  // );
  
  const [playingState, setPlayingState] = useState('');
  useEffect(() => {
    setPlayingState(localStorage.getItem(StorageKeys.playingState) ?? '');
  }, []);
  
  let pageTitle = '';
  switch (playingState) {
    // case PlayingStates.decideOrder:
    //   pageTitle = '順番決め | SUGOROKU!!';
    //   break;
    // case PlayingStates.standby:
    //   pageTitle = '〇〇さんのターン | SUGOROKU!!';
    //   break;
    // case PlayingStates.dice:
    //   pageTitle = 'サイコロ | SUGOROKU!!';
    //   break;
    // case PlayingStates.squareEvent:
    //   pageTitle = 'マスイベント | SUGOROKU!!';
    //   break;
    // case PlayingStates.minigameReady:
    //   pageTitle = 'ミニゲーム | SUGOROKU!!';
    //   break;
    // case PlayingStates.minigameResult:
    //   pageTitle = 'ミニゲーム結果 | SUGOROKU!!';
    //   break;
    // case PlayingStates.ending:
    //   pageTitle = '最終結果 | SUGOROKU!!';
    //   break;
    default:
      pageTitle = 'SUGOROKU!!';
      break;
  }
  
  return (
      <SEO
          pageTitle={pageTitle}
      />
  );
}


// ボード情報取得用クエリ
//   取得したデータは、ページの { data } に渡される
export const query = graphql`
  query {
    allBoardsJson {
      edges {
        node {
          board {
            id
            name
          }
          square {
            id
            goalFlag
            event {
              skip
              point
              name
              move
              minigame
              flag
              desc
            }
            minigame {
              name
              id
              desc
            }
            store {
              name
              desc
            }
          }
        }
      }
    }
  }
`
