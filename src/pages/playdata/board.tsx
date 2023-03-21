import React from 'react';
import { Link } from 'gatsby';
import SEO from '../../components/SEO';
import '../../sass/style.scss';



export default () => {
  return (
    <>
      <div>
        <h1>ボード情報</h1>
        <ul>
          <li>
            <Link to="../sampleboard">サンプルボード</Link>
          </li>
          <li>
            サンプルボード（PDF）
          </li>
        </ul>
      </div>
      <Link to="../../playing/">
        すごろくに戻る
      </Link>
    </>
  );
}


export const Head = () => {
  const pageTitle: string = 'ボード';
  return (
      <SEO
          pageTitle={pageTitle}
      />
  )
}
