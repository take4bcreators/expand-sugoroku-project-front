import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/SEO';
import '../sass/style.scss';

export default () => {
  return (
    <>
      <div>
        <h1>404 Not Found</h1>
        <Link to="/">トップページへ</Link>
      </div>
    </>
  );
}

export const Head = () => {
  const pageTitle: string = '404 Not Found';
  return (
    <SEO
        pageTitle={pageTitle}
    />
  );
}
