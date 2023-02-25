/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Post } from '../contexts/posts';
import { logger } from '../helpers/logger';

// tslint:disable cyclomatic-complexity
const isPost = (item: unknown): item is Post => {
    return (
        typeof item === 'object' &&
        item !== null &&
        'content' in item &&
        'image_url' in item &&
        'title' in item &&
        'id' in item &&
        'created_at' in item
    );
};

export const getPosts = async (): Promise<Post[]> => {
    logger.info('API: GetPosts');

    const posts: Post[] = [];
    const response: unknown = [
        {
            content: 'Test',
            image_url: 'Test',
            title: 'Test',
            id: 'Test',
            created_at: 'Test',
        },
    ];

    // Validating Schema from API response

    if (Array.isArray(response)) {
        response.forEach((item: unknown): void => {
            if (isPost(item)) {
                posts.push(item);
            }
        });
    }

    return posts;
};
