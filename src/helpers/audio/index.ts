import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import parseUrl from 'url-parse';

type TSoundLocations = string | 'CACHES' | 'MAIN_BUNDLE';

const RNFSDir = (location: TSoundLocations) => {
  switch (location) {
    case 'MAIN_BUNDLE':
      return RNFS.MainBundlePath;
    case 'CACHES':
      return RNFS.CachesDirectoryPath;
    case 'DOCUMENT':
      return RNFS.DocumentDirectoryPath;
    case 'LIBRARY':
      return RNFS.LibraryDirectoryPath;
    default:
      throw new Error(`${location} isn't a valid sound location`);
  }
};

export const downloadAndPlayAudio = async (soundTrack) => {
  console.log('Playing sound track', soundTrack);
  let filename: string;
  const url = parseUrl(soundTrack);

  filename = url.pathname.split('/').pop();
  const localSoundTrackPath = `${RNFSDir('CACHES')}/${filename}`;
  const fileExists = await RNFS.exists(localSoundTrackPath);
  console.log(`Looking for file ${localSoundTrackPath}`);

  if (!fileExists) {
    await RNFS.downloadFile({ fromUrl: soundTrack, toFile: localSoundTrackPath });
    console.log('Donloaded file at ' + localSoundTrackPath);
  } else {
    console.log(`Found file ${localSoundTrackPath}`);
  }

  playAudio(filename, 'CACHES');
};

export const playAudio = async (soundTrack, location: string = 'CACHES') => {

  const audio = new Sound(soundTrack, RNFSDir(location), (error) => {
    if (error) {
      console.log('failed to load the sound');
      console.warn(JSON.stringify(error));
      return;
    }
    // loaded successfully
    console.log('duration in seconds: '
      + audio.getDuration()
      + ' and number of channels: '
      + audio.getNumberOfChannels());
  });

  setTimeout(() => {
    audio.play(() => {
      // if (success) {
      //   console.log('successfully finished playing');
      // } else {
      //   console.log('playback failed due to audio decoding errors');
      //   // reset the player to its uninitialized state (android only)
      //   // this is the only option to recover after an error occured and use the player again
      //   audio.reset();
      // }
    });
  },         200);
};

