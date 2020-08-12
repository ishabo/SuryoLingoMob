import * as React from 'react'
import { connect } from 'react-redux'
import glamor from 'glamorous-native'
import { getSkillIcon } from '@sl/services/selectors'
import { IInitialState } from '@sl/services/reducers'
import { TImageSizes } from '@sl/services/assets'

const GSIcon = glamor.image<{ size: number }>(
  {
    alignSelf: 'center',
  },
  (props) => ({
    width: props.size || 100,
    height: props.size || 100,
  }),
)

interface ISkillIconProps {
  icon: string
  size?: TImageSizes
  state?: 'unlocked' | 'locked'
  getSkillIcon: (icon: string, size: TImageSizes) => void
}

const mapStateToProps = (state: IInitialState) => ({
  getSkillIcon: getSkillIcon(state),
})

const sizes = {
  hdpi: 50,
  xhdpi: 88,
  xxhdpi: 100,
  xxxhdpi: 130,
}

export default connect(mapStateToProps)(
  ({
    icon,
    size = 'xhdpi',
    getSkillIcon,
    state = 'unlocked',
  }: ISkillIconProps) => (
    <GSIcon
      source={{
        uri: `data:image/png;base64,${getSkillIcon(icon, size)[state]}`,
      }}
      size={sizes[size]}
    />
  ),
)
