import React from 'react';
import { Link } from 'gatsby';

export default function NotFound() {
    return (
        <>
            <div className="not-found-message">
                <h1>404 Not Found</h1>
                <Link to="/">トップページへ</Link>
            </div>
        </>
    );
}
