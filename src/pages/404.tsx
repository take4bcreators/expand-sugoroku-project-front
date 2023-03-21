import React from 'react';
import { Link } from 'gatsby';
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
    <>
      <title>404 Not Found</title>
    </>
  );
}
