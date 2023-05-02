import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayerInfo } from '../../ts/type/PlayerInfo';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';



export default (props: PlayingPageChildProps): JSX.Element => {
  const [player, setPlayer] = useState<PlayerInfo | undefined>(undefined);
  const [minigameRank, setMinigameRank] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    const stdao = new StorageDAO(localStorage);
    setPlayer(stdao.getCurrentPlayer());
    setMinigameRank(localStorage.getItem(StorageKeys.PlayingLastMinigameRank) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  
  // ランクに応じたポイントをセット
  const getPoint = AppConst.RANK_POINTS.get(minigameRank.toLowerCase()) ?? 0
  
  // 画面移動のアクションをクリック時用に定義
  function moveScreenTo(screen: string): void {
    localStorage.setItem(StorageKeys.PlayingState, screen);
    props.setPlayingState(screen);
    return;
  }
  
  // 次の順番にする処理をクリック時用に定義
  function setNextOrderNum(): void {
    const stio = new StorageDAO(localStorage);
    const updateResult = stio.updateNextOrderNum();
    if (!updateResult) {
      console.error('[SGPJ] Failed to update user information.');
    }
    return;
  }
  
  return (
    <>
      <main>
        <section>
          <h1>ミニゲーム結果！</h1>
          <p>ランク：{minigameRank.toUpperCase()}</p>
          <p>付与ポイント：{getPoint}</p>
          <Link to='/playing/' onClick={() => {
            const nextPlayer = Object.assign({}, player);
            nextPlayer.point = nextPlayer.point + getPoint;
            const stio = new StorageDAO(localStorage);
            const updateResult = stio.updateCurrentPlayer(nextPlayer);
            // ユーザー情報UPDATEが問題合った場合は、エラーを出力
            if (!updateResult) {
              console.error('[SGPJ] Failed to update user information.');
              // @remind ユーザーへの情報表示をいれる（ゲームは続行でOK？）
            }
            setNextOrderNum();
            moveScreenTo(PlayingStates.Standby);
          }}>
            →→ 次の人の番へすすむ
          </Link>
        </section>
      </main>
    </>
  )
}
