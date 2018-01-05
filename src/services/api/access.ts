import SInfo from 'react-native-sensitive-info';
import Config from 'config';

export const getTokenFromKeychain = async () => {
  const accessToken = await SInfo.getItem('accessToken', Config.sInfoOptions);
  if (!accessToken) {
    throw new Error(`No Token found in ${JSON.stringify(Config.sInfoOptions)}`);
  }
  return accessToken;
};
