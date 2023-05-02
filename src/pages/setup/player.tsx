import React from 'react';
import { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { ProjectUtility as util } from '../../ts/module/ProjectUtility';
import { AppConst } from '../../ts/config/const';
import { StorageKeys } from '../../ts/config/StorageKeys';
import '../../sass/style.scss'



export default () => {
  const [playerList, setPlayerList] = useState(['']);
  const [doEffect, setDoEffect] = useState(false);
  useEffect((): void => {
    const playerListJSON = localStorage.getItem(StorageKeys.SetupPlayer) ?? '[""]';
    try {
      setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    } catch (error) {
      setPlayerList(['']);
    }
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  
  let userCount: number = AppConst.DEFAULT_SETUP_PLAYER_COUNT;
  if (playerList.length > AppConst.DEFAULT_SETUP_PLAYER_COUNT) {
    userCount = playerList.length;
  }
  const seqNums = [...Array(userCount).keys()];
  
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
                  return (
                    <label key={seq} className="c-label">
                        {seq + 1}.
                      <input
                        type="text"
                        name="playername"
                        className="c-textbox"
                        placeholder="プレイヤー名を入力"
                        onChange={userChange}
                        key={seq}
                        defaultValue={playerList[seq] ?? ''}
                        data-key={seq}
                      />
                    </label>
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
