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
  return (
    <SEO
        pageTitle="404 Not Found"
    />
  );
}
