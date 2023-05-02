import React, { createContext, useState } from 'react';




// コンテキストの作成
type PageTitleContextType = {
  pageTitle: string,
  setPageTitle: (titleText: string) => void;
}
export const PageTitleContext = createContext({} as PageTitleContextType);


interface Props {
  children: JSX.Element | JSX.Element[];
}

const DEFAULT_TITLE: string = 'すごろくツール';


export const PageTitleProvider = ({ children }: Props): JSX.Element => {
  const [pageTitle, setPageTitle] = useState(DEFAULT_TITLE);
  
  return (
    <PageTitleContext.Provider
      value={{
        pageTitle: pageTitle,
        setPageTitle: (titleText: string) => {
          setPageTitle(titleText);
        },
      }}>
      {children}
    </PageTitleContext.Provider>
  );
};


// ----------------------------
// Context 使用の流れ
// 
// 1. このようなファイルを作る
// 
// 2. gatsby-browser.tsx で、以下のようなを指定する
// 
// import { PageTitleProvider } from './src/contexts/PageTitleProvider';
// 
// export const wrapRootElement = ({ element }) => (
//   <PageTitleProvider>
//     {element}
//   </PageTitleProvider>
// )
// 
// 
// 3. 以下のように使用したページで使用する
// 
// import { useContext } from 'react';
// import { PageTitleContext } from '../../contexts/PageTitleProvider';
// 
// const { pageTitle, setPageTitle } = useContext(PageTitleContext);
// 
// ----------------------------
