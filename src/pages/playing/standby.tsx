import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import '../../sass/style.scss';

import SvgButtonDice from '../../icon/svg/SvgButtonDice';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonPlayer from '../../icon/svg/SvgButtonPlayer';
import SvgButtonMap from '../../icon/svg/SvgButtonMap';
import SvgIconPoint from '../../icon/svg/SvgIconPoint';
import SvgIconLocation from '../../icon/svg/SvgIconLocation';
import SvgIconLock from '../../icon/svg/SvgIconLock';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
import SvgObjectLocationbar from '../../icon/svg/SvgObjectLocationbar';



export default (props: PlayingPageChildProps): JSX.Element => {
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
  
  type nextButtonInfoType = {
    linkTo: string,
    onClick: () => void,
    panelText: JSX.Element,
    buttonSvg: JSX.Element,
  }
  
  let nextButtonInfo: nextButtonInfoType = {
    linkTo: '/playing/',
    onClick: () => {
      sgmgr.moveScreenTo(PlayingStates.Dice)
    },
    panelText: (
      <>
        さいころを<wbr />ふる
      </>
    ),
    buttonSvg: (
      <>
        <SvgButtonDice />
      </>
    )
  };
  
  // 休み表示用マスク
  let noticeMaskElem = (<></>);
  
  // 現在のプレイヤーを取得
  const player = stdao.getCurrentPlayer();
  if (typeof player === 'undefined') {
    console.error('[SGPJ] player is undefined');
    return (<></>);
  }
  
  // 終了している場合は専用の表示を返す
  if (player.isfinish) {
    nextButtonInfo = {
      linkTo: '/playing/',
      onClick: () => {
        stdao.updateNextOrderNum();
        sgmgr.moveScreenTo(PlayingStates.Standby);
      },
      panelText: (
        <>
          次の人へ<wbr />進む
        </>
      ),
      buttonSvg: (
        <>
          <SvgButtonNext />
        </>
      )
    };
  }
  
  // 休みの場合のスキップ表示
  if (player.skipcnt > 0) {
    nextButtonInfo = {
      linkTo: '/playing/',
      onClick: () => {
        stdao.decrementCurPlayerSkipCnt();
        stdao.updateNextOrderNum();
        sgmgr.moveScreenTo(PlayingStates.Standby);
      },
      panelText: (
        <>
          次の人へ<wbr />進む
        </>
      ),
      buttonSvg: (
        <>
          <SvgButtonNext />
        </>
      )
    };
    
    noticeMaskElem = (
      <>
        <div className="p-playing-stanby-playercard-mask">
          <div className="p-playing-stanby-playercard-mask__icons">
            <div className="p-playing-stanby-playercard-mask__icon">
              <SvgIconLock />
            </div>
            <p className="p-playing-stanby-playercard-mask__count">
              ×{player.skipcnt ?? ''}
            </p>
          </div>
          <div className="p-playing-stanby-playercard-mask__text">
            おやすみ中
          </div>
        </div>
      </>
    );
  }
  
  // 現在の場所の情報を取得
  const curLocationData = {
    name: '',
    photo: '',
  };
  const board = stdao.getPlayingBoard();
  const playerLocation = player.location;
  let locationPercentage = 0;
  if (typeof board !== 'undefined' && typeof playerLocation !== 'undefined') {
    curLocationData.name = board.square[playerLocation].store.name;
    curLocationData.photo = board.square[playerLocation].store.photo;
    const boardGoalIndex = board.square.length - 1;
    locationPercentage = playerLocation / boardGoalIndex;
  }
  
  // プレイヤーアイコン情報の組み立て
  let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
  if (player.icon === '' || typeof player.icon === 'undefined') {
    playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
  }
  
  // 店画像表示のための要素の組み立て
  let storeImage = (<img src={curLocationData.photo} alt="店舗の画像" />);
  if (curLocationData.photo === '') {
    storeImage = (<></>);
  }
  
  return (
    <main>
      <section className="p-playing-stanby-container">
        {noticeMaskElem}
        <div className="p-playing-stanby-playercard">
          <div className="p-playing-stanby-playercard__storeimage">
            {storeImage}
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
      </section>
      <div className="p-control-buttons-container">
        <div className="p-control-buttons">
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
                  {nextButtonInfo.panelText}
                </div>
              </div>
              <div className="p-control-next-icon p-control-next-icon--panel">
                {nextButtonInfo.buttonSvg}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
