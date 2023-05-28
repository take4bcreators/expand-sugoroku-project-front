import React from 'react';

export default () => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-svg-button-prev">
      <circle cx={100} cy={100} r={100} className="p-svg-button-prev__color-group-base" />
      <circle cx="100.001" cy="99.9996" r="89.2857" className="p-svg-button-prev__color-group-accent" />
      <circle cx={100} cy={100} r="78.5714" className="p-svg-button-prev__color-group-base" />
      <g clipPath="url(#clip0_143_47)">
        <path d="M97.7814 142.062C101.931 146.011 108.497 145.849 112.446 141.699C116.398 137.545 116.236 130.978 112.082 127.03L94.5785 110.374H136.054C141.785 110.374 146.429 105.732 146.429 99.9992C146.429 94.2689 141.785 89.6268 136.054 89.6268H94.5787L112.082 72.9687C116.236 69.023 116.398 62.4536 112.447 58.3035C108.497 54.1534 101.932 53.9874 97.7815 57.9388L53.5716 99.9992L97.7814 142.062Z" className="p-svg-button-prev__color-group-accent" />
      </g>
      <defs>
        <clipPath id="clip0_143_47">
          <rect width="92.8571" height="92.8571" transform="matrix(-1 0 0 -1 146.429 146.429)" className="p-svg-button-prev__color-group-accent" />
        </clipPath>
      </defs>
    </svg>
  );
}
