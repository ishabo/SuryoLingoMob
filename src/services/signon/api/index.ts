import { create } from 'services/api';
import { ISignonFormData } from '../';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export const signin = (payload: ISignonFormData) => {
  const api = create();
  return api.post('/auth/signin', payload);
};

export const checkEmailExists = (email: string) => create().api.get(`/auth/check-email?${email}`);

export const recoverPassword = (email: string) => {
  const api = create();
  return api.post('/auth/recover-password', { email });
};

export const getFacebookProfile = (accessToken: string) =>
  new Promise((resolve, reject) => {
    const responseInfoCallback = (error, result) => {
      if (error) {
        reject(error);
      } else {
        console.warn(result.picture.data.url);
        resolve(result);
      }
    };

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken,
        parameters: {
          fields: {
            string: 'picture.height(450),email,name,first_name,middle_name,last_name'
          }
        }
      },
      responseInfoCallback
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  });
