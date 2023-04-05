import { GatsbyNode } from 'gatsby'
import path from 'path'
import type { AllBoardsJson } from './src/ts/type/AllBoardsJson';


export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions: { createPage } }) => {
  // graphql による情報の取得
  const result = await graphql<AllBoardsJson>(`
    query {
      allBoardsJson {
        edges {
          node {
            board {
              id
              base
            }
          }
        }
      }
    }
  `)
  
  if (result.errors) {
    throw result.errors;
  }
  
  if (typeof result.data === 'undefined') {
    console.error('result.data is undefined');
    return;
  }
  
  // graphql のデータを使用してのページ定義
  const boards = result.data.allBoardsJson.edges;
  boards.forEach(board => {
    createPage({
      path: `/boards/${board.node.board.base}/${board.node.board.id}/`,
      component: path.resolve(`src/templates/boards/${board.node.board.base}.tsx`),
      context: {
        boardId: board.node.board.id,
      }
    })
  });
}
