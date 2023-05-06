import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
// import { Link, navigate } from 'gatsby';
// import { useLocation } from '@reach/router';
// import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import { StorageKeys } from '../../ts/config/StorageKeys';
import '../../sass/style.scss'


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
  if (playerIconName === '') {
    playerIconName = AppConst.DEFAULT_PLAYER_ICON_FILE;
  }
  
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
      <main>
        <section>
          <div>
            <h1>アイコン選択</h1>
            <form name="userForm">
              {
                AppConst.PLAYER_ICON_FILES.map((playerIconFile, index) => {
                  return (
                    <label key={index} className="c-label">
                      <input
                        type="radio"
                        name="playericonradio"
                        className="c-radio"
                        onChange={changeStateAndStorage}
                        checked={playerIconFile === playerIconName}
                        data-playericon={playerIconFile}
                      />
                      <img
                        src={AppConst.PLAYER_ICON_DIR + '/' + playerIconFile}
                        alt="プレイヤーアイコン"
                        width="50"
                        height="50"
                      />
                    </label>
                  )
                })
              }
              <button type="button" name="prevbtn" className="c-button">
                <Link to='./?state=player'>OK</Link>
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
