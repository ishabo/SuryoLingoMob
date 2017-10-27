import React from 'react';
import Colors from '../../styles/colors';
import I18n from '../../i18n';
import {
    GSBanner,
    GSBannerTail,
    GSTriangle,
    GSMessageBox,
    GSMessageText,
    GSBannerHeader,
    GSBannerText,
    GSBoldText
} from './index.styles'
interface IProps {
    passed: boolean;
    answer?: string;
    correctAnswer?: string;
}

const bgColor = (passed: boolean) => passed ? Colors.lightGreen : Colors.lightRed
const passTitle = (passed: boolean) => I18n.t(`questions.evaluation.${passed ? 'passed' : 'failed'}`)
const EvaluationBanner = ({ passed, answer, correctAnswer }: IProps) =>
    <GSBanner>
        <GSBannerTail>
            <GSTriangle color={bgColor(passed)} upsideDown />
            <GSTriangle color={bgColor(passed)} />
        </GSBannerTail>

        <GSMessageBox style={{ backgroundColor: bgColor(passed) }}>
            <GSMessageText>
                <GSBannerHeader>
                    {passTitle(passed)}
                </GSBannerHeader>
                {passed || answer && <GSBannerText>
                    <GSBoldText>{I18n.t('questions.evaluation.youAnswered')}</GSBoldText> {answer}
                </GSBannerText>}
                {passed || correctAnswer && <GSBannerText>
                    <GSBoldText>{I18n.t('questions.evaluation.correctAnswer')}</GSBoldText> {correctAnswer}
                </GSBannerText>}
            </GSMessageText>
        </GSMessageBox>
    </GSBanner>


export default EvaluationBanner;
