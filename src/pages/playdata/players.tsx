import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { AppConst } from '../../ts/config/const';
import SEO from '../../components/SEO';
import StorageDAO from '../../ts/module/StorageDAO';
import PlayingLayout from '../../components/PlayingLayout';
import SvgButtonBack from '../../icon/svg/SvgButtonBack';
import SvgIconPoint from '../../icon/svg/SvgIconPoint';
import SvgIconLocation from '../../icon/svg/SvgIconLocation';
import SvgIconLock from '../../icon/svg/SvgIconLock';
import SvgObjectLocationbar from '../../icon/svg/SvgObjectLocationbar';
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
  const PlayerDataContainer = () => (
    <section className="p-playdata-players-container">
      {
        players.map((player, index) => {
          // 現在の順番のプレイヤーで合った場合の表示
          let curOrderMarkClass = '';
          if (player.order === curOrderNum) {
            curOrderMarkClass = ' is-current-order';
          }
          
          // 現在の場所の情報を取得
          const curLocationData = {
            name: '',
            photo: '',
          };
          let locationPercentage = 0;
          const board = stdao.getPlayingBoard();
          const playerLocation = player.location;
          if (typeof board !== 'undefined' && typeof playerLocation !== 'undefined') {
            curLocationData.name = board.square[playerLocation].store.name;
            curLocationData.photo = board.square[playerLocation].store.photo;
            const boardGoalIndex = board.square.length - 1;
            locationPercentage = playerLocation / boardGoalIndex;
          }
          
          // 店画像表示のための要素の組み立て
          let StoreImage = () => (<img src={curLocationData.photo} alt="店舗の画像" />);
          if (curLocationData.photo === '') {
            StoreImage = () => <></>;
          }
          
          // プレイヤーアイコン情報の組み立て
          let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
          if (player.icon === '' || typeof player.icon === 'undefined') {
            playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
          }
          
          return (
            <div className="p-playing-stanby-playercard" key={index}>
              <div className="p-playing-stanby-playercard__storeimage">
                {/* {StoreImage} */}
                <StoreImage />
              </div>
              <div className={'p-playing-stanby-playercard__info-containeres' + curOrderMarkClass}>
                <div className="p-playing-stanby-playercard__icon">
                  <div className="p-playing-stanby-playercard-icon">
                    <img
                      src={playerIconSrc}
                      alt="プレイヤーアイコン"
                      width="50"
                      height="50"
                    />
                  </div>
                </div>
                <div className="p-playing-stanby-playercard__name">
                  {player.name ?? ''}
                </div>
                <div className="p-playing-stanby-playercard__point">
                  <div className="p-playing-stanby-playercard__point-icon">
                    <SvgIconPoint />
                  </div>
                  <p className="p-playing-stanby-playercard__point-text">
                    ×{player.point ?? ''}
                  </p>
                </div>
                <div className="p-playing-stanby-playercard__skip">
                  <div className="p-playing-stanby-playercard__skip-icon">
                    <SvgIconLock />
                  </div>
                  <p className="p-playing-stanby-playercard__skip-text">
                    ×{player.skipcnt ?? ''}
                  </p>
                </div>
                <div className="p-playing-stanby-playercard__location">
                  <div className="p-playing-stanby-playercard__location-icon">
                    <SvgIconLocation />
                  </div>
                  <p className="p-playing-stanby-playercard__location-text">
                    {curLocationData.name}
                  </p>
                </div>
                <div className="p-playing-stanby-playercard__locationbar">
                  <SvgObjectLocationbar progressPercentage={locationPercentage} />
                </div>
              </div>
            </div>
          );
        })
      }
    </section>
  );
  
  return (
    <>
      <PlayingLayout footerType="Normal">
        <main>
          {/* {buildElem} */}
          <PlayerDataContainer />
          <div className="p-control-buttons-container">
            <div className="p-control-buttons">
                <div className="p-control-button">
                  <Link to="../../playing/">
                    <SvgButtonBack />
                  </Link>
                </div>
            </div>
          </div>
        </main>
      </PlayingLayout>
    </>
  );
}

export const Head = () => {
  return (
      <SEO
          pageTitle="プレイヤー情報 | TEMPORALLY"
      />
  )
}
