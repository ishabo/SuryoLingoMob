import Sound from 'react-native-sound';

export const playAudio = (soundTrack, location: string = 'MAIN_BUNDLE') => {

  const audio = new Sound(soundTrack, Sound[location], (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: '
      + audio.getDuration()
      + ' and number of channels: '
      + audio.getNumberOfChannels());
  });

  setTimeout(() => {
    console.log('asdasd');
    audio.play((success: any) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        audio.reset();
      }
    });
  },         500);
};

