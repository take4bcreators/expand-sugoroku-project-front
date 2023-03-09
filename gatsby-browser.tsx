
type OnRouteUpdateType = {
  location: Location,
  prevLocation: Location | null,
}

// ブラウザスクリプト実行用
export const onRouteUpdate = ({ location, prevLocation }: OnRouteUpdateType) => {
  console.log('onRouteUpdate location.pathname : ' + location.pathname);
}
