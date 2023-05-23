import { IzakayaPageScript } from './static/script/ts/IzakayaPageScript';
import { TopPageScript } from './static/script/ts/TopPageScript';
import { ProjectUtility as util} from './src/ts/module/ProjectUtility';


type OnRouteUpdateType = {
  location: Location,
  prevLocation: Location | null,
}

// ブラウザスクリプト実行用
export const onRouteUpdate = ({ location, prevLocation }: OnRouteUpdateType) => {
  // console.log('[SGPJ] [onRouteUpdate] location.pathname : ' + location.pathname);
  
  // トップページの識別
  if (location.pathname === '/') {
    new TopPageScript().execScript();
    return;
  }
  
  // それ以外のページの識別
  const splitPathArr = util.generateCleanArr(location.pathname.split('/'));
  console.log(splitPathArr);
  switch (splitPathArr[1]) {
    case 'izakaya':
    case 'cafe':
      new IzakayaPageScript().execScript();
      break;
    default:
      break;
  }
}
