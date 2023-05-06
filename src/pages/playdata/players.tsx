import React from 'react';
import { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import { AppConst } from '../../ts/config/const';
import SEO from '../../components/SEO';
import StorageDAO from '../../ts/module/StorageDAO';
import '../../sass/style.scss';



export default (): JSX.Element => {
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
  
  // プレイヤーオブジェクト配列を取得してプレイ順にソート
  const players = stdao.getPlayerInfoObject();
  if (typeof players === 'undefined') {
    console.error('[SGPJ] players is undefined');
    return (<></>);
  }
  players.sort((a, b) => a.order - b.order);
  
  // 現在のプレイヤーに印をつけるために情報を取得
  const curOrderNum = stdao.getCurrentOrderNumber();
  
  // 場所名の表示をするためにボード情報取得
  const board = stdao.getPlayingBoard();
  if (typeof board === 'undefined') {
    console.error('[SGPJ] curPlayingBoardID is undefined');
    return (<></>);
  }
  
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
          
          // プレイヤーアイコン情報の組み立て
          let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
          if (player.icon === '' || typeof player.icon === 'undefined') {
            playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
          }
          
          return (
            <section key={index}>
              <p>---------------------------------</p>
              <h1>{curOrderMark}{player.name} さん</h1>
              <div>
                <img
                  src={playerIconSrc}
                  alt="プレイヤーアイコン"
                  width="50"
                  height="50"
                />
              </div>
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
