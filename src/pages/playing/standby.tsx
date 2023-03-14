import React from 'react';
import { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

// import { Link } from 'gatsby';
import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import type { PlayingStateIO } from '../../ts/type/PlayingStateIO';
import type { PlayerInfo } from '../../ts/type/PlayerInfo';



export default function Standby(props: PlayingStateIO): JSX.Element {
  console.log('props.playingState : ' + props.playingState);
  
  
  const data = useStaticQuery(graphql`
    query {
      allBoardsJson {
        edges {
          node {
            board {
              goal
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
  `)
  // console.log(' ------ useStaticQuery ------ ');
  // console.log(data.allBoardsJson.edges[0].node.board);
  // console.log(' ------ useStaticQuery ------ ');
  const board = data.allBoardsJson;
  
  
  
  // インスタンス変数
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [playBoard, setPlayBoard] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    // プレイヤーの数を取得
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    setPlayBoard(stio.getPlayingBoardID());
  }, []);
  console.log('[load] player : ' + player);
  
  
  let curLocationName = '';
  if (playBoard !== undefined) {
    const loc = player?.location;
    if (loc !== undefined) {
      curLocationName = board.edges[playBoard].node.square[loc].store.name;
    }
  }
  
  
  return (
    <>
      <main>
        <section>
          <h1>{player?.name ?? ''} さんのターン</h1>
          <p>現在地：{curLocationName}</p>
          <p>現在のポイント： {player?.point ?? ''}</p>
          <p>さいころをふる</p>
        </section>
      </main>
    </>
  )
}

// export function Head() {
//   return (
//     <>
//       <title>スタンバイ画面</title>
//     </>
//   );
// }


