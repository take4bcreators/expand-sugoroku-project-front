import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

import '../../sass/style.scss';


import SgpjStorageIO from '../../ts/module/SgpjStorageIO';
import SgpjGameManager from '../../ts/module/SgpjSugorokuManager';

// import { PlayingStates } from '../../ts/module/PlayingStates';
// import { StorageKeys } from '../../ts/module/StorageKeys';

// import PlayingLayout from '../../components/PlayingLayout';

import SEO from '../../components/SEO';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';

export type ThisPageParentProps = {
    data: AllBoardsJson,
}


export default ({ data }: ThisPageParentProps): JSX.Element => {
  // インスタンス変数
  const [stio, setStio] = useState<SgpjStorageIO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    setStio(new SgpjStorageIO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [load] stio : ' + stio);
  
  if (typeof stio === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  
  // プレイヤーオブジェクト配列を取得してプレイ順にソート
  const players = stio.getPlayerInfoObject();
  if (typeof players === 'undefined') {
    console.error('[SGPJ] players is undefined');
    return (<></>);
  }
  players.sort((a, b) => a.order - b.order);
  
  // 現在のプレイヤーに印をつけるために情報を取得
  const curOrderNum = stio.getCurrentOrderNumber();
  
  // // 場所名の表示をするためにボード情報取得
  // const curPlayingBoardID = stio.getPlayingBoardID();
  // if (typeof curPlayingBoardID === 'undefined') {
  //   console.error('[SGPJ] curPlayingBoardID is undefined');
  //   return (<></>);
  // }
  // const playBoard = data.allBoardsJson.edges[curPlayingBoardID].node;
  
  // 場所名の表示をするためにボード情報取得
  const board = stio.getPlayingBoard();
  if (typeof board === 'undefined') {
    console.error('[SGPJ] curPlayingBoardID is undefined');
    return (<></>);
  }
  // const playBoard = data.allBoardsJson.edges[curPlayingBoardID].node;
  
  
  // 表示用に要素を組み立てる
  const buildElem = (
    <section>
      {
        players.map((player, index) => {
          // 現在の順番のプレイヤーで合った場合の表示
          let curOrderMark = '';
          if (player.order === curOrderNum) {
            curOrderMark = '★ ';
          }
          
          // 休みがあった場合の表示
          let statusInformation = 'なし';
          if (player.skipcnt > 0) {
            statusInformation = 'あと ' + player.skipcnt + ' 回休み';
          }
          
          // 現在の場所を取得
          const playerLocation = player.location;
          const playerLocationName = board.square[playerLocation].store.name;
          
          return (
            <section key={index}>
              <p>---------------------------------</p>
              <h1>{curOrderMark}{player.name} さん</h1>
              <ul>
                <li>順番：{player.order + 1} 番目</li>
                <li>ポイント：{player.point} pt.</li>
                <li>現在地：[{playerLocation}] {playerLocationName}</li>
                <li>ステータス：{statusInformation}</li>
              </ul>
              <p>---------------------------------</p>
            </section>
          );
        })
      }
    </section>
  );
  
  
  return (
    <>
      <h1>プレイヤー情報</h1>
      {buildElem}
      <Link to="../../playing/">
        すごろくに戻る
      </Link>
    </>
  );
}


export const Head = () => {
  const pageTitle: string = 'プレイヤー情報';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
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


