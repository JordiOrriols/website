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
    maxWidth: '600px',
    width: '100%',
    background: 'white',
    margin: '40px auto',
    boxSizing: 'border-box',
    boxShadow: '0 13px 20px -20px rgba(0,0,0,0.3)',
}));

export const Card: FC<Props> = (props: Props): ReactElement => {
    return <CardBody>{props.children}</CardBody>;
};
