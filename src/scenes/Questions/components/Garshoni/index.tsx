import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import Config from 'config/';
import { TTargetLangs, TLearnerLangs } from 'services/courses';
import { IInitialState } from 'services/reducers';
import { getActiveCourse } from 'services/selectors';

interface IProps {
  sentence: string;
  reverse: boolean;
  learnersLang: TLearnerLangs;
  targetLang: TTargetLangs;
}

const Garshoni = ({ sentence, learnersLang, targetLang, reverse }: IProps) => {

  const sentenceArr = sentence.split('');
  const letters = Config.garshoni[reverse
    ? `${learnersLang}-to-${targetLang}`
    : `${targetLang}-to-${learnersLang}`
  ];

  const transliteration = sentenceArr.map((char: string) => {
    const newChar = char === ' ' ? ' ' : letters[char];

    return newChar;
  }).join('');
  return <Text>{transliteration}</Text>;
};

const mapStateToProps = (state: IInitialState) => {
  const course = getActiveCourse(state);
  return {
    targetLang: course.targetLanguage.shortName,
    learnersLang: course.learnersLanguage.shortName,
  };
};

export default connect(mapStateToProps)(Garshoni);
