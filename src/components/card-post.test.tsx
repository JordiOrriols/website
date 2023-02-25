/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { render, screen } from '@testing-library/react';

import { CardPost } from './card-post';

describe('Card Post Screen', (): void => {
    test('renders card post', (): void => {
        const post = {
            content: 'Post Content',
            created_at: 'Post Created At',
            id: 1,
            image_url: 'https://www.google.com/image',
            title: 'Post Title',
            tags: [],
        };

        render(<CardPost post={post} />);

        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();
    });
});
