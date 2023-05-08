import React, { ReactNode } from 'react';
import PlayingHeader from './PlayingHeader';
import PlayingFooterTypeA from './PlayingFooterTypeA';
import PlayingFooterTypeB from './PlayingFooterTypeB';
import PlayingFooterTypeNone from './PlayingFooterTypeNone';
import PlayingFooterTypeTop from './PlayingFooterTypeTop';
import PlayingFooterTypeNormal from './PlayingFooterTypeNormal';

type PropsType = {
    children?: ReactNode,
    footerType: ('A' | 'B' | 'None' | 'Top' | 'Normal'),
}

export default ({ children, footerType }: PropsType) => {
  let footerNode = (<></>);
  switch (footerType) {
    case 'A':
      footerNode = (<PlayingFooterTypeA />);
      break;
    case 'B':
      footerNode = (<PlayingFooterTypeB />);
      break;
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
