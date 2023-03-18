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
  const [minigameRank, setMinigameRank] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    // プレイヤーの数を取得
    const stio = new SgpjStorageIO(localStorage);
    setPlayer(stio.getCurrentPlayer());
    setPlayBoard(stio.getPlayingBoardID());
    setMinigameRank(localStorage.getItem(StorageKeys.playingLastMinigameRank) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [load] player : ' + player);
  
  
  
  return (
    <>
      <main>
        <section>
          <h1>結果発表！</h1>
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


