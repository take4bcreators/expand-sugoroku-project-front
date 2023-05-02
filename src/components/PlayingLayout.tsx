import React, { ReactNode } from 'react';
import PlayingHeader from './PlayingHeader';
import PlayingFooterTypeA from './PlayingFooterTypeA';
import PlayingFooterTypeB from './PlayingFooterTypeB';

type PropsType = {
    children?: ReactNode,
    footerType: ('A' | 'B'),
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
    default:
      break;
  }
  return (
    <>
      <PlayingHeader />
      {children}
      {footerNode}
    </>
  );
}
