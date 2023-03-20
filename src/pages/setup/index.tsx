import React from 'react';
import { useLocation } from '@reach/router';
import { graphql } from 'gatsby'

import '../../sass/style.scss';

import SetupBoard from './board';
import SetupPlayer from './player';
import SetupConfirmation from './confirmation';

import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';



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
    <>
      <div>
          {usePageElem}
      </div>
    </>
  );
}


export function Head() {
  // @remind ページタイトルは GraphQLから取るようにする
  const PAGE_TITLE: string = 'はじめから | すごろくツール';
  return (
    <>
      <title>{PAGE_TITLE}</title>
    </>
  );
}


// ボード情報取得用クエリ（取得したデータは、ページの { data } に渡される）
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
