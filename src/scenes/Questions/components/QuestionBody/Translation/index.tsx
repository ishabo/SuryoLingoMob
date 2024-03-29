import * as React from 'react'
import { Container } from 'native-base'
import I18n from '@sl/i18n'
import { TextArea } from '@sl/components'
import { ICourse } from '@sl/services/courses'
import glamor from 'glamorous-native'
import { IAnswerProps } from '../../../index.types'

interface IProps extends IAnswerProps {
  course: ICourse
  reverse: boolean
}

export default class Translation extends React.Component<IProps> {
  render() {
    const { course, userHasAnswered, reverse, collectAnswer } = this.props
    const translateTo: string = reverse ? 'targetLanguage' : 'sourceLanguage'
    const placeholder = I18n.t(
      `questions.translateTo.${course[translateTo].shortName}`,
    )
    return (
      <GSContainer>
        <TextArea
          disableKeyboard={userHasAnswered}
          placeholder={placeholder}
          captureInput={collectAnswer}
          showCustomKeyboard={reverse && !userHasAnswered}
          inputLanguage={course[translateTo].shortName}
          autoFocus={!reverse}
          onSubmit={this.props.onSubmit}
          renderNextButton={this.props.renderNextButton}
        />
      </GSContainer>
    )
  }
}

const GSContainer = glamor(Container)({
  alignSelf: 'stretch',
})

GSContainer.displayName = 'GSContainer'
