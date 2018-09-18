import { ISignonFormData, TSignonType, ISignonFormErrors } from '../';

const namespace = 'SuryoLingo/signon';

export const types = {
  SUBMIT_SIGNON: `${namespace}/SUBMIT_SIGNON`,
  CAPTURE_SIGNON: `${namespace}/CAPTURE_SIGNON`,
  SET_ERRORS: `${namespace}/SET_ERRORS`,
  RESET_SIGNON: `${namespace}/RESET_SIGNON`,
  SIGNOUT: `${namespace}/SIGNOUT`,
  RECOVER_PASSWORD: `${namespace}/RECOVER_PASSWORD`,
  CONNECT_VIA_FACEBOOK: `${namespace}/CONNECT_VIA_FACEBOOK`
};

export const submitSignon = (signon: TSignonType) => ({
  signon,
  type: types.SUBMIT_SIGNON
});

export const captureSignon = (data: ISignonFormData) => ({
  data,
  type: types.CAPTURE_SIGNON
});

export const setErrors = (errors: ISignonFormErrors) => ({
  errors,
  type: types.SET_ERRORS
});

export const reseTSignonType = () => ({
  type: types.RESET_SIGNON
});

export const signout = () => ({
  type: types.SIGNOUT
});

export const recoverPassword = (email: string) => ({
  email,
  type: types.RECOVER_PASSWORD
});

export const connectViaFacebook = (signon: TSignonType) => ({
  signon,
  type: types.CONNECT_VIA_FACEBOOK
});
