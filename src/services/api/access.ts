import SInfo from 'react-native-sensitive-info';
import Config from 'config';

export const getAccessToken = async () => {
  const accessToken = await SInfo.getItem('accessToken', Config.sInfoOptions);
  return accessToken;
};

export const setAccessToken = async (token: string) =>
  await SInfo.setItem('accessToken', token, Config.sInfoOptions);

export const deleteAccessToken = async () =>
  await SInfo.deleteItem('accessToken', Config.sInfoOptions);
