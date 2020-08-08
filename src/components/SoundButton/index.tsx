import * as React from 'react'
import Images from '@sl/assets/images'
import { Thumbnail } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { downloadAndPlayAudio } from '@sl/helpers/audio'

interface IProps {
  soundTrack?: string
  size: { large?: boolean; small?: boolean }
  disabled?: boolean
}

const SoundButton = ({ soundTrack, size, disabled }: IProps) => (
  <TouchableOpacity
    onPress={async () => {
      await downloadAndPlayAudio(soundTrack)
    }}
  >
    <Thumbnail
      {...size}
      source={disabled ? Images.icons.noSpeaker : Images.icons.speaker}
    />
  </TouchableOpacity>
)

export default SoundButton
