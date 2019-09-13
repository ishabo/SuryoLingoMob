import * as Animatable from 'react-native-animatable';
import glamor from 'glamorous-native';
import colors from 'styles/colors';
export const GSContainer = glamor.view({
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteSmoke
});
GSContainer.displayName = 'GSContainer';
export const GSLessonIcon = glamor.view({
    position: 'absolute',
    top: 10,
    width: 150
});
GSLessonIcon.displayName = 'GSLessonIcon';
export const GSLessonInstruction = glamor.view({
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 150,
    marginBottom: 20
});
GSLessonInstruction.displayName = 'GSLessonInstruction';
export const GSAnimatable = glamor(Animatable.View)({
    alignSelf: 'center',
    justifyContent: 'center'
});
GSAnimatable.displayName = 'GSAnimatable';
//# sourceMappingURL=index.styles.js.map