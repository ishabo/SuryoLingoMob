import { IException } from '..'

export const getApplicationExceptions = (state: IException[]) =>
  state.filter((exception: IException) => {
    const { name, response } = exception
    if (['TIMEOUT_ERROR', 'NETWORK_ERROR', 'CONNECTION_ERROR'].includes(name)) {
      return true
    }
    if ([401, 403, 500].includes(response.status)) {
      return true
    }

    return false
  })

export const getInvalidExceptions = (state: IException[]) =>
  state.filter((exception: IException) => {
    const { response } = exception
    if (response.status === 400) {
      return true
    }

    return false
  })

export const getLatestException = (state: IException[]) =>
  state[state.length - 1]

export const hasNetworkError = (state: IException[]): boolean => {
  const exception = getLatestException(state)
  return exception && exception.name === 'NETWORK_ERROR'
}
