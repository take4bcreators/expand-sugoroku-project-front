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
  
  // return (
  //   <section>
  //     <h1>ボード一覧</h1>
  //     <section>
  //       {
  //         boards.map((board, index) => {
  //           const boardName = board.node.board.name;
  //           const boardPage = `/boards/${board.node.board.base}/${board.node.board.id}/`;
  //           return (
  //             <section key={index}>
  //               <div>---------------------</div>
  //               <h1>{boardName}</h1>
  //               <ul>
  //                 <li><a href={boardPage} target='_blank'>ボードのページへ</a></li>
  //                 {/* @remind PDFページへのリンクに差し替える */}
  //                 <li>PDF</li>
  //               </ul>
  //             </section>
  //           )
  //         })
  //       }
  //     </section>
  //     <section>
  //       <ul>
  //         <li><Link to='/'>トップへ戻る</Link></li>
  //       </ul>
  //     </section>
  //   </section>
  // );
  
  
  // return (
  //   <PlayingLayout footerType="Normal">
  //     <section className="p-boards-container">
  //       {
  //         boards.map((board, index) => {
  //           const boardName = board.node.board.name;
  //           const boardPage = `/boards/${board.node.board.base}/${board.node.board.id}/`;
  //           return (
  //             <section className="p-square-event-card p-square-event-card--two-column p-square-event-card--green" key={index}>
  //               <h2 className="p-square-event-card__name p-square-event-card__name--two-column">
  //                 {boardName}
  //               </h2>
  //               <a href={boardPage} target='_blank' className="p-square-event-card__info-container p-square-event-card__info-container--two-column">
  //                 <p>
  //                   ボードのページへ
  //                 </p>
  //               </a>
  //             </section>
  //           )
  //         })
  //       }
  //       <div className="p-control-buttons-container">
  //         <div className="p-control-buttons">
  //             <div className="p-control-button">
  //               <Link to="/">
  //                 <SvgButtonExit />
  //               </Link>
  //             </div>
  //         </div>
  //       </div>
  //     </section>
  //   </PlayingLayout>
  // );
  
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
  const pageTitle: string = 'ボード';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
