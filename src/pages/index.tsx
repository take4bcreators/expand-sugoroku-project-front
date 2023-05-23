import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import SEO from '../components/SEO';
import StorageDAO from '../ts/module/StorageDAO';
import PlayingLayout from '../components/PlayingLayout';
import SvgTemporallyLogoText from '../icon/svg/SvgTemporallyLogoText';
import SvgTemporallyLogo from '../icon/svg/SvgTemporallyLogo';
import SvgTopIconBookmark from '../icon/svg/SvgTopIconBookmark';
import SvgTopIconWalkHuman from '../icon/svg/SvgTopIconWalkHuman';
import SvgTopIconMap from '../icon/svg/SvgTopIconMap';
import SvgTopIconChess from '../icon/svg/SvgTopIconChess';
import '../sass/style.scss';


export default () => {
  const [stdao, setStdao] = useState<StorageDAO | undefined>(undefined);
  const [doEffect, setDoEffect] = useState(false);
  useEffect(() => {
    setStdao(new StorageDAO(localStorage));
    setDoEffect(true);
  }, []);
  if (!doEffect) return (<></>);
  if (typeof stdao === 'undefined') {
    console.error('[SGPJ] stdao is undefined');
    return (<></>);
  }
  
  // 初回アクセス時はつづきからを非活性にする
  let ContinueButton = () => (
    <Link to="playing/">
      <div className="p-top-menu-item p-top-menu-item--bg01">
        <div className="p-top-menu-item__icon">
          <SvgTopIconBookmark />
        </div>
        <div className="p-top-menu-item__text">
          つづきから
        </div>
      </div>
    </Link>
  );
  const playingState = stdao.getItem('sgpj_playing_state');
  if (playingState === null || playingState === '' ) {
    ContinueButton = () => (
      <div className="p-top-menu-item p-top-menu-item--inactive">
        <div className="p-top-menu-item__icon">
          <SvgTopIconBookmark />
        </div>
        <div className="p-top-menu-item__text">
          つづきから
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="p-splash-screen-container js-splash-screen-container">
        <div className="p-splash-screen-container__logo">
          <SvgTemporallyLogo />
        </div>
      </div>
      <PlayingLayout footerType="Top">
        <main className="p-top">
          <h1 className="p-top-logo">
            <SvgTemporallyLogoText />
          </h1>
          <ul className="p-top-menu-container">
            <li>
              <ContinueButton />
            </li>
            <li>
              <Link to='setup/?state=board'>
                <div className="p-top-menu-item p-top-menu-item--bg02">
                  <div className="p-top-menu-item__icon">
                    <SvgTopIconWalkHuman />
                  </div>
                  <div className="p-top-menu-item__text">
                    はじめから
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to='boards'>
                <div className="p-top-menu-item p-top-menu-item--bg03">
                  <div className="p-top-menu-item__icon">
                    <SvgTopIconMap />
                  </div>
                  <div className="p-top-menu-item__text">
                    ボード
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to='minigames'>
                <div className="p-top-menu-item p-top-menu-item--bg04">
                  <div className="p-top-menu-item__icon">
                    <SvgTopIconChess />
                  </div>
                  <div className="p-top-menu-item__text">
                    ミニゲーム
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </main>
      </PlayingLayout>
    </>
  );
}

export const Head = () => {
  return (
      <SEO
          pageTitle="TEMPORALLY | すごろく拡張ツール"
      />
  )
}
