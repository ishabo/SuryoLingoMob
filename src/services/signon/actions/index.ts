import {
  ISignonFormData,
  TSignon,
  ISignonFormErrors,
} from '../';

const namespace = 'SuryoLingo/signon';

export const types = {
  SUBMIT_SIGNON: `${namespace}/SUBMIT_SIGNON`,
  CAPTURE_SIGNON: `${namespace}/CAPTURE_SIGNON`,
  SET_ERRORS: `${namespace}/SET_ERRORS`,
  RESET_SIGNON: `${namespace}/RESET_SIGNON`,
  SIGNOUT: `${namespace}/SIGNOUT`,
};

export const submitSignon = (signon: TSignon) => ({
  signon,
  type: types.SUBMIT_SIGNON,
});

export const captureSignon = (data: ISignonFormData) => ({
  data,
  type: types.CAPTURE_SIGNON,
});

export const setErrors = (errors: ISignonFormErrors) => ({
  errors,
  type: types.SET_ERRORS,
});

export const resetSignon = () => ({
  type: types.RESET_SIGNON,
});


export const signout = () => ({
  type: types.SIGNOUT,
});
