import Sound from 'react-native-sound';
import parseUrl from 'url-parse';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
// import SoundPlayer from 'react-native-sound-player';
import { logError } from 'helpers';

let audio;

type TSoundLocations = 'CACHES' | 'TEMPERORY' | 'MAIN_BUNDLE' | 'DOCUMENT' | '';

const RNFSDir = (location: TSoundLocations) => {
  switch (location) {
    case 'TEMPERORY':
      return RNFS.TemporaryDirectoryPath;
    case 'CACHES':
      return RNFS.CachesDirectoryPath;
    case 'MAIN_BUNDLE':
      return RNFS.MainBundlePath;
    case 'DOCUMENT':
      return RNFS.DocumentDirectoryPath;
    default:
      return '';
  }
};

const defaultLocation = Platform.OS === 'android' ? 'CACHES' : 'CACHES';

export const downloadFile = async (soundTrack, downloadDest: TSoundLocations = defaultLocation) => {
  let filename: string;
  const url = parseUrl(soundTrack);
  filename = url.pathname.split('/').pop();
  const localSoundTrackPath = `${RNFSDir(downloadDest)}/${filename}`.replace(/\/\//, '/');
  const fileExists = await RNFS.exists(localSoundTrackPath);

  if (!fileExists) {
    try {
      await RNFS.downloadFile({
        fromUrl: soundTrack,
        toFile: localSoundTrackPath
      });
      console.log('Downloaded file at ' + localSoundTrackPath);
    } catch (error) {
      logError(`Could not download file ${JSON.stringify(error)}`);
    }
  } else {
    console.log(`Found file ${localSoundTrackPath}`);
  }

  return localSoundTrackPath;
};

export const downloadAndPlayAudio = async (soundTrack, location: TSoundLocations = defaultLocation) => {
  const localSoundTrackPath = await downloadFile(soundTrack, location);
  playAudio(localSoundTrackPath);
};

export const playAudio = (fullSoundPath: string) => {
  // const soundPath = RNFSDir(location).replace(/\/$/, '');
  // const fullSoundPath = soundPath + '/' + soundTrack;
  audio = new Sound(fullSoundPath, '', error => {
    if (error) {
      logError(`Failed to load the sound ${JSON.stringify(error)}`);
    } else {
      stopAndPlayAudio();
    }
  });
};

const stopAndPlayAudio = () => {
  if (typeof audio === 'object') {
    audio.stop(() => {
      Sound.setCategory('Playback', false);

      audio.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          logError('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          audio.reset();
        }
        audio.release();
      });
    });
  } else {
    logError('What? Audio is not an object?');
  }
};
