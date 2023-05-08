import React from 'react';
import { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import { StorageKeys } from '../../ts/config/StorageKeys';
import '../../sass/style.scss'

import SetupProgressTracker from '../../components/SetupProgressTracker';
import SvgButtonPrev from '../../icon/svg/SvgButtonPrev';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';



export default () => {
  const [playerList, setPlayerList] = useState(['']);
  const [playerIconList, setPlayerIconList] = useState(['']);
  const [doEffect, setDoEffect] = useState(false);
  useEffect((): void => {
    const playerListJSON = localStorage.getItem(StorageKeys.SetupPlayer) ?? '[""]';
    try {
      setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    } catch (error) {
      setPlayerList(['']);
    }
    const playerIconListJSON = localStorage.getItem(StorageKeys.SetupPlayerIcon) ?? '[""]';
    try {
      setPlayerIconList(JSON.parse(playerIconListJSON) ?? ['']);
    } catch (error) {
      setPlayerIconList(['']);
    }
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  
  let userCount: number = AppConst.DEFAULT_SETUP_PLAYER_COUNT;
  if (playerList.length > AppConst.DEFAULT_SETUP_PLAYER_COUNT) {
    userCount = playerList.length;
  }
  const seqNums = [...Array(userCount).keys()];
  
  // 他のプレイヤーが選択された時は都度状態を保存する
  const userChange = (e: { target: HTMLInputElement }): void => {
    const keyNum: number = parseInt(e.target.dataset.key ?? '');
    if (isNaN(keyNum)) {
      console.error('keyNum is NaN : ' + keyNum);
      return;
    }
    playerList[keyNum] = e.target.value;
    setPlayerList(playerList);
    localStorage.setItem(StorageKeys.SetupPlayer, JSON.stringify(playerList));
  };
  
  // 次のステップに進む際に整合性チェックを行う
  const checkInput = (): void => {
    const cleanPlayerList = util.generateCleanArr(playerList);
    if (cleanPlayerList.length < 2) {
      window.alert('2人以上入力してください');
    } else if (cleanPlayerList.length >= 100) {
      window.alert('プレイヤーの数は99人以下にしてください');
    } else if (util.existsSameValue(cleanPlayerList)) {
      window.alert('同じ名前のプレイヤーは設定できません');
    } else {
      navigate('./?state=confirmation');
    }
  }
  
  return (
    <>
      <SetupProgressTracker length={3} current={1} />
      <section>
        <form name="userForm" className="p-setup-player-container">
          {
            seqNums.map(seq => {
              // アイコンパスの組み立て
              let iconImageName = playerIconList[seq];
              if (iconImageName === '' || iconImageName === null || typeof iconImageName === 'undefined') {
                iconImageName = AppConst.UNSELECTED_PLAYER_ICON_FILE;
              }
              const iconImagePath = AppConst.PLAYER_ICON_DIR + '/' + iconImageName;
              
              return (
                <div key={seq} className="p-setup-player-panel">
                  <div className="p-setup-player-icon">
                    <Link to={'./?state=playericon&playernum=' + seq}>
                      <img
                        src={iconImagePath}
                        alt="プレイヤーアイコン"
                        width="50"
                        height="50"
                      />
                    </Link>
                  </div>
                  {/* <label key={seq} className="c-label"> */}
                  <label key={seq} className="p-setup-player-input">
                    <input
                      type="text"
                      name="playername"
                      // className="c-textbox"
                      className="p-setup-player-input__inner"
                      placeholder="名前を入力"
                      onChange={userChange}
                      key={seq}
                      defaultValue={playerList[seq] ?? ''}
                      data-key={seq}
                    />
                  </label>
                </div>
              )
            })
          }
          {/* <button type="button" name="prevbtn" className="c-button">
            <Link to='./?state=board'>戻る</Link>
          </button>
          <button type="button" name="nextbtn" className="c-button">
            <span onClick={checkInput}>次のSTEPに進む</span>
          </button> */}
        </form>
        <div className="p-control-buttons-wrapper">
          <div className="p-control-buttons">
              <div className="p-button">
                <Link to='./?state=board'>
                  <SvgButtonPrev />
                </Link>
              </div>
              <div className="p-button">
                <span onClick={checkInput}>
                  <SvgButtonNext />
                </span>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}
