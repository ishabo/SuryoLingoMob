import React from 'react';
import Images from '../../../../assets/images';
import { Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { downloadAndPlayAudio } from '../../../../helpers/audio';

interface IProps {
  soundTrack: string;
  size: { large?: boolean; small?: boolean; };
}

const Speaker = ({ soundTrack, size }: IProps) =>
  <TouchableOpacity onPress={() => { downloadAndPlayAudio(soundTrack); }}>
    <Thumbnail {...size} source={Images.icons.speaker} />
  </TouchableOpacity>;

export default Speaker;
