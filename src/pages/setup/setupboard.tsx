import React from 'react';
import { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import '../../sass/style.scss';

import { StorageKeys } from '../../ts/module/StorageKeys';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';



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
  
  const changeStateAndStorage = (e: { target: HTMLInputElement }) => {
    const boardID = e.target.dataset.boardid ?? ''
    setSelectedBoard(boardID);
    localStorage.setItem(StorageKeys.setupBoard, boardID);
    console.log('[SGPJ] [save] ' + boardID);
  };
  
  function checkInput(): void {
    if (selectedBoard === '') {
      console.warn('[SGPJ] selectedBoard is none');
      window.alert('ボードを選択してください');
    } else {
      navigate('./?state=player');
    }
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
              <span onClick={checkInput}>次のSTEPに進む</span>
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

