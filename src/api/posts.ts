/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { postsJson, DefaultPost, Post } from '../helpers/posts';

export const getPosts = (): Post[] => {
    return postsJson.map((item: DefaultPost): Post => {
        const id = item.title.trim().toLowerCase().replace(/\s+/g, '-');

        return { ...item, id };
    });
};
