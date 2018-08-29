import { Platform } from 'react-native';
export default {
  admob: {
    interstitial: {
      skills: Platform.select({
        ios: 'ca-app-pub-8869715274661120/9199012379',
        android: 'ca-app-pub-8869715274661120/9199012379'
      })
    }
  }
};
