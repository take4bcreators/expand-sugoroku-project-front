import React from 'react';
import { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import StorageDAO from '../../ts/module/StorageDAO';
import { StorageKeys } from '../../ts/config/StorageKeys';
import type { AllBoardsJson } from '../../ts/type/AllBoardsJson';
import SetupProgressTracker from '../../components/SetupProgressTracker';
import SvgButtonExit from '../../icon/svg/SvgButtonExit';
import SvgButtonNext from '../../icon/svg/SvgButtonNext';
import '../../sass/style.scss';


type ThisPageProps = {
  data: AllBoardsJson,
}

export default ({ data }: ThisPageProps) => {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setSelectedBoard(localStorage.getItem(StorageKeys.SetupBoard) ?? '');
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  
  // ボードデータの取得
  const boards = data.allBoardsJson.edges;
  const boardNames = boards.map(board => board.node.board.name);
  const boardIDs = boards.map(board => board.node.board.id);
  
  const changeStateAndStorage = (e: { target: HTMLInputElement }): void => {
    const boardID = e.target.dataset.boardid ?? ''
    setSelectedBoard(boardID);
    stdao.setItem(StorageKeys.SetupBoard, boardID);
    console.log('[SGPJ] [save] ' + boardID);
  };
  
  const checkInput = (): void => {
    if (selectedBoard === '') {
      console.warn('[SGPJ] selectedBoard is none');
      window.alert('ボードを選択してください');
    } else {
      navigate('./?state=player');
    }
  }
  
  return (
    <>
      <SetupProgressTracker length={3} current={0} />
      <section>
        <form name="userForm" className="p-setup-board-menu">
          {
            boardIDs.map((boardID, index) => {
              return (
                <label key={index} className="p-setup-board-menu-item">
                  <span className="p-setup-board-menu-item__radio">
                    <input
                      type="radio"
                      name="boardradio"
                      className="p-setup-board-menu-radio"
                      defaultValue={boardNames[index]}
                      onChange={changeStateAndStorage}
                      checked={boardID === selectedBoard}
                      data-boardid={boardID}
                      key={index}
                    />
                  </span>
                  <span className="p-setup-board-menu-item__text">
                    {boardNames[index]}
                  </span>
                </label>
              )
            })
          }
        </form>
        <div className="p-control-buttons-container">
          <div className="p-control-buttons">
              <div className="p-control-button">
                <Link to='/'>
                  <SvgButtonExit />
                </Link>
              </div>
              <div className="p-control-button">
                <span onClick={checkInput}>
                  <SvgButtonNext />
                </span>
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
