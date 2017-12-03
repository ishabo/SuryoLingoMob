import { create } from 'apisauce';

export const api = create({
    baseURL: getHost(),
    headers: { Accept: 'application/json' },
});