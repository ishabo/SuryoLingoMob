import SInfo from 'react-native-sensitive-info'
import Config from '@sl/config'

export const getAccessToken = async () => {
  const accessToken = await SInfo.getItem(
    'accessToken',
    Config.sInfoOptions as any,
  )
  return accessToken
}

export const setAccessToken = async (token: string) =>
  await SInfo.setItem('accessToken', token, Config.sInfoOptions as any)

export const deleteAccessToken = async () =>
  await SInfo.deleteItem('accessToken', Config.sInfoOptions as any)
