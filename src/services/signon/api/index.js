import { create } from 'services/api';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
export const signin = (payload) => {
    const api = create();
    return api.post('/auth/signin', payload);
};
export const checkEmailExists = (email) => create().api.get(`/auth/check-email?${email}`);
export const recoverPassword = (email) => {
    const api = create();
    return api.post('/auth/recover-password', { email });
};
export const getFacebookProfile = (accessToken) => new Promise((resolve, reject) => {
    const responseInfoCallback = (error, result) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(result);
        }
    };
    const infoRequest = new GraphRequest('/me', {
        accessToken,
        parameters: {
            fields: {
                string: 'picture.height(450),email,name,first_name,middle_name,last_name'
            }
        }
    }, responseInfoCallback);
    new GraphRequestManager().addRequest(infoRequest).start();
});
//# sourceMappingURL=index.js.map