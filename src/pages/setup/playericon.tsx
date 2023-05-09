import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { AppConst } from '../../ts/config/const';
import { StorageKeys } from '../../ts/config/StorageKeys';
import '../../sass/style.scss'

import SvgButtonBack from '../../icon/svg/SvgButtonBack';


type ThisPageProps = {
  playerNum: number,
}

export default ({ playerNum }: ThisPageProps) => {
  const [playerIconList, setPlayerIconList] = useState(['']);
  const [doEffect, setDoEffect] = useState(false);
  useEffect((): void => {
    const playerIconListJSON = localStorage.getItem(StorageKeys.SetupPlayerIcon) ?? '[""]';
    try {
      setPlayerIconList(JSON.parse(playerIconListJSON) ?? ['']);
    } catch (error) {
      setPlayerIconList(['']);
    }
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  
  // 現在のプレイヤーアイコンを取得
  let playerIconName = playerIconList[playerNum] ?? '';
  
  // 他のアイコンが選択された時は都度状態を保存する
  const changeStateAndStorage = (e: { target: HTMLInputElement }): void => {
    const playerIcon = e.target.dataset.playericon ?? ''
    const playerIconListCopy = playerIconList.concat();
    playerIconListCopy[playerNum] = playerIcon;
    localStorage.setItem(StorageKeys.SetupPlayerIcon, JSON.stringify(playerIconListCopy));
    setPlayerIconList(playerIconListCopy);
  };
  
  return (
    <>
      <section>
        <div>
          <form name="userForm" className="p-setup-playericon-container">
            {
              AppConst.PLAYER_ICON_FILES.map((playerIconFile, index) => {
                return (
                  <label key={index} className="p-setup-playericon-panel">
                    <input
                      type="radio"
                      name="playericonradio"
                      className="p-setup-playericon-radio"
                      onChange={changeStateAndStorage}
                      checked={playerIconFile === playerIconName}
                      data-playericon={playerIconFile}
                    />
                    <div>
                      <img
                        src={AppConst.PLAYER_ICON_DIR + '/' + playerIconFile}
                        alt="プレイヤーアイコン"
                        width="50"
                        height="50"
                      />
                    </div>
                  </label>
                )
              })
            }
          </form>
        </div>
        <div className="p-control-buttons-container">
          <div className="p-control-buttons">
              <div className="p-control-button">
                <Link to='./?state=player'>
                  <SvgButtonBack />
                </Link>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}
