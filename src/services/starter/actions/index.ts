const namespace = 'SuryoLingo/starter'

export const types = {
  FIRST_FETCH: `${namespace}/FIRST_FETCH`,
  ON_APP_START: `${namespace}/ON_APP_START`,
}

export const firstFetch = () => ({
  checkSettings: true,
  type: types.FIRST_FETCH,
})

export const onAppStart = () => ({
  type: types.ON_APP_START,
})
