import * as React from 'react';
import Colors from 'styles/colors';
import I18n from 'I18n';
import { Text } from 'react-native';
import {
  GSBanner,
  GSBannerTail,
  GSTriangle,
  GSMessageBox,
  GSMessageText,
  GSBannerHeader,
  GSBannerText,
  GSBoldText,
} from './index.styles';
import * as Animatable from 'react-native-animatable';

interface IProps {
  passed: boolean;
  correctAnswer?: string | JSX.Element;
  lang: TLangs;
}

const AnimatedEvaluationBanner = Animatable.createAnimatableComponent(GSBanner as any);

const bgColor = (passed: boolean) => passed ? Colors.lightGreen : Colors.lightRed;
const passTitle = (passed: boolean) =>
  I18n.t(`questions.evaluation.${passed ? 'passed' : 'failed'}`);

export default ({ passed, correctAnswer }: IProps) => {

  const showCorrectAnswer = correctAnswer && <GSBannerText lang={'cl-ara'}>
    <GSBoldText fontType='bold' lang='cl-ara'>{I18n.t('questions.evaluation.correctAnswer')}</GSBoldText> {correctAnswer}
  </GSBannerText>;

  return <AnimatedEvaluationBanner delay={0} easing='ease-out-expo' duration={600} animation="slideInUp">
    <GSMessageBox style={{ backgroundColor: bgColor(passed) }}>
      <GSMessageText>
        <GSBannerHeader fontType='bold' lang={'cl-ara'}>
          {passTitle(passed)}
        </GSBannerHeader>
        {passed && <GSBannerText /> || showCorrectAnswer}
      </GSMessageText>
    </GSMessageBox>

    <GSBannerTail>
      <GSTriangle color={bgColor(passed)} upsideDown ><Text></Text></GSTriangle>
      <GSTriangle color={bgColor(passed)} ><Text></Text></GSTriangle>
    </GSBannerTail>
  </AnimatedEvaluationBanner>;

}