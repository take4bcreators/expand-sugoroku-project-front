import React from 'react';
import { useState, useEffect } from 'react';

import '../../sass/style.scss';

import StorageDAO from '../../ts/module/StorageDAO';
import { generateRankingArr } from '../../ts/module/SgpjCommonModules';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (_props : PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  
  // プレイヤーオブジェクト配列を取得してポイントの大きい順にソート
  const players = stdao.getPlayerInfoObject();
  if (typeof players === 'undefined') {
    console.error('[SGPJ] players is undefined');
    return (<></>);
  }
  players.sort((a, b) => a.point - b.point).reverse();
  
  // ランキング配列の取得
  const rankingArr = generateRankingArr(players.map(player => player.point));
  
  return (
    <>
      <main>
        <section>
          <h1>結果発表！</h1>
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
        </section>
      </main>
    </>
  );
}
