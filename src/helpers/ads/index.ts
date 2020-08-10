import { AdMobInterstitial } from 'react-native-admob'
import vars from '@sl/config/vars'
import { logError } from '@sl/helpers/logging'

export type TScenes = 'skills' | 'completion'

export const displayInterstitialAd = (scene: TScenes) => {
  try {
    AdMobInterstitial.setAdUnitID(vars.admob.interstitial[scene])
    AdMobInterstitial.setTestDevices([
      '359040086011833',
      AdMobInterstitial.simulatorId,
    ])
    AdMobInterstitial.requestAd()
      .then(() => AdMobInterstitial.showAd())
      .catch(error => logError(JSON.stringify(error)))
  } catch (e) {
    logError(JSON.stringify(e))
  }
}
