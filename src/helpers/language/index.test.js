import * as h from './index';
describe('language', () => {
    describe('ignoreByPattern', () => {
        it('pulls patterns for a specified language and runs a replace for each pattern', () => {
            const patterns = [
                { pattern: /^([a-z]{1})[0-9]{0,1}([a-z]+)$/, replace: '$1$2' },
                { pattern: /a$/, replace: '@' }
            ];
            expect(h.ignoreByPattern('b1la', patterns)).toBe('bl@');
            expect(h.ignoreByPattern('bla', patterns)).toBe('bl@');
            expect(h.ignoreByPattern('b2laa', patterns)).toBe('bla@');
        });
    });
});
//# sourceMappingURL=index.test.js.map