import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import '../../sass/style.scss';

import { StorageKeys } from '../../ts/module/StorageKeys';

import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';


// @remind ボード名は JSON から読み込むようにする
// const boardNames: string[] = ['池袋カフェ', '池袋居酒屋', '市ヶ谷カフェ', '市ヶ谷居酒屋'];

type ThisPageProps = {
  data: AllBoardsJson,
}



export default ({ data }: ThisPageProps) => {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [doEffect, setDoEffect] = useState(false);
  
  useEffect(() => {
    setSelectedBoard(localStorage.getItem(StorageKeys.setupBoard) ?? '');
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  console.log('[SGPJ] [localStorage] ' + StorageKeys.setupBoard + ' : ' + selectedBoard);
  
  
  // ボードデータの取得
  const boards = data.allBoardsJson.edges;
  const boardNames = boards.map(board => board.node.board.name);
  const boardIDs = boards.map(board => board.node.board.id);
  
  
  // 選択しているボードが変わったらステートを更新して、ローカルストレージにも保存
  // const changeStateAndStorage = (e: { target: HTMLInputElement }) => {
  //   setSelectedBoard(e.target.value);
  //   localStorage.setItem(StorageKeys.setupBoard, e.target.value);
  //   console.log('[SGPJ] [save] ' + e.target.value);
  // };
  const changeStateAndStorage = (e: { target: HTMLInputElement }) => {
    const boardID = e.target.dataset.boardid ?? ''
    setSelectedBoard(boardID);
    localStorage.setItem(StorageKeys.setupBoard, boardID);
    console.log('[SGPJ] [save] ' + boardID);
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
              boardIDs.map((boardID, index) => {
                return (
                  <label key={index} className="c-label">
                    <input
                      type="radio"
                      name="boardradio"
                      className="c-radio"
                      defaultValue={boardNames[index]}
                      onChange={changeStateAndStorage}
                      checked={boardID === selectedBoard}
                      data-boardid={boardID}
                      key={index}
                    />
                    {boardNames[index]}
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

