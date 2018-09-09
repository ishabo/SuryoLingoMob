import { AdMobInterstitial } from 'react-native-admob';
import vars from 'config/vars';

export type TScenes = 'skills' | 'completion';
export const displayInterstitialAd = (scene: TScenes) => {
  if (__DEV__) AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  AdMobInterstitial.setAdUnitID(vars.admob.interstitial[scene]);
  AdMobInterstitial.requestAd()
    .then(() => AdMobInterstitial.showAd())
    .catch(error => console.warn('=======>', error));
};
