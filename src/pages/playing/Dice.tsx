import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import SugorokuManager from '../../ts/module/SugorokuManager';
import { AppConst } from '../../ts/config/const';
import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';
import SvgButtonDice from '../../icon/svg/SvgButtonDice';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
import SvgButtonBack from '../../icon/svg/SvgButtonBack';
import '../../sass/style.scss';


export default (props : PlayingPageChildProps): JSX.Element => {
  const [diceNumber, setDiceNumber] = useState<number | undefined>(undefined);
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
  
  // 現在の場所情報を取得
  const curLocationData = {
    number: 0,
    name: '',
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
      curLocationData.name = board.square[playerLocation].store.name;
      curLocationData.number = playerLocation;
    }
  }
  
  // 表示する要素を定義
  let CenterCircles = () => (
    <div className="p-playing-decideorder-dices">
      <div onClick={() => {setDiceNumber(sgmgr.rollDice())}} className="p-playing-decideorder-dices__image">
        <SvgButtonDice />
      </div>
      <div className="p-playing-decideorder-dices__text">
        押してサイコロをふる
      </div>
    </div>
  );
  let BackButton = () => (
    <>
      <Link to='/playing/' onClick={() => {sgmgr.moveScreenTo(PlayingStates.Standby)}}>
        <SvgButtonBack />
      </Link>
    </>
  );
  let NextGuide = () => <></>;
  
  // サイコロを振った後の表示と処理
  if (typeof diceNumber !== 'undefined') {
    // 次のマス情報格納用オブジェクトの初期化
    const nextLocationData = {
      dataReady: false,
      location: 0,
      isfinish: false,
      eventflag: false,
      point: 0,
      skip: 0,
    };
    // 次のマスの情報を取得する
    if (typeof board !== 'undefined') {
      const curLocation = player?.location ?? NaN;
      let nextLocation = curLocation + diceNumber;
      const goalIndex = board.square.length - 1;
      // 移動先がゴールを超えていればゴールにする
      if (!isNaN(nextLocation) && nextLocation >= goalIndex) {
        nextLocation = goalIndex;
        nextLocationData.isfinish = true;
      }
      // 移動先のマスの情報を取得
      if (!isNaN(nextLocation)) {
        nextLocationData.location = nextLocation;
        nextLocationData.eventflag = board.square[nextLocation].event.flag;
        if (nextLocationData.eventflag) {
          nextLocationData.point = board.square[nextLocation].event.point;
          nextLocationData.skip = board.square[nextLocation].event.skip;
          if (nextLocationData.skip < 0) {
            nextLocationData.skip = 0;
          }
        }
        // ゴール済みの場合はゴール順に応じてポイントを付与
        if (nextLocationData.isfinish) {
          const goalPlayerCount = stdao.getGoalPlayerCount();
          nextLocationData.point = sgmgr.getGoalPoint(goalPlayerCount + 1);
        }
        nextLocationData.dataReady = true;
      }
    }
    
    // データの状態が問題なければマスに進むボタンを設置
    if (nextLocationData.dataReady && typeof player !== 'undefined') {
      CenterCircles = () => (
        <>
          <div className="p-playing-dice-numbercircle p-playing-dice-numbercircle--outer">
            <div className="p-playing-dice-numbercircle p-playing-dice-numbercircle--semi-outer">
              <div className="p-playing-dice-numbercircle p-playing-dice-numbercircle--inner">
                {diceNumber}
              </div>
            </div>
          </div>
        </>
      );
      BackButton = () => <></>;
      NextGuide = () => (
        <Link
          to='/playing/'
          onClick={() => {
            // サイコロの出目をストレージに保存
            localStorage.setItem(StorageKeys.PlayingLastDiceNum, diceNumber.toString());
            
            // 移動した後のプレイヤーの状態をストレージに保存
            const nextPlayer = Object.assign({}, player);
            nextPlayer.point += nextLocationData.point;
            nextPlayer.skipcnt += nextLocationData.skip;
            nextPlayer.isfinish = nextLocationData.isfinish;
            nextPlayer.location = nextLocationData.location;
            const updateResult = stdao.updateCurrentPlayer(nextPlayer);
            // ユーザー情報UPDATEが問題ない場合は、シーンを更新する
            if (updateResult) {
              sgmgr.moveScreenTo(PlayingStates.SquareEvent)
            } else {
              console.error('[SGPJ] Failed to update user information.');
            }
          }}
        >
          <div className="p-control-next-guide p-control-next-guide--dice-screen">
            <div className="p-control-next-panel">
              <div className="p-control-next-panel__text">
                マスに進む
              </div>
            </div>
            <div className="p-control-next-icon">
              <SvgButtonNext />
            </div>
          </div>
        </Link>
      )
    }
  }
  
  // プレイヤーアイコン情報の組み立て
  let playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + player.icon;
  if (player.icon === '' || typeof player.icon === 'undefined') {
    playerIconSrc = AppConst.PLAYER_ICON_DIR + '/' + AppConst.DEFAULT_PLAYER_ICON_FILE;
  }
  
  return (
    <>
      <main>
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
        <section className="p-playing-decideorder-container">
          <CenterCircles />
        </section>
        <div className="p-control-buttons-container">
          <div className="p-control-buttons">
              <div className="p-control-button">
                <BackButton />
              </div>
              <NextGuide />
          </div>
        </div>
      </main>
    </>
  )
}
