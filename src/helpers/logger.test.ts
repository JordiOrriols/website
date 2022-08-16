/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { logger } from './logger';
import { magicNumber } from './numbers';

const two = 2;
describe('logger', (): void => {
    it('should log log', (): void => {
        expect.assertions(two);

        expect((): void => {
            logger.log('MyMessage');
        }).not.toThrow();
    });

    it('should log log with data', (): void => {
        expect.assertions(two);

        expect((): void => {
            logger.log('MyMessage', { data: 'data' });
        }).not.toThrow();
    });

    it('should log info', (): void => {
        expect.assertions(1);

        expect((): void => {
            logger.info('MyMessage');
        }).not.toThrow();
    });

    it('should log info with data', (): void => {
        expect.assertions(1);

        expect((): void => {
            logger.info('MyMessage', { data: 'data' });
        }).not.toThrow();
    });

    it('should log warn', (): void => {
        expect.assertions(two);

        expect((): void => {
            logger.warn('MyMessage');
        }).not.toThrow();
    });

    it('should log warn with data', (): void => {
        expect.assertions(two);

        expect((): void => {
            logger.warn('MyMessage', { data: 'data' });
        }).not.toThrow();
    });

    it('should log error', (): void => {
        expect.assertions(two);

        expect((): void => {
            logger.error('MyMessage');
        }).not.toThrow();
    });

    it('should log error with data', (): void => {
        expect.assertions(two);

        expect((): void => {
            logger.error('MyMessage', { data: 'data' });
        }).not.toThrow();
    });

    it('should log exception', (): void => {
        expect.assertions(magicNumber.two);

        expect((): void => {
            logger.exception(new Error('Error message'));
        }).not.toThrow();
    });
});
