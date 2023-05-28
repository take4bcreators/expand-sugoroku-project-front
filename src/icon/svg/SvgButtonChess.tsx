import React from 'react';

export default () => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="p-svg-button-chess">
      <circle cx={100} cy={100} r={100} className="p-svg-button-chess__color-group-base" />
      <circle cx="100.001" cy="99.9996" r="89.2857" className="p-svg-button-chess__color-group-accent" />
      <circle cx={100} cy={100} r="78.5714" className="p-svg-button-chess__color-group-base" />
      <path d="M73.5736 132.042H125.832C125.832 132.042 129.405 131.337 129.405 127.823C129.405 122.549 124.556 120.626 122.258 117.627C112.559 105.454 113.265 75.8154 113.265 75.8154H86.1401C86.1401 75.8154 86.8468 105.454 77.1426 117.627C74.8496 120.626 70 122.55 70 127.823C70 131.337 73.5736 132.042 73.5736 132.042Z" className="p-svg-button-chess__color-group-accent" />
      <path d="M113.266 72.1126L121.73 66.8183V52H111.611V60.0451H104.464V52H94.938V60.0451H87.7954V52H77.6719V66.8183L86.1407 72.1126H113.266Z" className="p-svg-button-chess__color-group-accent" />
      <path d="M73.5738 135.747L70.6611 140.651V147.001H128.745V140.651L125.832 135.747H73.5738Z" className="p-svg-button-chess__color-group-accent" />
    </svg>
  );
}
