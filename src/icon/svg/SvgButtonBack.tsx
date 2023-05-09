import React from 'react';

export default () => {
  return (
    <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-svg-button-back">
      <circle cx={75} cy={75} r={75} className="p-svg-button-back__color-group-base" />
      <circle cx="75.0004" cy="75.0004" r="66.9643" className="p-svg-button-back__color-group-accent" />
      <circle cx="74.9999" cy="74.9999" r="58.9286" className="p-svg-button-back__color-group-base" />
      <g clipPath="url(#clip0_156_121)">
        <path d="M101.718 57.622C96.7393 52.6282 89.7648 49.5135 82.1528 49.5181H72.1774V47.9696V37.6445L46.5324 58.4977L72.1774 79.3529V68.7122V67.5874H82.1528C84.8316 67.5919 87.1753 68.6483 88.9411 70.3974C90.6914 72.1643 91.7478 74.5068 91.7522 77.1867C91.7478 79.8666 90.6913 82.2092 88.9411 83.9738C87.1753 85.7252 84.8316 86.7815 82.1528 86.7861H40.1787V104.855H82.1528C89.7648 104.86 96.7393 101.745 101.718 96.7516C106.709 91.7732 109.826 84.7987 109.822 77.1867C109.826 69.5748 106.709 62.6002 101.718 57.622Z" className="p-svg-button-back__color-group-accent" />
      </g>
      <defs>
        <clipPath id="clip0_156_121">
          <rect width="69.6429" height="69.6429" transform="translate(40.1787 36.4287)" className="p-svg-button-back__color-group-accent" />
        </clipPath>
      </defs>
    </svg>
  );
}
