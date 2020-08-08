import * as React from 'react'
import { IAnswerProps } from '../../../index.types'
import I18n from '@sl/i18n'
import shortid from 'shortid'
import { ICourse } from '@sl/services/courses'
import { TouchableOpacity, ScrollView } from 'react-native'
import {
  GSChoice,
  GSContainer,
  GSContent,
  GSRadio,
  GSText,
  GSTitle,
} from './index.styles'
import { shuffle } from 'lodash'

interface IProps extends IAnswerProps {
  phrase: string
  translation: string
  incorrectChoices: string[]
  otherCorrectAnswers: string[]
  reverse: boolean
  course: ICourse
}

interface IState {
  answer: string[]
  choices: string[]
}

export default class MultiChoice extends React.Component<IProps, IState> {
  public state = {
    answer: [],
    choices: [],
  }

  componentDidMount() {
    const {
      reverse,
      phrase,
      translation,
      incorrectChoices,
      otherCorrectAnswers,
    } = this.props
    const correctChoice = reverse ? phrase : translation

    const correctChoices =
      otherCorrectAnswers && Array.isArray(otherCorrectAnswers)
        ? [...otherCorrectAnswers, correctChoice]
        : [correctChoice]

    this.setState({
      choices: shuffle(correctChoices.concat(incorrectChoices)),
    })
  }

  updateAnswers = (choice: string) => {
    const { answer } = this.state
    const index: number = answer.indexOf(choice)

    if (index >= 0) {
      answer.splice(index, 1)
    } else {
      answer.push(choice)
    }

    this.setState({ answer }, () => {
      this.props.collectAnswer(answer)
    })
  }

  getWordTextLang = () => {
    const { reverse, course } = this.props
    return reverse
      ? course.targetLanguage.shortName
      : course.sourceLanguage.shortName
  }

  isChoiceSelected = (choice: string): boolean => {
    const index: number = this.state.answer.indexOf(choice)
    return index >= 0
  }

  renderChoices = () =>
    this.state.choices.map((choice: string) => (
      <TouchableOpacity
        key={shortid.generate()}
        onPress={() => this.updateAnswers(choice)}
      >
        <GSChoice checked={this.isChoiceSelected(choice)}>
          <GSRadio checked={this.isChoiceSelected(choice)} />
          <GSText lang={this.getWordTextLang()}>{choice}</GSText>
        </GSChoice>
      </TouchableOpacity>
    ))

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 80, flex: 1 }}>
        <GSContainer>
          <GSContent>
            <GSTitle>{I18n.t('questions.multiChoice')}</GSTitle>
            {this.renderChoices()}
          </GSContent>
        </GSContainer>
      </ScrollView>
    )
  }
}
