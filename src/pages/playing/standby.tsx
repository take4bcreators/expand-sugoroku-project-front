import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
  console.log(props);
  
  // インスタンス変数
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [playBoard, setPlayBoard] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    // プレイヤーの数を取得
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    setPlayBoard(stio.getPlayingBoardID());
  }, []);
  console.log('[SGPJ] [load] player : ' + player);
  
  // 現在の場所の名前を取得
  let curLocationName = '';
  if (playBoard !== undefined) {
    const loc = player?.location;
    if (loc !== undefined) {
      curLocationName = props.data.allBoardsJson.edges[playBoard].node.square[loc].store.name;
    }
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


