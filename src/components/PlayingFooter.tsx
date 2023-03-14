import React from 'react';
import { Link } from 'gatsby';

export default () => (
    <footer className='l-footer'>
        <div>--------------</div>
        <Link to='../playdata/players'>プレイヤー情報</Link>
        <Link to='../playdata/board'>すごろく盤面</Link>
        <Link to='/'>トップ画面へ</Link>
        <div>--------------</div>
    </footer>
)
