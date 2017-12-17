import React from 'react';
import Images from '../../../../assets/images';
import { Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { playAudio } from '../../../../helpers/audio';

interface IProps {
  soundTrack: string;
  location?: string;
  size: { large?: boolean; small?: boolean; };
}

const Speaker = ({ soundTrack, location, size }: IProps) =>
  <TouchableOpacity onPress={() => { playAudio(soundTrack, location || 'MAIN_BUNDLE'); }}>
    <Thumbnail {...size} source={Images.icons.speaker} />
  </TouchableOpacity>;

export default Speaker;
