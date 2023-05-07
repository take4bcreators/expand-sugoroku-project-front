import React, { ReactNode } from 'react';
import PlayingHeader from './PlayingHeader';
import PlayingFooterTypeA from './PlayingFooterTypeA';
import PlayingFooterTypeB from './PlayingFooterTypeB';
import PlayingFooterTypeNone from './PlayingFooterTypeNone';
import PlayingFooterTypeTop from './PlayingFooterTypeTop';

type PropsType = {
    children?: ReactNode,
    footerType: ('A' | 'B' | 'None' | 'Top'),
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
