import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import SgpjStorageIO from '../../ts/module/SgpjStorageIO';

import { PlayingStates } from '../../ts/module/PlayingStates';
import { StorageKeys } from '../../ts/module/StorageKeys';
import { generateRankingArr } from '../../ts/module/SgpjCommonModules';

import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
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
  
  // プレイヤーオブジェクト配列を取得してポイントの大きい順にソート
  const players = stio.getPlayerInfoObject();
  if (typeof players === 'undefined') {
    console.error('[SGPJ] players is undefined');
    return (<></>);
  }
  players.sort((a, b) => a.point - b.point).reverse();
  
  // ランキング配列の取得
  const rankingArr = generateRankingArr(players.map(player => player.point));
  
  // 表示用に要素を組み立てる
  const buildElem = (
    <section>
      {
        players.map((player, index) => {
          return (
            <section key={index}>
              <p>---------------------------------</p>
              <h1>{player.name} さん</h1>
              <ul>
                <li>順位：{rankingArr[index]} 位</li>
                <li>ポイント：{player.point} pt.</li>
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
      <main>
        <section>
          <h1>結果発表！</h1>
          {buildElem}
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


