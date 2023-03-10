import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss'


const STORAGE_SAVE_KEY_NAME: string = 'sgpj_setup_player';
const DEFAULT_PLAYER_COUNT: number = 5;

export default function SetupPlayer() {
  // インスタンス変数
  const [playerList, setPlayerList] = useState(['']);
  
  // ローカルストレージから現在の値を取得
  useEffect((): void => {
    const playerListJSON = localStorage.getItem(STORAGE_SAVE_KEY_NAME);
    if (playerListJSON !== null) {
      setPlayerList(JSON.parse(playerListJSON) ?? ['']);
    }
  }, []);
  console.log('[localStorage] ' + STORAGE_SAVE_KEY_NAME + ' : ' + playerList);
  
  
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
    localStorage.setItem(STORAGE_SAVE_KEY_NAME, JSON.stringify(playerList));
  };
  
  
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
                <Link to='./?state=confirmation'>次のSTEPに進む</Link>
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}




