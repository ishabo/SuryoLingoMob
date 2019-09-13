import { reducer as settingsReducer } from './index';
import { types } from '../actions';
describe('settings reducer', () => {
    it('should set lesson in progress', () => {
        const initialState = {};
        const actions = {
            type: types.SAVE_SETTINGS,
            settings: {
                maintenance: {
                    switchedOn: false,
                    showDefaultMessage: false,
                    message: {
                        'cl-ara': 'السرفر قيد الصيانة ولذلك قد لا يكون متاحاً في بعض أو كل الأوقات. الرجاء الصبر ومعاودة دراستك في وقت لاحق.'
                    }
                },
                android: {
                    version: '0.2.3',
                    update: {
                        force: true,
                        since: '0.2.0'
                    }
                },
                ios: {
                    version: '0.2.2',
                    update: {
                        force: false,
                        since: '0.2.2'
                    }
                }
            }
        };
        const newState = settingsReducer(initialState, actions);
        expect(newState).toEqual(actions.settings);
    });
});
//# sourceMappingURL=index.test.js.map