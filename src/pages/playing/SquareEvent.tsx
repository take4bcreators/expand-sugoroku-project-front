import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonPlayer from '../../icon/svg/SvgButtonPlayer';
import SvgButtonMap from '../../icon/svg/SvgButtonMap';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
import SvgButtonChess from '../../icon/svg/SvgButtonChess';
import SvgIconNotice from '../../icon/svg/SvgIconNotice';
import SvgButtonFlag from '../../icon/svg/SvgButtonFlag';
import '../../sass/style.scss';


export default (props : PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SugorokuManager | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SugorokuManager(props.setPlayingState, localStorage));
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
      stdao.updateNextOrderNum();
      sgmgr.moveScreenTo(PlayingStates.Standby);
    },
    PanelText: () => (<>次の人へ<wbr />進む</>),
    ButtonSvg: () => <SvgButtonNext />,
  };
  
  // 今回止まったマスの情報を取得
  const curLocationData = {
    name: '',
    name_kana: '',
    catch: '',
    genre_catch: '',
    open: '',
    access: '',
    address: '',
    photo: '',
    eventFlag: false,
    eventName: '',
    eventDetail: '',
    minigame: false,
    eventMove: 0,
  };
  const player = stdao.getCurrentPlayer();
  if (typeof player === 'undefined') {
    console.error('[SGPJ] player is undefined');
    return (<></>);
  }
  const board = stdao.getPlayingBoard();
  if (typeof board !== 'undefined') {
    const playerLocation = player?.location;
    if (typeof playerLocation !== 'undefined') {
      const curLocation = board.square[playerLocation];
      curLocationData.name = curLocation.store.name;
      curLocationData.name_kana = curLocation.store.name_kana;
      curLocationData.catch = curLocation.store.catch;
      curLocationData.genre_catch = curLocation.store.genre_catch;
      curLocationData.open = curLocation.store.open;
      curLocationData.access = curLocation.store.access;
      curLocationData.address = curLocation.store.address;
      curLocationData.photo = curLocation.store.photo;
      curLocationData.eventFlag = curLocation.event.flag;
      curLocationData.eventName = curLocation.event.name;
      curLocationData.eventDetail = curLocation.event.detail;
      curLocationData.minigame = curLocation.event.minigame;
      curLocationData.eventMove = curLocation.event.move;
    }
  }
  
  // ゴール済みの場合は専用の表示を行うため情報を保持
  let isGoal = false;
  let goalPoint = 0;
  if (player?.isfinish) {
    const goalPlayerCount = stdao.getGoalPlayerCount();
    const curGoalPoint = sgmgr.getGoalPoint(goalPlayerCount);
    isGoal = true;
    goalPoint = curGoalPoint;
  }
  
  // すべてのプレイヤーがゴール済みであるかを確認
  const isAllPlayersGoal = stdao.checkAllPlayersGoalReached() ?? false;
  
  // 現在のストレージの状態によりページ内容の表示を変える
  if (isAllPlayersGoal) {
    nextButtonInfo = {
      linkTo: '/playing/',
      onClick: () => {
        stdao.updateNextOrderNum();
        sgmgr.moveScreenTo(PlayingStates.Ending);
      },
      PanelText: () => (<>最終結果へ<wbr />すすむ</>),
      ButtonSvg: () => <SvgButtonNext />,
    };
  } else if (!curLocationData.eventFlag) {
    // イベントがない場合はその旨を表示
    curLocationData.eventName = ''
    curLocationData.eventDetail = 'イベントなし'
  } else if (curLocationData.minigame) {
    // ミニゲームがある場合はミニゲーム画面へのリンクをつける
    nextButtonInfo = {
      linkTo: '/playing/',
      onClick: () => {
        sgmgr.moveScreenTo(PlayingStates.MinigameReady);
      },
      PanelText: () => (<>ミニゲームへ<wbr />すすむ</>),
      ButtonSvg: () => <SvgButtonChess />,
    };
  } else if (curLocationData.eventMove !== 0) {
    nextButtonInfo = {
      linkTo: '/playing/',
      onClick: () => {
        // 移動した後のプレイヤーの状態をストレージに保存
        const nextPlayer = Object.assign({}, player);
        nextPlayer.location = nextPlayer.location + curLocationData.eventMove;
        stdao.updateCurrentPlayer(nextPlayer);
        stdao.updateNextOrderNum();
        sgmgr.moveScreenTo(PlayingStates.Standby);
      },
      PanelText: () => (<>次の人へ<wbr />進む</>),
      ButtonSvg: () => <SvgButtonNext />,
    };
  } else {
    // 移動イベント以外のイベントは表示のみ
  }
  
  // ゴール到達かどうかで表示を切り替える
  let returnElem = (<></>);
  if (isGoal) {
    // プレイヤーアイコン情報の組み立て
    let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
    if (player.icon === '' || typeof player.icon === 'undefined') {
      playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
    }
    returnElem = (
      <>
        <div className="p-setup-player-panel p-setup-player-panel--short">
          <div className="p-setup-player-icon p-setup-player-icon--short">
            <img
              src={playerIconSrc}
              alt="プレイヤーアイコン"
              width="50"
              height="50"
            />
          </div>
          <p className="p-setup-player-input p-setup-player-input--short">
            {player.name ?? ''}
          </p>
        </div>
        <section className="p-playing-square-event-container--goal">
          <div className="p-center-icon-text-set">
            <div className="p-center-icon-text-set__icon p-center-icon-text-set__icon--goal">
              <SvgButtonFlag />
            </div>
            <div className="p-center-icon-text-set__text">
              ゴールボーナス： {goalPoint} pt.
            </div>
          </div>
        </section>
      </>
    );
  } else {
    returnElem = (
      <>
        <section className="p-playing-square-event-container">
          <div className="p-square-event-card">
            <h1 className="p-square-event-card__name">
              {curLocationData.name}
            </h1>
            <div className="p-square-event-card__info-container">
              <p className="p-square-event-card__name-kana">
                {curLocationData.name_kana}
              </p>
              <div className="p-square-event-card__image">
                <img src={curLocationData.photo} alt="店舗の画像" />
              </div>
              <div className="p-square-event-card__info p-store-info">
                <p className="p-store-info__catch">
                  {curLocationData.catch}
                </p>
                <p className="p-store-info__genre_catch">
                  {curLocationData.genre_catch}
                </p>
                <p className="p-store-info__access">
                  {curLocationData.access}
                </p>
                <p className="p-store-info__open">
                  {curLocationData.open}
                </p>
                <p className="p-store-info__address">
                  {curLocationData.address}
                </p>
              </div>
            </div>
          </div>
          <div className="p-square-event-card p-square-event-card--two-column">
            <h2 className="p-square-event-card__name p-square-event-card__name--two-column">
              <div>
                <SvgIconNotice />
              </div>
              <div>
                {curLocationData.eventName}
              </div>
            </h2>
            <div className="p-square-event-card__info-container p-square-event-card__info-container--two-column">
              {curLocationData.eventDetail}
            </div>
          </div>
        </section>
      </>
    );
  }
  
  return (
    <>
      <main>
        {returnElem}
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
