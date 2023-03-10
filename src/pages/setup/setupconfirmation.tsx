import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "gatsby"
import '../../sass/style.scss'


const STORAGEKEY_SETUP_BOARD: string = 'sgpj_setup_board';
const STORAGEKEY_SETUP_PLAYER: string = 'sgpj_setup_player';

export default function SetupConfirmation() {
  // インスタンス変数
  const [boardName, setBoardName] = useState('');
  const [playerList, setPlayerList] = useState(['']);
  
  // ローカルストレージから現在の値を取得
  useEffect(() => {
    setBoardName(localStorage.getItem(STORAGEKEY_SETUP_BOARD) ?? '');
    const playerListJSON = localStorage.getItem(STORAGEKEY_SETUP_PLAYER) ?? '[""]';
    setPlayerList(JSON.parse(playerListJSON) ?? ['']);
  }, []);
  
  
  return (
    <>
      <main>
        <div>
          <div>1.ボード選択</div>
          <div>2.プレイヤー情報入力</div>
          <div><em>3.確認</em></div>
        </div>
        <section>
          <h1>確認</h1>
          <h2>ボード</h2>
          <p>{boardName}</p>
          <h2>プレイヤー</h2>
          {
            playerList.map(playerName => {
              return (
                <p
                  className='player'
                  key={playerName}
                >
                  {playerName}
                </p>
              )
            })
          }
        </section>
        <form name="userForm">
          <button type="button" name="prevbtn" className="c-button">
            <Link to='./?state=player'>戻る</Link>
          </button>
          <button type="button" name="nextbtn" className="c-button">
            <Link to='/'>次のSTEPに進む</Link>
          </button>
        </form>
      </main>
    </>
  )
}
