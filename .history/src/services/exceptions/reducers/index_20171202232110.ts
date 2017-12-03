import { IException, IAction } from '../';
import { types } from '../actions';

const initialState: ReadonlyArray<IException> = [];

let exceptionId = 0;

export default (
  state: ReadonlyArray<IException> = initialState,
  action: IAction,
) => {
  switch (action.type) {
    case types.ADD:
      exceptionId += 1;
      return state.concat({
        id: exceptionId,
        ...action.payload,
      } as IException);
    case types.REMOVE: {
      return state.reduce(
        (prev: IException[], stateException: IException): IException[] => {
          if (stateException.id !== action.id) {
            return prev.concat(stateException);
          }
          return prev;
        },
        [] as IException[],
      );
    }
    case types.REMOVE_ALL: {
      return [];
    }
    default:
      return state;
  }
};

export const getApplicationExceptions = (state: IException[]) =>
  state.filter((exception: IException) => {
    const { name, response } = exception;
    if (['TIMEOUT_ERROR', 'NETWORK_ERROR', 'CONNECTION_ERROR'].includes(name)) {
      return true;
    }
    if (<any>[401, 403, 500].includes(response.status)) {
      return true;
    }

    return false;
  });

export const getInvalidExceptions = (state: IException[]) =>
  state.filter((exception: IException) => {
    const { response } = exception;
    if (response.status === 400) {
      return true;
    }

    return false;
  });

export const getLatestException = (state: IException[]) =>
  state[state.length - 1];
