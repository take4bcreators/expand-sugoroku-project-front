import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonPlayer from '../../icon/svg/SvgButtonPlayer';
import SvgButtonMap from '../../icon/svg/SvgButtonMap';
import '../../sass/style.scss';


export default (props: PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SugorokuManager | undefined>(undefined);
  const [minigameKey, setMinigameKey] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SugorokuManager(props.setPlayingState, localStorage));
    setMinigameKey(localStorage.getItem(StorageKeys.PlayingLastMinigameKey) ?? '');
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
  
  // ミニゲームから返ってきたらミニゲーム結果画面へ進む
  const locat = props.location;
  const params = new URLSearchParams(locat.search);
  const paramState = params.get('state') ?? '';
  if (paramState === 'minigame' && minigameKey !== '') {
    const paramKey = params.get('key') ?? '';
    if (paramKey === minigameKey) {
      const paramRank = params.get('rank') ?? 'c';
      localStorage.setItem(StorageKeys.PlayingLastMinigameRank, paramRank);
      localStorage.setItem(StorageKeys.PlayingState, PlayingStates.MinigameResult);
      props.setPlayingState(PlayingStates.MinigameResult);
    }
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
          <ul className="p-setup-board-menu p-setup-board-menu--button">
            <li className="p-setup-board-menu-item p-setup-board-menu-item--large p-setup-board-menu-item--red">
              <a onClick={() => {
                const keyStr = util.createRandomString(8);
                stdao.setItem(StorageKeys.PlayingLastMinigameKey, keyStr);
                location.href = curLocationData.minigamePath + '?mode=sugoroku&key=' + keyStr;
              }}>
                ミニゲームをはじめる
              </a>
            </li>
            <li className="p-setup-board-menu-item p-setup-board-menu-item--purple">
              <Link to='/playing/' onClick={() => {
                stdao.setItem(StorageKeys.PlayingLastMinigameRank, 'c');
                sgmgr.moveScreenTo(PlayingStates.MinigameResult);
              }}>
                ミニゲームをやらずに次へ進める
              </Link>
            </li>
          </ul>
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
          </div>
        </div>
      </main>
    </>
  );
}
