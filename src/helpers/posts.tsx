/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface DefaultPost {
    title: string;
    content: string;
    image_url?: string;
    tags: string[];
    created_at: number;
}

export interface Post extends DefaultPost {
    id: string;
}

export const postsJson: DefaultPost[] = [
    {
        title: 'Markdown test file',
        content:
            "Markdown is intended to be as easy-to-read and easy-to-write as is feasible. Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.",
        created_at: 1677355624,
        tags: ['hashtag'],
    },
    {
        title: 'A post with a cover image',
        content:
            "Markdown is intended to be as easy-to-read and easy-to-write as is feasible. Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.",
        image_url:
            'https://gridsome-starter-blog.netlify.app/assets/static/alexandr-podvalny-220262-unsplash.81b85c1.4903438.jpg',
        created_at: 1677355624,
        tags: ['hashtag'],
    },
];
