import React from 'react';
import { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import { StorageKeys } from '../../ts/config/StorageKeys';
import '../../sass/style.scss'



export default () => {
  const [playerList, setPlayerList] = useState(['']);
  const [playerIconList, setPlayerIconList] = useState(['']);
  const [doEffect, setDoEffect] = useState(false);
  useEffect((): void => {
    const playerListJSON = localStorage.getItem(StorageKeys.SetupPlayer) ?? '[""]';
    const playerIconListJSON = localStorage.getItem(StorageKeys.SetupPlayerIcon) ?? '[""]';
    try {
      setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    } catch (error) {
      setPlayerList(['']);
    }
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
      <main>
        <div>
          <div>1.ボード選択</div>
          <div><em>2.プレイヤー情報入力</em></div>
          <div>3.確認</div>
        </div>
        <section>
          <div>
            <h1>プレイヤー情報入力</h1>
            <form name="userForm">
              {
                seqNums.map(seq => {
                  // アイコンパスの組み立て
                  let iconImageName = playerIconList[seq];
                  if (typeof iconImageName === 'undefined' || iconImageName === '') {
                    iconImageName = AppConst.UNSELECTED_PLAYER_ICON_FILE;
                  }
                  const iconImagePath = AppConst.PLAYER_ICON_DIR + '/' + iconImageName;
                  
                  return (
                    <div key={seq}>
                      <div>
                        <Link to={'./?state=playericon&playernum=' + seq}>
                          <img
                            src={iconImagePath}
                            alt="プレイヤーアイコン"
                            width="50"
                            height="50"
                          />
                        </Link>
                      </div>
                      <label key={seq} className="c-label">
                          {seq + 1}.
                        <input
                          type="text"
                          name="playername"
                          className="c-textbox"
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
              <button type="button" name="prevbtn" className="c-button">
                <Link to='./?state=board'>戻る</Link>
              </button>
              <button type="button" name="nextbtn" className="c-button">
                <span onClick={checkInput}>次のSTEPに進む</span>
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
