import React from 'react';
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

interface IProps {
  passed: boolean;
  correctAnswer?: string | JSX.Element;
  lang: TLangs;
}

const bgColor = (passed: boolean) => passed ? Colors.lightGreen : Colors.lightRed;
const passTitle = (passed: boolean) =>
  I18n.t(`questions.evaluation.${passed ? 'passed' : 'failed'}`);

const EvaluationBanner = ({ passed, correctAnswer, lang }: IProps) =>
  <GSBanner>
    <GSMessageBox style={{ backgroundColor: bgColor(passed) }}>
      <GSMessageText>
        <GSBannerHeader lang={lang}>
          {passTitle(passed)}
        </GSBannerHeader>
        {passed || correctAnswer && <GSBannerText lang={lang}>
          <GSBoldText lang={lang}>{I18n.t('questions.evaluation.correctAnswer')}</GSBoldText> {correctAnswer}
        </GSBannerText>}
      </GSMessageText>
    </GSMessageBox>

    <GSBannerTail>
      <GSTriangle color={bgColor(passed)} upsideDown ><Text></Text></GSTriangle>
      <GSTriangle color={bgColor(passed)} ><Text></Text></GSTriangle>
    </GSBannerTail>
  </GSBanner>;

export default EvaluationBanner;
