import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import PlayingLayout from '../../components/PlayingLayout';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgIconPoint from '../../icon/svg/SvgIconPoint';
import '../../sass/style.scss';


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
  
  // 同点考慮済みの順位番号の取得
  const rankingArr = util.generateRankingArr(players.map(player => player.point));
  
  // 表示用に要素を組み立てる
  const PlayerDataContainer = () => (
    <section className="p-playdata-players-container">
      {
        players.map((player, index) => {
          // プレイヤーアイコン情報の組み立て
          let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
          if (player.icon === '' || typeof player.icon === 'undefined') {
            playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
          }
          
          // 順位番号を取得（同点考慮済み）
          const rankingNumber = rankingArr[index];
          
          // 順位によって色を変化させるための CSS Class を設定
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
          <PlayerDataContainer />
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
