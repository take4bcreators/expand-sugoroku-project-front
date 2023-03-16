// import React from 'react';
// import { PageTitleProvider } from './src/contexts/PageTitleProvider';

type OnRouteUpdateType = {
  location: Location,
  prevLocation: Location | null,
}

// ブラウザスクリプト実行用
export const onRouteUpdate = ({ location, prevLocation }: OnRouteUpdateType) => {
  console.log('[SGPJ] [onRouteUpdate] location.pathname : ' + location.pathname);
}

// // context使用用
// export const wrapRootElement = ({ element }) => (
//   <PageTitleProvider>
//     {element}
//   </PageTitleProvider>
// )
