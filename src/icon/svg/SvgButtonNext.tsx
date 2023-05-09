import React from 'react';

export default () => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-svg-button-next">
      <circle cx={100} cy={100} r={100} className="p-svg-button-next__color-group-base" />
      <circle cx="100.001" cy="99.9996" r="89.2857" className="p-svg-button-next__color-group-accent" />
      <circle cx={100} cy={100} r="78.5714" className="p-svg-button-next__color-group-base" />
      <g clipPath="url(#clip0_143_38)">
        <path d="M102.219 57.9383C98.0685 53.9888 91.5029 54.1509 87.5536 58.301C83.6022 62.4549 83.7642 69.0224 87.9181 72.9701L105.421 89.6263H63.9455C58.2152 89.6263 53.5713 94.2685 53.5713 100.001C53.5713 105.731 58.2152 110.373 63.9455 110.373H105.421L87.9179 127.031C83.764 130.977 83.602 137.546 87.5534 141.697C91.5027 145.847 98.0684 146.013 102.218 142.061L146.428 100.001L102.219 57.9383Z" className="p-svg-button-next__color-group-accent" />
      </g>
      <defs>
        <clipPath id="clip0_143_38">
          <rect width="92.8571" height="92.8571" transform="translate(53.5713 53.5713)" className="p-svg-button-next__color-group-accent" />
        </clipPath>
      </defs>
    </svg>
  );
}
