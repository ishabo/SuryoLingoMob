import Sound from 'react-native-sound';
import parseUrl from 'url-parse';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

let audio;
let currentlyPlaying: string;

type TSoundLocations = 'CACHES' | 'TEMPERORY' | '';

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
    console.log('Downloaded file at ' + localSoundTrackPath);
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
      console.warn(soundPath + '/' + soundTrack);

      console.warn('failed to load the sound');
      console.warn(error);
    }
  };

  try {
    if (currentlyPlaying !== soundTrack) {
      audio = new Sound(soundTrack, soundPath, errorCallback);
      currentlyPlaying = soundTrack;
    }

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
        // console.warn(`Played sound track ${currentlyPlaying}`, JSON.stringify(audio));
      });
    });
  }
};



