import React from 'react';
import { Link } from 'gatsby';
import '../sass/style.scss';

export default function NotFound() {
  return (
    <>
      <div>
        <h1>404 Not Found</h1>
        <Link to="/">トップページへ</Link>
      </div>
    </>
  );
}

export function Head() {
  return (
    <>
      <title>404 Not Found</title>
    </>
  );
}
