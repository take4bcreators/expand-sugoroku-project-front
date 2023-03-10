import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss';

import { StorageKeys } from '../../module/StorageKeys';


// @remind ボード名は JSON から読み込むようにする
const boardNames: string[] = ['池袋カフェ', '池袋居酒屋', '市ヶ谷カフェ', '市ヶ谷居酒屋'];

export default function SetupBoard() {
  // インスタンス変数
  const [selectedBoard, setSelectedBoard] = useState('');
  
  // ローカルストレージから現在の値を取得
  useEffect(() => {
    setSelectedBoard(localStorage.getItem(StorageKeys.setupBoard) ?? '');
  }, []);
  console.log('[localStorage] ' + StorageKeys.setupBoard + ' : ' + selectedBoard);
  
  // 選択しているボードが変わったらステートを更新して、ローカルストレージにも保存
  const changeStateAndStorage = (e: { target: HTMLInputElement }) => {
    setSelectedBoard(e.target.value);
    localStorage.setItem(StorageKeys.setupBoard, e.target.value);
    console.log('[save] ' + e.target.value);
  };
  
  
  function checkInput(): void {
    // @remind 入力チェック＆メッセージ表示処理を入れる
    console.log('--- checkInput ---');
  }
  
  
  return (
    <>
      <main>
        <div>
          <div><em>1.ボード選択</em></div>
          <div>2.プレイヤー情報入力</div>
          <div>3.確認</div>
        </div>
        <section>
          <h1>ボード選択</h1>
          <form name="userForm">
            {
              boardNames.map(boardName => {
                return (
                  <label key={boardName} className="c-label">
                    <input
                      type="radio"
                      name="boardradio"
                      className="c-radio"
                      defaultValue={boardName}
                      onChange={changeStateAndStorage}
                      checked={boardName === selectedBoard}
                      key={boardName}
                    />
                    {boardName}
                  </label>
                )
              })
            }
            <button type="button" name="prevbtn" className="c-button">
              <Link to='/'>戻る</Link>
            </button>
            <button type="button" name="nextbtn" className="c-button">
              <Link to='./?state=player' onClick={checkInput}>次のSTEPに進む</Link>
            </button>
          </form>
        </section>
      </main>
    </>
  )
}