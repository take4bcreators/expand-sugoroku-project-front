import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';

import PlayingLayout from '../../components/PlayingLayout';

import SvgButtonChess from '../../icon/svg/SvgButtonChess';
import SvgIconNotice from '../../icon/svg/SvgIconNotice';
import SvgButtonFlag from '../../icon/svg/SvgButtonFlag';
import SvgButtonDice from '../../icon/svg/SvgButtonDice';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
import SvgButtonPlayer from '../../icon/svg/SvgButtonPlayer';
import SvgButtonMap from '../../icon/svg/SvgButtonMap';
import SvgButtonBack from '../../icon/svg/SvgButtonBack';
import SvgIconPoint from '../../icon/svg/SvgIconPoint';
import SvgIconLocation from '../../icon/svg/SvgIconLocation';
import SvgIconLock from '../../icon/svg/SvgIconLock';
import SvgObjectLocationbar from '../../icon/svg/SvgObjectLocationbar';




export default (_props : PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
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
  const rankingArr = util.generateRankingArr(players.map(player => player.point));
  
  // console.log('---- debug start ----');
  // console.log(players);
  // console.log(rankingArr);
  // console.log('---- debug end ----');
  
  
  // ランダム配列を用いて各プレイヤーの順番を決定してオブジェクト配列で保持
  // type SetupPlayerInfo = {
  //   playerName: string,
  //   iconFile: string,
  // }
  // const sortedPlayerInfoList: SetupPlayerInfo[] = [];
  // numberArr.forEach((randomNumber, index) => {
  //     playerInfoArr[index].order = randomNumber;
  //     const playerInfo: SetupPlayerInfo = {
  //       playerName: playerInfoArr[index].name,
  //       iconFile: playerInfoArr[index].icon,
  //     }
  //     sortedPlayerInfoList[randomNumber] = playerInfo;
  // });
  
  
  // return (
  //   <>
  //     <main>
  //       <section>
  //         <h1>結果発表！</h1>
  //         <section>
  //           {
  //             players.map((player, index) => {
  //               return (
  //                 <section key={index}>
  //                   <p>---------------------------------</p>
  //                   <h1>{player.name} さん</h1>
  //                   <ul>
  //                     <li>順位：{rankingArr[index]} 位</li>
  //                     <li>ポイント：{player.point} pt.</li>
  //                   </ul>
  //                   <p>---------------------------------</p>
  //                 </section>
  //               );
  //             })
  //           }
  //         </section>
  //       </section>
  //     </main>
  //   </>
  // );
  
  
  // return (
  //   <>
  //     <main>
  //       <section className="p-playing-decideorder-container">
  //         <ul>
  //           {
  //             players.map((player, index) => {
  //               const orderNumber = index + 1;
  //               const playerName = player.name;
  //               const playerPoint = player.point;
  //               const iconFile = player.icon ?? AppConst.DEFAULT_PLAYER_ICON_FILE;
  //               const playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + iconFile;
                
  //               return (
  //                 <li
  //                   key={index}
  //                   className="p-setup-player-panel p-setup-player-panel--playing-decideorder"
  //                 >
  //                   <div className="p-playing-decideorder-player-panel-ordernumber">
  //                     {orderNumber}
  //                   </div>
  //                   <div className="p-setup-player-icon">
  //                     <img
  //                       src={playerIconSrc}
  //                       alt="プレイヤーアイコン"
  //                       width="50"
  //                       height="50"
  //                     />
  //                   </div>
  //                   <p className="p-setup-player-input p-setup-player-input--confirmation">
  //                     {playerName}
  //                   </p>
  //                 </li>
  //               )
  //             })
  //           }
  //         </ul>
  //       </section>
        
        
  //       {/* <section>
  //         <h1>結果発表！</h1>
  //         <section>
  //           {
  //             players.map((player, index) => {
  //               return (
  //                 <section key={index}>
  //                   <p>---------------------------------</p>
  //                   <h1>{player.name} さん</h1>
  //                   <ul>
  //                     <li>順位：{rankingArr[index]} 位</li>
  //                     <li>ポイント：{player.point} pt.</li>
  //                   </ul>
  //                   <p>---------------------------------</p>
  //                 </section>
  //               );
  //             })
  //           }
  //         </section>
  //       </section> */}
        
  //       <div className="p-control-buttons-container">
  //         <div className="p-control-buttons p-control-buttons--playing">
  //           <div className="p-control-button-leftgroup">
  //             <div className="p-control-button p-control-button-leftgroup__button">
  //               <Link to='/'>
  //                 <SvgButtonExit />
  //               </Link>
  //             </div>
  //             <div className="p-control-button p-control-button-leftgroup__button">
  //               <Link to='../playdata/players'>
  //                 <SvgButtonPlayer />
  //               </Link>
  //             </div>
  //             <div className="p-control-button p-control-button-leftgroup__button">
  //               <Link to='../playdata/board'>
  //                 <SvgButtonMap />
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
        
  //     </main>
  //   </>
  // );
  
  
  // 表示用に要素を組み立てる
  const buildElem = (
    <section className="p-playdata-players-container">
      {
        players.map((player, index) => {
          // 現在の場所の情報を取得
          const curLocationData = {
            name: '',
            photo: '',
          };
          // let locationPercentage = 0;
          const board = stdao.getPlayingBoard();
          const playerLocation = player.location;
          if (typeof board !== 'undefined' && typeof playerLocation !== 'undefined') {
            curLocationData.name = board.square[playerLocation].store.name;
            curLocationData.photo = board.square[playerLocation].store.photo;
            const boardGoalIndex = board.square.length - 1;
            // locationPercentage = playerLocation / boardGoalIndex;
          }
          
          // 店画像表示のための要素の組み立て
          let storeImage = (<img src={curLocationData.photo} alt="店舗の画像" />);
          if (curLocationData.photo === '') {
            storeImage = (<></>);
          }
          
          // プレイヤーアイコン情報の組み立て
          let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
          if (player.icon === '' || typeof player.icon === 'undefined') {
            playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
          }
          
          // const rankingNumber = index + 1;
          const rankingNumber = rankingArr[index];
          
          let colorChangeClass = '';
          const colorChangeBaseClass = 'p-playing-stanby-playercard--';
          switch (rankingNumber) {
            case 1:
              colorChangeClass = colorChangeBaseClass + 'gold';
              break;
            case 2:
              colorChangeClass = colorChangeBaseClass+ 'silver';
              break;
            default:
              break;
          }
          
          return (
            <div className={`p-playing-stanby-playercard ${colorChangeClass}`} key={index}>
              <div className="p-playing-stanby-playercard__storeimage">
                
              </div>
              <div className="p-playing-stanby-playercard__info-containeres">
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
                <div className="p-playing-stanby-playercard__ranktext">
                  {`第 ${rankingNumber} 位`}
                </div>
                {/* <div className="p-playing-stanby-playercard__skip">
                  <div className="p-playing-stanby-playercard__skip-icon">
                    <SvgIconLock />
                  </div>
                  <p className="p-playing-stanby-playercard__skip-text">
                    ×{player.skipcnt ?? ''}
                  </p>
                </div> */}
                {/* <div className="p-playing-stanby-playercard__location">
                  <div className="p-playing-stanby-playercard__location-icon">
                    <SvgIconLocation />
                  </div>
                  <p className="p-playing-stanby-playercard__location-text">
                    {curLocationData.name}
                  </p>
                </div>
                <div className="p-playing-stanby-playercard__locationbar">
                  <SvgObjectLocationbar progressPercentage={locationPercentage} />
                </div> */}
              </div>
            </div>
          );
        })
      }
    </section>
  );
  
  // return (
  //   <>
  //     <h1>プレイヤー情報</h1>
  //     {buildElem}
  //     <Link to="../../playing/">
  //       すごろくに戻る
  //     </Link>
  //   </>
  // );
  return (
    <>
      <PlayingLayout footerType="Normal">
        <main>
          {buildElem}
          <div className="p-control-buttons-container">
            <div className="p-control-buttons">
                <div className="p-control-button">
                  <Link to='/'>
                    <SvgButtonExit />
                  </Link>
                </div>
            </div>
          </div>
        </main>
      </PlayingLayout>
    </>
  );
  
}
