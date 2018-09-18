import { Platform } from 'react-native';
export default {
  admob: {
    interstitial: {
      skills: Platform.select({
        ios: 'ca-app-pub-8869715274661120/4411509534',
        android: 'ca-app-pub-8869715274661120/9199012379'
      }),
      completion: Platform.select({
        ios: 'ca-app-pub-8869715274661120/2914595035',
        android: 'ca-app-pub-8869715274661120/5533019519'
      })
    }
  }
};
