import { IDictionary } from '../';

const namespace = 'SuryoLingo/dictinoaries';

export const types = {
  SAVE_DICTIONARIES: `${namespace}/SAVE_DICTIONARIES`,
  FETCH_DICTIONARIES: `${namespace}/FETCH_DICTIONARIES`
};

export const saveDictionaries = (dictionaries: IDictionary[]) => ({
  dictionaries,
  type: types.SAVE_DICTIONARIES
});

export const fetchDictionaries = (courseId?: string) => ({
  courseId,
  type: types.FETCH_DICTIONARIES
});
