import React from 'react';
import { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Standby from './standby';
import DecideOrder from './decideOrder';
import Dice from './dice';
import SquareEvent from './squareEvent';
import MinigameReady from './minigameReady';
import MinigameResult from './minigameResult';
import Ending from './ending';
import PlayingLayout from '../../components/PlayingLayout';
import SEO from '../../components/SEO';
import StorageDAO from '../../ts/module/StorageDAO';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayingPageParentProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';


export default ({data, location}: PlayingPageParentProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [playingState, setPlayingState] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setPlayingState(localStorage.getItem(StorageKeys.PlayingState) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  console.log('[SGPJ] [load] ' + StorageKeys.PlayingState + ' : ' + playingState);
  
  // 現在のストレージの状態によりページ内容の表示を変える
  let usePageElem: JSX.Element;
  let footerType: ('A' | 'B') = 'A';
  switch (playingState) {
    case PlayingStates.DecideOrder:
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
    case PlayingStates.Standby:
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
    case PlayingStates.Dice:
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
    case PlayingStates.SquareEvent:
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
    case PlayingStates.MinigameReady:
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
    case PlayingStates.MinigameResult:
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
    case PlayingStates.Ending:
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
    <PlayingLayout footerType="Normal">
      {usePageElem}
    </PlayingLayout>
  );
}

export const Head = () => {
  // const stdao = new StorageDAO(localStorage);
  // const playingState = stdao.getItem(StorageKeys.PlayingState);
  // const player = stdao.getCurrentPlayer();
  // const playerName = player?.name;
  
  const SITE_TITLE: string = 'TEMPORALLY';
  const pageTitle = `すごろく | ${SITE_TITLE} `;
  // let pageTitle = SITE_TITLE;
  // switch (playingState) {
  //   case PlayingStates.DecideOrder:
  //     pageTitle = `順番決め | ${SITE_TITLE} `;
  //     break;
  //   case PlayingStates.Standby:
  //   case PlayingStates.Dice:
  //   case PlayingStates.SquareEvent:
  //     if (typeof playerName !== 'undefined') {
  //       pageTitle = `${playerName} | ${SITE_TITLE} `;
  //     }
  //     break;
  //   case PlayingStates.MinigameReady:
  //     pageTitle = `ミニゲーム | ${SITE_TITLE} `;
  //     break;
  //   case PlayingStates.MinigameResult:
  //     pageTitle = `ミニゲーム結果 | ${SITE_TITLE} `;
  //     break;
  //   case PlayingStates.Ending:
  //     pageTitle = `最終結果 | ${SITE_TITLE} `;
  //     break;
  //   default:
  //     break;
  // }
  
  return (
      <SEO
          pageTitle={pageTitle}
      />
  );
}


// ボード情報取得用クエリ
//   取得したデータは、ページの { data } に渡される
// @note 【JSON取得項目定義箇所】 取得項目に変更がある場合は、ここの指定を変更する
export const query = graphql`
  query {
    allBoardsJson {
      edges {
        node {
          board {
            id
            name
            base
          }
          square {
            id
            goalflag
            event {
              skip
              point
              name
              move
              minigame
              flag
              detail
            }
            minigame {
              name
              id
              detail
            }
            store {
              name
              name_kana
              id
              catch
              genre_catch
              open
              address
              access
              photo
            }
          }
        }
      }
    }
  }
`
