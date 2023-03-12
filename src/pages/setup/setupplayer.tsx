import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss'

import { StorageKeys } from '../../ts/module/StorageKeys';


const DEFAULT_PLAYER_COUNT: number = 5;

export default function SetupPlayer() {
  // インスタンス変数
  const [playerList, setPlayerList] = useState(['']);
  
  // ローカルストレージから現在の値を取得
  useEffect((): void => {
    const playerListJSON = localStorage.getItem(StorageKeys.setupPlayer) ?? '[""]';
    try {
      setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    } catch (error) {
      setPlayerList(['']);
    }
  }, []);
  console.log('[localStorage] ' + StorageKeys.setupPlayer + ' : ' + playerList);
  
  
  let userCount: number = DEFAULT_PLAYER_COUNT;
  if (playerList.length > DEFAULT_PLAYER_COUNT) {
    userCount = playerList.length;
  }
  const seqNums = [...Array(userCount).keys()];
  
  function userChange(e: { target: HTMLInputElement }): void {
    const keyNum: number = parseInt(e.target.dataset.key ?? '');
    if (isNaN(keyNum)) {
      console.error('keyNum is NaN : ' + keyNum);
      return;
    }
    playerList[keyNum] = e.target.value;
    setPlayerList(playerList);
    localStorage.setItem(StorageKeys.setupPlayer, JSON.stringify(playerList));
  };
  
  function checkInput(): void {
    // @remind 入力チェック＆メッセージ表示処理を入れる
    console.log('--- checkInput ---');
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
                <Link to='./?state=confirmation' onClick={checkInput}>次のSTEPに進む</Link>
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
