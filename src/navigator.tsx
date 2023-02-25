/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { lazy, ComponentType, ReactElement, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

type ImportComponent = Promise<{ default: ComponentType<any> }>;

const PostListScreen = lazy(
    (): ImportComponent =>
        import(
            /* webpackChunkName: "post-list" */
            './routes/post-list'
        )
);

export const Navigator = (): ReactElement => {
    const fallback = <></>;

    return (
        <Router>
            <Suspense fallback={fallback}>
                <Routes>
                    <Route path="/" element={<PostListScreen />} />
                </Routes>
            </Suspense>
        </Router>
    );
};
