import React from 'react';
import { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import '../../sass/style.scss';

import Standby from './Standby';
import DecideOrder from './DecideOrder';
import Dice from './Dice';
import SquareEvent from './SquareEvent';
import MinigameReady from './MinigameReady';
import MinigameResult from './MinigameResult';
import Ending from './Ending';

import PlayingLayout from '../../components/PlayingLayout';
import SEO from '../../components/SEO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayingPageParentProps } from '../../ts/type/PlayingPageProps';



export default ({data, location}: PlayingPageParentProps): JSX.Element => {
  // インスタンス変数
  const [playingState, setPlayingState] = useState('');
  
  // ローカルストレージから現在の値を取得
  useEffect(() => {
    setPlayingState(localStorage.getItem(StorageKeys.playingState) ?? '');
  }, []);
  console.log('[SGPJ] [load] ' + StorageKeys.playingState + ' : ' + playingState);
  
  // 現在のストレージの状態によりページ内容の表示を変える
  let usePageElem: JSX.Element;
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
      break;
    default:
      usePageElem = (<div>ロード中...</div>);
      break;
  }
  
  return (
    <PlayingLayout>
      {usePageElem}
    </PlayingLayout>
  );
}


export const Head = () => {
  const pageTitle: string = 'SUGOROKU!!';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}


// ボード情報取得用クエリ
//   取得したデータは、ページの { data } に渡される
export const query = graphql`
  query {
    allBoardsJson {
      edges {
        node {
          board {
            goal
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
