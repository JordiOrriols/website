/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';

export interface DefaultPost {
    title: string;
    content: string;
    image_url?: string;
    tags: string[];
}

export interface Post extends DefaultPost {
    id: string;
    created_at: number;
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
