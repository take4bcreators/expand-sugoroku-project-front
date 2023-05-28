import React from 'react';

export default () => (
  <footer className="l-footer">
    <small className="c-copyright">
      <ul>
        <li>&copy; extensionLAB. 2023.</li>
        <li className="u-font-small">Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパー Webサービス</a></li>
      </ul>
    </small>
    <div className="p-buildings">
      <svg width="197" height="411" viewBox="0 0 197 411" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect className="p-buildings__building--center" x="75" width="56" height="411" fill="white"/>
        <rect className="p-buildings__building--left" y="85" width="56" height="314" fill="white"/>
        <rect className="p-buildings__building--right" x="150" y="95" width="47" height="279" fill="white"/>
      </svg>
    </div>
    <div className="p-hills">
      <svg width="1420" height="500" viewBox="0 0 1420 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse className="p-hills__hill--right" cx="951.882" cy="262.733" rx="468.118" ry="237.267" fill="#66E9A9" />
        <ellipse className="p-hills__hill--left" cx="468.118" cy="237.267" rx="468.118" ry="237.267" fill="#69F0AE" />
      </svg>
    </div>
  </footer>
)
