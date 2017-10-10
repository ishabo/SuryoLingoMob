import React from 'react';
import Images from '../../assets/images';
import { Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { playAudio } from '../../helpers/audio';

interface IProps {
    soundTrack: string;
    location?: string;
}

const Speaker = ({ soundTrack, location }: IProps) =>
    <TouchableOpacity onPress={() => { playAudio(soundTrack, location || 'MAIN_BUNDLE') }}>
        <Thumbnail size={40} source={Images.icons.speaker} />
    </TouchableOpacity>

export default Speaker;