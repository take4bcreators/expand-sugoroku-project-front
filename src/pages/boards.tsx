import React from 'react';
import { Link } from 'gatsby';
import '../sass/style.scss';
import { graphql, useStaticQuery } from 'gatsby'
import type { AllBoardsJson } from '../ts/type/AllBoardsJson';




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
    <section>
      <h1>ボード一覧</h1>
      <section>
        {
          boards.map((board, index) => {
            const boardName = board.node.board.name;
            const boardPage = `/boards/${board.node.board.base}/${board.node.board.id}/`;
            return (
              <section key={index}>
                <div>---------------------</div>
                <h1>{boardName}</h1>
                <ul>
                  <li><a href={boardPage} target='_blank'>ボードのページへ</a></li>
                  {/* @remind PDFページへのリンクに差し替える */}
                  <li>PDF</li>
                </ul>
              </section>
            )
          })
        }
      </section>
      <section>
        <ul>
          <li><Link to='/'>トップへ戻る</Link></li>
        </ul>
      </section>
    </section>
  );
}


export const Head = () => {
  return (
    <>
      <title>ボード</title>
    </>
  );
}
