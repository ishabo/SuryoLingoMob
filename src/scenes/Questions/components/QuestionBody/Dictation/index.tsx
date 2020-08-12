import * as React from 'react'
import { Container } from 'native-base'
import { TextArea } from '@sl/components'
import I18n from '@sl/i18n'
import { ICourse } from '@sl/services/courses'
import glamor from 'glamorous-native'
import { IAnswerProps } from '../../../index.types'

interface IProps extends IAnswerProps {
  reverse: boolean
  course: ICourse
}

export default class Dictation extends React.Component<IProps> {
  render() {
    return (
      <GSContainer>
        <TextArea
          disableKeyboard={this.props.userHasAnswered}
          placeholder={I18n.t(`questions.dictation`)}
          captureInput={this.props.collectAnswer}
          showCustomKeyboard={this.props.reverse && !this.props.userHasAnswered}
          inputLanguage={this.props.course.targetLanguage.shortName}
          onSubmit={this.props.onSubmit}
          renderNextButton={this.props.renderNextButton}
        />
      </GSContainer>
    )
  }
}

export const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
})
GSContainer.displayName = 'GSContainer'
