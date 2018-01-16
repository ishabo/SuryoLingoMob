import Sound from 'react-native-sound';
import parseUrl from 'url-parse';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

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
  console.log('Playing sound track', soundTrack);
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
  const audio = new Sound(soundTrack, RNFSDir(location), (error) => {
    // loaded successfully
    if (error) {
      console.warn(RNFSDir(location) + '/' + soundTrack);
      console.warn('failed to load the sound');
      console.warn(error);
    }
  });

  setTimeout(() => {
    audio.play(() => {
      console.warn('played');
    });
  }, 600);
};

