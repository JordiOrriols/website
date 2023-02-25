/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { useContext, FC, ReactElement } from 'react';

import { CardPost } from '../components/card-post';
import { Post, PostsContext } from '../contexts/posts';

const PostListScreen: FC = (): ReactElement => {
    const postsContext = useContext(PostsContext);

    if (postsContext.posts === undefined) return <>Loading</>;

    return (
        <>
            {postsContext.posts.map(
                (post: Post): ReactElement => (
                    <CardPost key={post.id} post={post} />
                )
            )}
        </>
    );
};

export default PostListScreen;
