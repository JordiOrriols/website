/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { Navigator } from './navigator';

const AppContainer = styled('div')((): any => ({
    width: '100%',
    flexGrow: 1,
    margin: '30px',

    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'stretch',
}));

const ThemeSelector = styled('div')((): any => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',

    width: '100%',
    margin: '0 auto',
}));

const AppHeader = styled('header')((): any => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    margin: '0 auto',
    padding: 'calc(var(--space)/2) 0',
    maxWidth: '500px',
}));

const AppLogo = styled('svg')((): any => ({
    height: '75px',
    pointerEvents: 'none',
    fill: 'var(--title-color)',
}));

const AppTitle = styled('h1')((): any => ({
    fontSize: '1.7rem',

    transition: 'color .6s',
    color: 'var(--title-color)',
    margin: '2.75rem 0 1rem',
    fontFamily: 'Poppins,sans-serif',
    fontWeight: 600,
    lineHeight: 1.15,
    marginTop: 0,
}));

const AppSubtitle = styled('p')((): any => ({
    maxWidth: '500px',
    fontWeight: 300,
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    margin: 0,
    marginBottom: '1.2em',
    opacity: '.8',
}));

const AppContent = styled('div')((): any => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'stretch',
}));

const AppFooter = styled('footer')((): any => ({
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.8rem',
    opacity: '.3',
}));

function App(): React.ReactElement {
    const [darkTheme, setDarkTheme] = useState<boolean>(true);

    const toogleDarkTheme = (): void => {
        const darkModeClassname = 'darkMode';
        if (darkTheme) {
            document.body.classList.add(darkModeClassname);
        } else {
            document.body.classList.remove(darkModeClassname);
        }
        setDarkTheme(!darkTheme);
    };

    return (
        <AppContainer>
            <ThemeSelector>
                <div onClick={toogleDarkTheme}>
                    {darkTheme ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    )}
                </div>
            </ThemeSelector>

            <AppHeader>
                <AppLogo
                    version="1.1"
                    id="Logos"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 968 576"
                >
                    <path
                        id="XMLID_13_"
                        d="M724.8,77h-91.6c-3,0-5.9,1.6-7.4,4.3L482.6,329.5c-3.3,5.7,0.8,12.8,7.4,12.8h91.6
        c3,0,5.9-1.6,7.4-4.3L732.2,89.8C735.5,84.1,731.4,77,724.8,77z"
                    />
                    <path
                        id="XMLID_11_"
                        d="M881.1,77h-91.6c-3,0-5.9,1.6-7.4,4.3L638.9,329.5c-3.3,5.7,0.8,12.8,7.4,12.8h91.6
        c3,0,5.9-1.6,7.4-4.3L888.5,89.8C891.8,84.1,887.7,77,881.1,77z"
                    />
                    <path
                        id="XMLID_9_"
                        d="M290.1,288.6h-91.6c-3,0-5.9,1.6-7.4,4.3L79.5,486.2c-3.3,5.7,0.8,12.8,7.4,12.8h91.6
        c3,0,5.9-1.6,7.4-4.3l111.7-193.4C300.8,295.6,296.7,288.6,290.1,288.6z"
                    />
                    <path
                        id="XMLID_8_"
                        d="M568.5,77h-91.6c-3,0-5.9,1.6-7.4,4.3L235.8,486.2c-3.3,5.7,0.8,12.8,7.4,12.8h91.6
        c3,0,5.9-1.6,7.4-4.3L575.9,89.8C579.2,84.1,575.1,77,568.5,77z"
                    />
                </AppLogo>
                <AppTitle>Jordi Orriols</AppTitle>
                <AppSubtitle>
                    Here you can find some articles with different personal
                    experiences and ideas. Hope you enjoy it!
                </AppSubtitle>
            </AppHeader>
            <AppContent>
                <Navigator />
            </AppContent>

            <AppFooter>Copyright © 2023.</AppFooter>
        </AppContainer>
    );
}

export default App;
