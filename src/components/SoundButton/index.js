import * as tslib_1 from "tslib";
import * as React from 'react';
import Images from 'assets/images';
import { Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { downloadAndPlayAudio } from 'helpers/audio';
const SoundButton = ({ soundTrack, size, disabled }) => (React.createElement(TouchableOpacity, { onPress: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield downloadAndPlayAudio(soundTrack);
    }) },
    React.createElement(Thumbnail, Object.assign({}, size, { source: disabled ? Images.icons.noSpeaker : Images.icons.speaker }))));
export default SoundButton;
//# sourceMappingURL=index.js.map