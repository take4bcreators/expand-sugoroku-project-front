import React from 'react';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby'
import SEO from '../components/SEO';
import type { AllMinigamesJson } from '../ts/type/AllMinigamesJson';
import PlayingLayout from '../components/PlayingLayout';
import SvgButtonExit from '../icon/svg/SvgButtonExit';
import '../sass/style.scss';


export default () => {
  // ミニゲーム情報の取得
  // @note 【JSON取得項目定義箇所】 取得項目に変更がある場合は、ここの指定を変更する
  const minigameData = useStaticQuery<AllMinigamesJson>(
    graphql`
      query {
        allMinigamesJson {
          edges {
            node {
              detail
              name
              jsonId
            }
          }
        }
      }
    `
  )
  const minigames = minigameData.allMinigamesJson.edges;
  
  return (
    <PlayingLayout footerType="Normal">
      <section className="p-minigames-container">
        <h1 className="u-font-page-title">ミニゲームリスト</h1>
        <ul className="p-setup-board-menu p-setup-board-menu--full">
        {
          minigames.map((minigame, index) => {
            const minigameName = minigame.node.name;
            const minigameDetail = minigame.node.detail;
            const minigamePage = `/minigame/${minigame.node.jsonId}`;
            return (
              <React.Fragment key={index}>
                <a href={minigamePage} target='_blank'>
                  <li className="p-setup-board-menu-item p-setup-board-menu-item--mid p-setup-board-menu-item--pink">
                    {minigameName}
                  </li>
                </a>
                <p className="p-text-box p-text-box--detail">
                  {minigameDetail}
                </p>
              </React.Fragment>
            )
          })
        }
        </ul>
        <div className="p-control-buttons-container">
          <div className="p-control-buttons">
              <div className="p-control-button">
                <Link to="/">
                  <SvgButtonExit />
                </Link>
              </div>
          </div>
        </div>
      </section>
    </PlayingLayout>
  );
}

export const Head = () => {
  const pageTitle: string = 'ミニゲームリスト';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
