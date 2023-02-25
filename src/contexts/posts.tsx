/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';

export interface DefaultPost {
    content: string;
    image_url: string;
    lat: string;
    long: string;
    title: string;
}

export interface Post extends DefaultPost {
    id: number;
    created_at: string;
    updated_at: string;
}

type PostsContextType = {
    posts?: Post[];
    refresh(): void;
};

export const PostsContext: React.Context<PostsContextType> =
    React.createContext<PostsContextType>({
        refresh: (): void => {
            return;
        },
    });
