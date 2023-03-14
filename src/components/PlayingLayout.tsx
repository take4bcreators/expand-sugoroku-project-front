import React, { ReactNode } from 'react';
import PlayingHeader from './PlayingHeader';
import PlayingFooter from './PlayingFooter';

type ChildType = {
    children?: ReactNode
}

export default ({children}: ChildType) => (
    <div>
        <PlayingHeader />
            {children}
        <PlayingFooter />
    </div>
)
