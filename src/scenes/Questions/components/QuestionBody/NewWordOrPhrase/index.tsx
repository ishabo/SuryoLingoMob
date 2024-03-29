import * as React from 'react'
import { scaleSize } from '@sl/helpers'
import { IAnswerProps } from '@sl/scenes/Questions/index.types'
import { ICourse } from '@sl/services/courses'
import Phrase, { IProps as IPhraseProps } from '@sl/components/Phrase'
import { GSContainer, GSMeaning, GSPhrase } from './index.styles'

interface IProps extends IAnswerProps, IPhraseProps {
  translation: string
  phrase: string
  course: ICourse
}

const NewWordOrPhrase: React.FC<IProps> = ({
  sentence,
  translation,
  course,
  lang: targetLang,
}) => {
  const sourceLang = course.sourceLanguage.shortName as TLangs
  return (
    <GSContainer>
      <Phrase
        lang={targetLang}
        sentence={sentence}
        style={{ fontSize: scaleSize(28, 22) }}
      />
      <GSMeaning />
      <GSPhrase lang={sourceLang}>{translation}</GSPhrase>
    </GSContainer>
  )
}

export default NewWordOrPhrase
