import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
  console.log(props);
  
  // インスタンス変数
  const [stio, setStio] = useState<SgpjStorageIO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    setStio(new SgpjStorageIO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [load] player : ' + stio?.getCurrentPlayer());
  
  if (stio === undefined) {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  
  // すべてのプレイヤーがゴール済みであればエンディング画面へ移行
  const isAllPlayersGoal = stio.checkAllPlayersGoalReached() ?? false;
  if (isAllPlayersGoal) {
    return (
      <>
        <Link to="/playing/" onClick={() => {
          localStorage.setItem(StorageKeys.playingState, PlayingStates.ending);
          props.setPlayingState(PlayingStates.ending);
        }}>
          →→ 結果発表画面へすすむ ←←
        </Link>
      </>
    );
  }
  
  
  // 現在の場所の名前を取得
  let curLocationName = '';
  const playBoard = stio.getPlayingBoardID();
  const player = stio.getCurrentPlayer();
  const loc = player?.location;
  if (playBoard !== undefined && loc !== undefined) {
    curLocationName = props.data.allBoardsJson.edges[playBoard].node.square[loc].store.name;
  }
  
  
  return (
    <>
      <main>
        <section>
          <h1>{player?.name ?? ''} さんのターン</h1>
          <p>現在地：{curLocationName}</p>
          <p>現在のポイント： {player?.point ?? ''}</p>
          <Link
            to='/playing/'
            onClick={() => {
              localStorage.setItem(StorageKeys.playingState, PlayingStates.dice);
              props.setPlayingState(PlayingStates.dice);
            }}
          >
            → さいころをふる
          </Link>
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


