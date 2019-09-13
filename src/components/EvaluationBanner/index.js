import * as React from 'react';
import Colors from 'styles/colors';
import I18n from 'I18n';
import { Text } from 'react-native';
import { GSBanner, GSBannerTail, GSTriangle, GSMessageBox, GSMessageText, GSBannerHeader, GSBannerText, GSBoldText, } from './index.styles';
import * as Animatable from 'react-native-animatable';
const AnimatedEvaluationBanner = Animatable.createAnimatableComponent(GSBanner);
const bgColor = (passed) => (passed ? Colors.lightGreen : Colors.lightRed);
const passTitle = (passed) => I18n.t(`questions.evaluation.${passed ? 'passed' : 'failed'}`);
export default ({ passed, correctAnswer, multipleAnswers }) => {
    const showCorrectAnswer = correctAnswer && (React.createElement(GSBannerText, { lang: 'cl-ara' },
        React.createElement(GSBoldText, { fontType: "bold", lang: "cl-ara" }, I18n.t(`questions.evaluation.${multipleAnswers ? 'correctAnswers' : 'correctAnswer'}`)),
        ' ',
        correctAnswer));
    return (React.createElement(AnimatedEvaluationBanner, { delay: 0, easing: "ease-out-expo", duration: 600, animation: "slideInUp" },
        React.createElement(GSMessageBox, { style: { backgroundColor: bgColor(passed) } },
            React.createElement(GSMessageText, null,
                React.createElement(GSBannerHeader, { fontType: "bold", lang: 'cl-ara' }, passTitle(passed)),
                (passed && React.createElement(GSBannerText, null)) || showCorrectAnswer)),
        React.createElement(GSBannerTail, null,
            React.createElement(GSTriangle, { color: bgColor(passed), upsideDown: true },
                React.createElement(Text, null)),
            React.createElement(GSTriangle, { color: bgColor(passed) },
                React.createElement(Text, null)))));
};
//# sourceMappingURL=index.js.map