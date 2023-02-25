/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { render, screen, waitFor } from '@testing-library/react';

import { Post, PostsContext } from '../contexts/posts';

import PostListScreen from './post-list';

describe('Post List Screen', (): void => {
    test('shows loading when results not available', (): void => {
        render(<PostListScreen />);
        const text = screen.getByText('Loading');
        expect(text).toBeInTheDocument();
    });

    test('shows list when results available', async (): Promise<void> => {
        const posts: Post[] = [
            {
                id: 0,
                created_at: 'created_at',
                content: 'Content',
                image_url: 'https://www.google.com/logo.png',
                title: 'Title',
                tags: [],
            },
        ];

        render(
            <PostsContext.Provider
                value={{
                    posts,
                    refresh: (): void => {
                        return;
                    },
                }}
            >
                <PostListScreen />
            </PostsContext.Provider>
        );

        await waitFor(async (): Promise<void> => {
            expect(screen.getByText('Title')).toBeInTheDocument();
        });

        expect(screen.getByText('Content')).toBeInTheDocument();
    });
});
