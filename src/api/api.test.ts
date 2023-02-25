/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { magicNumber } from '../helpers/numbers';

import { getFromApi } from './api';
describe('api', (): void => {
    describe('getFromApi', (): void => {
        it('handles response message', (): void => {
            expect.assertions(magicNumber.one);
            const fetchMock: any = async (): Promise<any> => ({
                ok: true,
                json: (): Promise<any> => Promise.resolve({}),
            });
            jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
            expect(async (): Promise<void> => {
                await getFromApi('GET', 'posts');
            }).not.toThrow();
        });
    });
});
