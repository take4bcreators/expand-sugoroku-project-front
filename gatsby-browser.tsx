// import React from 'react';
// import { PageTitleProvider } from './src/contexts/PageTitleProvider';
import { IzakayaPageScript } from "./static/script/ts/izakaya";
import { ProjectUtility as util} from './src/ts/module/ProjectUtility';
import './src/sass/style.scss';


type OnRouteUpdateType = {
  location: Location,
  prevLocation: Location | null,
}

// ブラウザスクリプト実行用
export const onRouteUpdate = ({ location, prevLocation }: OnRouteUpdateType) => {
  console.log('[SGPJ] [onRouteUpdate] location.pathname : ' + location.pathname);
  
  const splitPathArr = util.generateCleanArr(location.pathname.split('/'));
  if (splitPathArr[1] === 'izakaya') {
    new IzakayaPageScript().execScript();
  }
}


// // context使用用
// export const wrapRootElement = ({ element }) => (
//   <PageTitleProvider>
//     {element}
//   </PageTitleProvider>
// )
