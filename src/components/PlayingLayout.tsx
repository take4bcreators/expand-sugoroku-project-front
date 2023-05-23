import React, { ReactNode } from 'react';
import PlayingHeader from './PlayingHeader';
import PlayingFooterTypeNone from './PlayingFooterTypeNone';
import PlayingFooterTypeTop from './PlayingFooterTypeTop';
import PlayingFooterTypeNormal from './PlayingFooterTypeNormal';

type PropsType = {
    children?: ReactNode,
    footerType: ('None' | 'Top' | 'Normal'),
}

export default ({ children, footerType }: PropsType) => {
  let footerNode = (<></>);
  switch (footerType) {
    case 'None':
      footerNode = (<PlayingFooterTypeNone />);
      break;
    case 'Top':
      footerNode = (<PlayingFooterTypeTop />);
      break;
    case 'Normal':
      footerNode = (<PlayingFooterTypeNormal />);
      break;
    default:
      break;
  }
  return (
    <div className="l-wrapper">
      <PlayingHeader />
      {children}
      {footerNode}
    </div>
  );
}
