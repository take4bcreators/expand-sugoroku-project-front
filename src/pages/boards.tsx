import React from 'react';
import { Link } from 'gatsby';
import { graphql, useStaticQuery } from 'gatsby'
import SEO from '../components/SEO';
import type { AllBoardsJson } from '../ts/type/AllBoardsJson';
import PlayingLayout from '../components/PlayingLayout';
import SvgButtonExit from '../icon/svg/SvgButtonExit';
import '../sass/style.scss';


export default () => {
  // ボード情報の取得
  // @note 【JSON取得項目定義箇所】 取得項目に変更がある場合は、ここの指定を変更する
  const boardData = useStaticQuery<AllBoardsJson>(
    graphql`
      query {
        allBoardsJson {
          edges {
            node {
              board {
                id
                name
                base
              }
            }
          }
        }
      }
    `
  )
  const boards = boardData.allBoardsJson.edges;
  
  return (
    <PlayingLayout footerType="Normal">
      <section className="p-boards-container">
        <h1 className="u-font-page-title">ボードリスト</h1>
        <ul className="p-setup-board-menu p-setup-board-menu--full">
        {
          boards.map((board, index) => {
            const boardName = board.node.board.name;
            const boardPage = `/boards/${board.node.board.base}/${board.node.board.id}/`;
            return (
              <a href={boardPage} target='_blank' key={index}>
                <li className="p-setup-board-menu-item p-setup-board-menu-item--mid p-setup-board-menu-item--pink">
                  {boardName}
                </li>
              </a>
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
  const pageTitle: string = 'ボードリスト';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
