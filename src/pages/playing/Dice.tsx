import React from 'react';
import { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';


import type { PlayingStateIO } from '../../ts/type/PlayingStateIO';
import type { PlayerInfo } from '../../ts/type/PlayerInfo';


// type Props = {
//   props: PlayingStateIO,
// }

// export default ({ props }: Props) => {
// export default function DecideOrder(props: PlayingStateIO): JSX.Element {
export default (props : PlayingStateIO) => {
  
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
  const board = data.allBoardsJson;
  
  
  // インスタンス変数
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [playBoard, setPlayBoard] = useState<number | undefined>(undefined);
  const [diceNumber, setDiceNumber] = useState<number | undefined>(undefined);
  
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
  
  
  
  const rollDice = () => {
    // 1 〜 6 までの数字でランダム値を生成
    const DICE_VALUE_COUNT = 6;
    const randomValue = Math.floor(Math.random() * DICE_VALUE_COUNT);
    const diceResult = randomValue + 1;
    setDiceNumber(diceResult);
  }
  
  
  
  let displayElem = (
    <>
      <p
        onClick={rollDice}
      >
        →→ クリックでサイコロをふる ←←
      </p>
      <Link
        to='/playing/'
        onClick={() => {
          localStorage.setItem(StorageKeys.playingState, PlayingStates.standy);
          props.setPlayingState(PlayingStates.standy);
        }}
      >
        ← 戻る
      </Link>
    </>
  );
  if (diceNumber !== undefined) {
    displayElem = (
      <>
        <p>「 {diceNumber} 」</p>
        <Link
            to='/playing/'
            onClick={() => {
              localStorage.setItem(StorageKeys.playingLastDiceNum, diceNumber.toString());
              localStorage.setItem(StorageKeys.playingState, PlayingStates.squareEvent);
              props.setPlayingState(PlayingStates.squareEvent);
            }}
        >
          マスに進む →→→
        </Link>
      </>
    )
  }
  
  
  return (
    <>
      <main>
        <section>
          <h1>{player?.name ?? ''} さんのターン</h1>
          <p>現在地：{curLocationName}</p>
          {displayElem}
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


