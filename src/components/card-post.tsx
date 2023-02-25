/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { FC, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import { Card } from '../components/card';
import { Post } from '../contexts/posts';
import { magicNumber } from '../helpers/numbers';

interface Props {
    post: Post;
    preview?: boolean;
}

const PostImage = styled('img')((): any => ({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
}));

const PostContent = styled('div')((): any => ({
    padding: '10px 30px 50px 30px',
}));

const PostTitle = styled('h2')((): any => ({
    fontWeight: '600',
    color: colors.gray,
}));

const PostDescription = styled('div')((): any => ({}));
const PostCreated = styled('div')((): any => ({
    fontSize: '.8em',
    opacity: '.8',
}));

const PostTags = styled('div')((): any => ({ margin: '1em 0 0' }));
const PostTag = styled('span')((): any => ({
    marginRight: '.7em',
    fontSize: '.8em',
    backgroundColor: 'var(--bg-color)',
    padding: '.5em',
    borderRadius: 'var(--radius)',
}));
/*
const PostSeeMore = styled('a')((): any => ({
    textAlign: 'right',
    color: colors.blue,
}));
*/
export const CardPost: FC<Props> = (props: Props): ReactElement => {
    const { post } = props;

    const onImageError: React.ReactEventHandler<HTMLImageElement> = (
        event: React.SyntheticEvent<HTMLImageElement>
    ): void => {
        event.currentTarget.onerror = null; // prevents looping
        event.currentTarget.src =
            'https://previews.123rf.com/images/ominaesi/ominaesi1701/ominaesi170100010/68761420-silueta-inconsútil-urban-landscape-city-real-estate-summer-day-fondo-plano-diseño-concepto-icono-pla.jpg';
    };

    const postedDate = new Date(
        post.created_at * magicNumber.thousand
    ).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card>
            <>
                {post.image_url ? (
                    <PostImage src={post.image_url} onError={onImageError} />
                ) : null}
                <PostContent>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDescription>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </PostDescription>
                    <PostCreated>Posted {postedDate}</PostCreated>
                    <PostTags>
                        {post.tags.map(
                            (tag: string): ReactElement => (
                                <PostTag key={tag}>#{tag}</PostTag>
                            )
                        )}
                    </PostTags>
                </PostContent>
            </>
        </Card>
    );
};
