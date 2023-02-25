/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { FC, ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
    children: ReactElement;
}

const CardBody = styled('div')((): any => ({
    maxWidth: 'var(--content-width)',
    width: '100%',
    backgroundColor: 'var(--bg-content-color)',
    margin: '0 auto',
    padding: '0',
    marginBottom: 'var(--space)',
    borderRadius: 'var(--radius)',
    boxSizing: 'border-box',
    // boxShadow: '0 13px 20px -20px rgba(0,0,0,0.3)',
    boxShadow: '1px 1px 5px 0 rgba(0,0,0,.02),1px 1px 15px 0 rgba(0,0,0,.03)',
    transition: 'transform .3s,background-color .3s,box-shadow .6s',
}));

export const Card: FC<Props> = (props: Props): ReactElement => {
    return <CardBody>{props.children}</CardBody>;
};
