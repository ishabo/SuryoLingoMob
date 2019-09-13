import { Container, Content } from 'native-base';
import glamor from 'glamorous-native';
import { GSCustomText, GSCustomStudyText } from 'styles/text';
import Colors from 'styles/colors';
export const GSChoice = glamor.view({
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 4,
    flexDirection: 'row',
    alignContent: 'center'
}, props => ({
    backgroundColor: props.checked ? Colors.lightBlue : 'transparent'
}));
GSChoice.displayName = 'GSChoice';
export const GSRadio = glamor.view({
    borderRadius: 50,
    borderWidth: 1,
    width: 20,
    height: 20,
    borderColor: Colors.lightGray,
    alignSelf: 'center'
}, props => ({
    backgroundColor: props.checked ? Colors.blue : 'transparent'
}));
GSRadio.displayName = 'GSRadio';
export const GSContainer = glamor(Container)({
    alignSelf: 'stretch'
});
GSContainer.displayName = 'GSContainer';
export const GSTitle = glamor(GSCustomText)({
    paddingHorizontal: 10,
    fontSize: 20,
    alignSelf: 'flex-start'
});
GSTitle.displayName = 'GSTitle';
export const GSText = glamor(GSCustomStudyText)({
    paddingHorizontal: 30,
    paddingVertical: 5,
    fontSize: 18,
    alignSelf: 'center'
});
GSText.displayName = 'GSText';
export const GSContent = glamor(Content)({
    marginTop: 20
});
GSContent.displayName = 'GSContent';
//# sourceMappingURL=index.styles.js.map