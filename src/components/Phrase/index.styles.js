import { GSCustomStudyText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { scaleSize } from 'helpers';
export const GSHints = glamor.view({
    flex: 1,
    backgroundColor: Colors.lightBlack,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: 5,
    width: 150,
    height: 200
});
export const GSHintBlock = glamor.view({
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: Colors.lightBlack
}, props => !props.last
    ? {
        borderBottomColor: Colors.lightGray
    }
    : null);
export const GSHintText = glamor.text({
    color: Colors.white,
    textAlign: 'center',
    alignSelf: 'stretch'
});
export const GSHintedSentence = glamor.view({
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 0
});
export const GSSentence = glamor(GSCustomStudyText)({
    paddingVertical: 3,
    flexWrap: 'wrap'
}, props => {
    let style = {};
    style = props.hasTooltip
        ? Object.assign({ color: Colors.darkBlue, fontSize: props.lang === 'cl-ara' ? scaleSize(24, 20) : scaleSize(20, 14) }, style)
        : style;
    return style;
});
//# sourceMappingURL=index.styles.js.map