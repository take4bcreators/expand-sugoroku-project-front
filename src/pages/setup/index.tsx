import React from 'react';
import { useLocation } from '@reach/router';
import { graphql } from 'gatsby'
import SEO from '../../components/SEO';
import SetupBoard from './board';
import SetupPlayer from './player';
import SetupPlayerIcon from './playericon';
import SetupConfirmation from './confirmation';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';
import PlayingLayout from '../../components/PlayingLayout';
import SvgTemporallyLogoText from '../../icon/svg/SvgTemporallyLogoText';
import '../../sass/style.scss';


type ThisPageProps = {
  data: AllBoardsJson,
}

export default ({ data }: ThisPageProps) => {
  const locat = useLocation();
  const params = new URLSearchParams(locat.search);
  const state = params.get('state') ?? '';
  let PageContents:  () => JSX.Element;
  switch (state) {
    case 'board':
      PageContents = () => <SetupBoard data={data} />;
      break;
    case 'playericon':
      const playerNum = params.get('playernum') ?? '';
      if (playerNum !== '') {
        const playerNumInt = parseInt(playerNum);
        if (!Number.isNaN(playerNumInt)) {
          PageContents = () => <SetupPlayerIcon playerNum={playerNumInt} />;
          break;
        }
      }
      PageContents = () => <SetupPlayer />;
      break;
    case 'player':
      PageContents = () => <SetupPlayer />;
      break;
    case 'confirmation':
      PageContents = () => <SetupConfirmation data={data} />;
      break;
    default:
      PageContents = () => <></>;
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
              <PageContents />
          </div>
        </section>
      </main>
    </PlayingLayout>
  );
}

export const Head = () => {
  return (
      <SEO
          pageTitle="はじめから | TEMPORALLY"
      />
  )
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
