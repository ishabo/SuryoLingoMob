import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import images from '@sl/assets/images'
import SkillIcon from '../SkillIcon'
import { GSBackground, GSSkill, GSSkillTitle } from './index.styles'
import { ProgressCircle } from '@sl/components'
import Colors from '@sl/styles/colors'

export interface IProps {
  onSkillsClick: () => void
  name: string
  icon: string
  progress: number
  unlocked: boolean
  inactive: boolean
}

export default (props: IProps) => {
  const { name, unlocked, progress, icon, onSkillsClick, inactive } = props

  const imageState = unlocked ? 'unlocked' : 'locked'

  return (
    <GSSkill>
      <TouchableOpacity onPress={onSkillsClick}>
        <GSBackground source={images.skills.bg[imageState]} />
        <ProgressCircle
          backgroundColor={inactive ? Colors.lightGray : Colors.lightYellow}
          size='large'
          progress={unlocked ? progress : 0}
        >
          <SkillIcon icon={icon} state={imageState} />
        </ProgressCircle>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSkillsClick}>
        <GSSkillTitle>{name}</GSSkillTitle>
      </TouchableOpacity>
    </GSSkill>
  )
}
