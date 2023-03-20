import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import '../../sass/style.scss';

import StorageDAO from '../../ts/module/StorageDAO';
import SgpjSugorokuManager from '../../ts/module/SgpjSugorokuManager';
import { createRandomString } from '../../ts/module/SgpjCommonModules';

import { PlayingStates } from '../../ts/config/PlayingStates';
import { StorageKeys } from '../../ts/config/StorageKeys';

import { AppConst } from '../../ts/config/const';

import type { PlayingPageChildProps } from '../../ts/type/PlayingPageProps';



export default (props: PlayingPageChildProps): JSX.Element => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [sgmgr, setSgmgr] = useState<SgpjSugorokuManager | undefined>(undefined);
  const [minigameKey, setMinigameKey] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setSgmgr(new SgpjSugorokuManager(props.setPlayingState, localStorage));
    setMinigameKey(localStorage.getItem(StorageKeys.PlayingLastMinigameKey) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (stdao === undefined) {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  if (sgmgr === undefined) {
    console.error('[SGPJ] SgpjSugorokuManager is undefined');
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
  
  // 今回止まったマスの情報格納用オブジェクトの初期化
  const curLocationData = {
    minigameName: '',
    minigameDesc: '',
    minigameId: '',
    minigamePath: '',
  };
  
  // マスの情報取得
  const player = stdao.getCurrentPlayer();
  const board = stdao.getPlayingBoard();
  if (typeof board !== 'undefined') {
    const playerLocation = player?.location;
    if (typeof playerLocation !== 'undefined') {
      const curLocation = board.square[playerLocation];
      curLocationData.minigameName = curLocation.minigame.name;
      curLocationData.minigameDesc = curLocation.minigame.desc;
      curLocationData.minigameId = curLocation.minigame.id;
      curLocationData.minigamePath = AppConst.MINIGAME_DIR + '/' + curLocation.minigame.id + '/';
    }
  }
  
  
  return (
    <>
      <main>
        <section>
          <h1>{curLocationData.minigameName}</h1>
          <p>{curLocationData.minigameDesc}</p>
          <p>
            <a onClick={() => {
              const keyStr = createRandomString(8);
              // localStorage.setItem(StorageKeys.playingLastMinigameKey, keyStr);
              stdao.setItem(StorageKeys.PlayingLastMinigameKey, keyStr);
              location.href = curLocationData.minigamePath + '?mode=sugoroku&key=' + keyStr;
            }}>
              →→ ミニゲームをはじめる ←←
            </a>
          </p>
          <Link to='/playing/' onClick={() => {
            // localStorage.setItem(StorageKeys.playingLastMinigameRank, 'c');
            stdao.setItem(StorageKeys.PlayingLastMinigameRank, 'c');
            sgmgr.moveScreenTo(PlayingStates.MinigameResult);
          }}>
            ミニゲームをやらずに次へ進める
          </Link>
        </section>
      </main>
    </>
  )
}
