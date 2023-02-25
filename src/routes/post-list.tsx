/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { FC, ReactElement } from 'react';
import { getPosts } from '../api/posts';

import { CardPost } from '../components/card-post';
import { Post } from '../helpers/posts';

const PostListScreen: FC = (): ReactElement => {
    const posts = getPosts();

    return (
        <>
            {posts.map(
                (post: Post): ReactElement => (
                    <CardPost key={post.id} post={post} />
                )
            )}
        </>
    );
};

export default PostListScreen;
