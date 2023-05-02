import React from 'react';
import { Link } from 'gatsby';
import '../sass/style.scss';
import { graphql, useStaticQuery } from 'gatsby'
import type { AllMinigamesJson } from '../ts/type/AllMinigamesJson';




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
    <section>
      <h1>ミニゲーム一覧</h1>
      <section>
        {
          minigames.map((minigame, index) => {
            const minigameName = minigame.node.name;
            const minigameDetail = minigame.node.detail;
            const minigamePage = `/minigame/${minigame.node.jsonId}`;
            return (
              <section key={index}>
                <div>---------------------</div>
                <h1>{minigameName}</h1>
                <ul>
                  <li>{minigameDetail}</li>
                  <li>
                    <a href={minigamePage} target='_blank'>
                      → あそぶ
                    </a>
                  </li>
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
