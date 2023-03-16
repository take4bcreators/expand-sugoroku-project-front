import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

// import { PlayingStates } from '../../ts/module/PlayingStates';
// import { StorageKeys } from '../../ts/module/StorageKeys';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props : PlayingPageChildProps) => {
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
          <h1>マスのイベント</h1>
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


