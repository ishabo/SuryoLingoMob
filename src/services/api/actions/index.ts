const namespace = 'SuryoLingo/api';
export const types = {
  LOADING: `${namespace}/LOADING`,
};

export const setLoadingOn = () => ({
  loading: true,
  type: types.LOADING,
});

export const setLoadingOff = () => ({
  loading: false,
  type: types.LOADING,
});
