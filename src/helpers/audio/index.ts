import Sound from 'react-native-sound';
import parseUrl from 'url-parse';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

let audio;
let currentlyPlaying: string;

type TSoundLocations = 'CACHES' | 'TEMPERORY' | 'MAIN_BUNDLE' | '';

const RNFSDir = (location: TSoundLocations) => {

  switch (location) {
    case 'TEMPERORY':
      return RNFS.TemporaryDirectoryPath;
    case 'CACHES':
      return RNFS.CachesDirectoryPath;
    case 'MAIN_BUNDLE':
      return RNFS.MainBundlePath;
    default:
      return '';
  }
};

const defaultLocation = Platform.OS === 'android' ? 'CACHES' : 'MAIN_BUNDLE';

export const downloadFile = async (
  soundTrack,
  location: TSoundLocations = defaultLocation,
) => {
  let filename: string;
  const url = parseUrl(soundTrack);

  filename = url.pathname.split('/').pop();
  const localSoundTrackPath = `${RNFSDir(location)}/${filename}`.replace(/\/\//, '/');
  const fileExists = await RNFS.exists(localSoundTrackPath);
  console.log(`Looking for file ${localSoundTrackPath}`);

  if (!fileExists) {
    try {
      await RNFS.downloadFile({ fromUrl: soundTrack, toFile: localSoundTrackPath });
      console.log('Downloaded file at ' + localSoundTrackPath);
    } catch (error) {
      console.warn('Could not download file', error);
    }
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
  const soundPath = RNFSDir(location);

  const errorCallback = (error) => {
    console.log('Attempting to play sound track', soundTrack);

    if (error) {
      console.warn('Failed to load the sound', soundPath + '/' + soundTrack);
      console.warn(error);
    }
  };

  try {
    audio = new Sound(soundTrack, soundPath, errorCallback);
    currentlyPlaying = soundTrack;

    setTimeout(stopAndPlayAudio, 200);

  } catch (error) {
    console.warn(error);
  }
};

const stopAndPlayAudio = () => {
  if (typeof audio === 'object') {
    audio.stop(() => {
      audio.play(() => {
        audio.release();
        console.log(`Played sound track ${currentlyPlaying}`, JSON.stringify(audio));
      });
    });
  } else {
    console.warn('What? Audio is not an object?', currentlyPlaying);
  }
};
