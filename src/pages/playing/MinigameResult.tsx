import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonPlayer from '../../icon/svg/SvgButtonPlayer';
import SvgButtonMap from '../../icon/svg/SvgButtonMap';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
import SvgIconNotice from '../../icon/svg/SvgIconNotice';
import '../../sass/style.scss';


export default (props: PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SugorokuManager | undefined>(undefined);
  const [minigameRank, setMinigameRank] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SugorokuManager(props.setPlayingState, localStorage));
    setMinigameRank(localStorage.getItem(StorageKeys.PlayingLastMinigameRank) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  if (typeof sgmgr === 'undefined') {
    console.error('[SGPJ] sgmgr is undefined');
    return (<></>);
  }
  
  // ランクに応じたポイントをセット
  const getPoint = AppConst.RANK_POINTS.get(minigameRank.toLowerCase()) ?? 0
  const rankColorClass = AppConst.RANK_COLOR_CLASS.get(minigameRank.toLowerCase()) ?? 0
  
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
  
  // 止まったマスの情報を取得
  const curLocationData = {
    minigameName: '',
    minigameDetail: '',
    minigameId: '',
    minigamePath: '',
  };
  const player = stdao.getCurrentPlayer();
  const board = stdao.getPlayingBoard();
  if (typeof board !== 'undefined') {
    const playerLocation = player?.location;
    if (typeof playerLocation !== 'undefined') {
      const curLocation = board.square[playerLocation];
      curLocationData.minigameName = curLocation.minigame.name;
      curLocationData.minigameDetail = curLocation.minigame.detail;
      curLocationData.minigameId = curLocation.minigame.id;
      curLocationData.minigamePath = AppConst.MINIGAME_DIR + '/' + curLocation.minigame.id + '/';
    }
  }
  
  // 下部ボタン制御用オブジェクト
  type nextButtonInfoType = {
    linkTo: string,
    onClick: () => void,
    PanelText: () => JSX.Element,
    ButtonSvg: () => JSX.Element,
  }
  let nextButtonInfo: nextButtonInfoType = {
    linkTo: '/playing/',
    onClick: () => {
      const nextPlayer = Object.assign({}, player);
      nextPlayer.point = nextPlayer.point + getPoint;
      const stio = new StorageDAO(localStorage);
      const updateResult = stio.updateCurrentPlayer(nextPlayer);
      if (!updateResult) {
        // ユーザー情報UPDATEが問題合った場合は、エラーを出力
        console.error('[SGPJ] Failed to update user information.');
      }
      setNextOrderNum();
      moveScreenTo(PlayingStates.Standby);
    },
    PanelText: () => (<>次の人へ<wbr />進む</>),
    ButtonSvg: () => <SvgButtonNext />,
  };
  
  return (
    <>
      <main>
        <section className="p-playing-minigame-ready-container">
          <div className="p-square-event-card p-square-event-card--pink">
            <h1 className="p-square-event-card__name">
              {curLocationData.minigameName}
            </h1>
            <div className="p-square-event-card__info-container p-square-event-card__info-container--minigame">
              <p className="p-square-event-card__detail">
                {curLocationData.minigameDetail}
              </p>
            </div>
          </div>
          <div className={`p-square-event-card p-square-event-card--two-column p-square-event-card--${rankColorClass}`}>
            <h2 className="p-square-event-card__name p-square-event-card__name--two-column">
              <div>
                <SvgIconNotice />
              </div>
              <div>
                ランク：{minigameRank.toUpperCase()}
              </div>
            </h2>
            <div className="p-square-event-card__info-container p-square-event-card__info-container--two-column">
              付与ポイント：{getPoint}
            </div>
          </div>
        </section>
        <div className="p-control-buttons-container">
          <div className="p-control-buttons p-control-buttons--playing">
            <div className="p-control-button-leftgroup">
              <div className="p-control-button p-control-button-leftgroup__button">
                <Link to='/'>
                  <SvgButtonExit />
                </Link>
              </div>
              <div className="p-control-button p-control-button-leftgroup__button">
                <Link to='../playdata/players'>
                  <SvgButtonPlayer />
                </Link>
              </div>
              <div className="p-control-button p-control-button-leftgroup__button">
                <Link to='../playdata/board'>
                  <SvgButtonMap />
                </Link>
              </div>
            </div>
            <Link to={nextButtonInfo.linkTo} onClick={nextButtonInfo.onClick}>
              <div className="p-control-next-guide">
                <div className="p-control-next-panel">
                  <div className="p-control-next-panel__text">
                    <nextButtonInfo.PanelText />
                  </div>
                </div>
                <div className="p-control-next-icon p-control-next-icon--panel">
                  <nextButtonInfo.ButtonSvg />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
