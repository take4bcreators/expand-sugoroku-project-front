import React from 'react';
import { useLocation } from '@reach/router';
import { graphql } from 'gatsby'

import SetupBoard from './setupboard';
import SetupPlayer from './setupplayer';
import SetupConfirmation from './setupconfirmation';
import '../../sass/style.scss';

import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';

const PAGE_TITLE: string = 'はじめから | すごろくツール';

type ThisPageProps = {
  data: AllBoardsJson,
}


export default ({ data }: ThisPageProps) => {
  
  const locat = useLocation();
  const params = new URLSearchParams(locat.search);
  const state = params.get('state') ?? '';
  
  let usePageElem: JSX.Element = (<></>);
  switch (state) {
    case 'board':
      usePageElem = (<SetupBoard data={data} />);
      console.log('board');
      break;
    case 'player':
      usePageElem = (<SetupPlayer />);
      console.log('player');
      break;
    case 'confirmation':
      usePageElem = (<SetupConfirmation data={data} />);
      console.log('confirmation');
      break;
    default:
      break;
  }
  
  return (
    <>
      <div>
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
