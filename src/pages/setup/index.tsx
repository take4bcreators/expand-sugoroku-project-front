import React from 'react';
import { useLocation } from '@reach/router';
import { graphql } from 'gatsby'
import SetupBoard from './board';
import SetupPlayer from './player';
import SetupPlayerIcon from './playericon';
import SetupConfirmation from './confirmation';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';
import '../../sass/style.scss';

import PlayingLayout from '../../components/PlayingLayout';
import SvgTemporallyLogoText from '../../icon/svg/SvgTemporallyLogoText';


type ThisPageProps = {
  data: AllBoardsJson,
}

export default ({ data }: ThisPageProps) => {
  const locat = useLocation();
  const params = new URLSearchParams(locat.search);
  const state = params.get('state') ?? '';
  let usePageElem: JSX.Element;
  switch (state) {
    case 'board':
      usePageElem = (<SetupBoard data={data} />);
      break;
    case 'playericon':
      const playerNum = params.get('playernum') ?? '';
      if (playerNum !== '') {
        const playerNumInt = parseInt(playerNum);
        if (!Number.isNaN(playerNumInt)) {
          usePageElem = (<SetupPlayerIcon playerNum={playerNumInt} />);
          break;
        }
      }
      usePageElem = (<SetupPlayer />);
      break;
    case 'player':
      usePageElem = (<SetupPlayer />);
      break;
    case 'confirmation':
      usePageElem = (<SetupConfirmation data={data} />);
      break;
    default:
      usePageElem = (<></>);
      break;
  }
  
  return (
    <PlayingLayout footerType="Normal">
      <main>
        <section className="p-setup">
          <h1 className="p-setup-logo">
            <SvgTemporallyLogoText />
          </h1>
          <div>
              {usePageElem}
          </div>
        </section>
      </main>
    </PlayingLayout>
  );
}


export const Head = () => {
  // @remind ページタイトルは GraphQLから取るようにする
  const PAGE_TITLE: string = 'はじめから | TEMPORALLY';
  return (
    <>
      <body className="f-sg-body" />
      <title>{PAGE_TITLE}</title>
    </>
  );
}


// ボード情報取得用クエリ（取得したデータは、ページの { data } に渡される）
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
