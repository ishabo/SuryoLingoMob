import { AdMobInterstitial } from 'react-native-admob';
import vars from 'config/vars';
import { logError } from 'helpers';
export const displayInterstitialAd = (scene) => {
    try {
        AdMobInterstitial.setAdUnitID(vars.admob.interstitial[scene]);
        AdMobInterstitial.setTestDevices(['359040086011833', AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd()
            .then(() => AdMobInterstitial.showAd())
            .catch(error => logError(JSON.stringify(error)));
    }
    catch (e) {
        logError(JSON.stringify(e));
    }
};
//# sourceMappingURL=index.js.map