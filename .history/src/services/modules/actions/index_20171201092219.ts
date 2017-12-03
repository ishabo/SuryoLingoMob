import { IModule } from '../reducers';

const namespace = 'SuryoLingo/Modules';

export const types = {
  SAVE_MODULES: `${namespace}/SAVE_MODULES`,
  FETCH_MODULES: `${namespace}/FETCH_MODULES`,
};

export const saveModules = (payload: IModule[]) => ({
  payload,
  type: types.SAVE_MODULES,
});

export const fetchModules = () => ({
  type: types.FETCH_MODULES,
});
