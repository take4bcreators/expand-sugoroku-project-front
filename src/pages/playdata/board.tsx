import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import SEO from '../../components/SEO';
import StorageDAO from '../../ts/module/StorageDAO';
import PlayingLayout from '../../components/PlayingLayout';
import SvgButtonBack from '../../icon/svg/SvgButtonBack';
import '../../sass/style.scss';


export default () => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] SgpjStorageIO is undefined');
    return (<></>);
  }
  
  // ボード情報の取得
  const boardData = stdao.getPlayingBoard();
  if (typeof boardData === 'undefined') {
    console.error('[SGPJ] boardData is undefined');
    return (<></>);
  }
  const boardName = boardData.board.name;
  const boardPage = `/boards/${boardData.board.base}/${boardData.board.id}/`;
  
  return (
    <>
      <PlayingLayout footerType="Normal">
        <main>
          <section className="p-playdata-board-container">
            <div className="p-setup-board-menu p-setup-board-menu--full">
              <a href={boardPage} target='_blank'>
                <p className="p-setup-board-menu-item p-setup-board-menu-item--large p-setup-board-menu-item--red">
                  {boardName}
                </p>
              </a>
              <p>※別のタブが開きます</p>
            </div>
          </section>
          <div className="p-control-buttons-container">
            <div className="p-control-buttons">
                <div className="p-control-button">
                  <Link to="../../playing/">
                    <SvgButtonBack />
                  </Link>
                </div>
            </div>
          </div>
        </main>
      </PlayingLayout>
    </>
  );
}

export const Head = () => {
  return (
      <SEO
          pageTitle="ボード | TEMPORALLY"
      />
  )
}
