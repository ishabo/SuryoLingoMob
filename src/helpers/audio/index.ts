import Sound from 'react-native-sound';
import parseUrl from 'url-parse';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

let audio;
let currentlyPlaying: string;

type TSoundLocations = string | 'CACHES' | 'TEMPERORY';

const RNFSDir = (location: TSoundLocations) => {

  switch (location) {
    case 'TEMPERORY':
      return RNFS.TemporaryDirectoryPath;
    case 'CACHES':
      return RNFS.CachesDirectoryPath;
    default:
      return '';
  }
};

const defaultLocation = Platform.OS === 'android' ? 'CACHES' : 'TEMPERORY';

export const downloadFile = async (
  soundTrack,
  location: TSoundLocations = defaultLocation,
) => {
  let filename: string;
  const url = parseUrl(soundTrack);

  filename = url.pathname.split('/').pop();
  const localSoundTrackPath = `${RNFSDir(location)}/${filename}`;
  const fileExists = await RNFS.exists(localSoundTrackPath);
  console.log(`Looking for file ${localSoundTrackPath}`);

  if (!fileExists) {
    await RNFS.downloadFile({ fromUrl: soundTrack, toFile: localSoundTrackPath });
    console.log('Donloaded file at ' + localSoundTrackPath);
  } else {
    console.log(`Found file ${localSoundTrackPath}`);
  }

  return filename;
};

export const downloadAndPlayAudio = async (
  soundTrack,
  location: TSoundLocations = defaultLocation,
) => {
  const filename = await downloadFile(soundTrack, location);
  playAudio(filename, location);
};

export const playAudio = (soundTrack, location: TSoundLocations = defaultLocation) => {
  if (currentlyPlaying !== soundTrack) {
    audio = new Sound(soundTrack, RNFSDir(location), (error) => {
      console.log('Attempting to play sound track', soundTrack);

      // loaded successfully
      if (error) {
        console.warn(RNFSDir(location) + '/' + soundTrack);
        console.warn('failed to load the sound');
        console.warn(error);
      }
    });
    currentlyPlaying = soundTrack;
  }

  setTimeout(() => {
    audio.stop(() => {
      audio.play(() => {
        console.log('Played sound track', soundTrack);
      });
    });

  }, 200);

};


