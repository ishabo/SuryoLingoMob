import { Button } from 'native-base';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';
import Colors from 'styles/colors';
export const GSLesson = glamor.view({
    height: 300,
    width: 300
});
GSLesson.displayName = 'GSLesson';
export const GSButton = glamor(Button)({
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
});
GSButton.displayName = 'GSButton';
export const GSButtonText = glamor.text({}, props => ({
    color: props.active ? Colors.white : Colors.gray
}));
GSButtonText.displayName = 'GSButtonText';
export const GSCard = glamor.view({
    shadowOffset: { width: 4, height: 4 },
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 280,
    height: 220,
    marginLeft: 5,
    position: 'relative'
}, props => ({
    backgroundColor: props.active === true ? Colors.white : Colors.lightGray
}));
GSCard.displayName = 'GSCard';
export const GSLessonTitle = glamor(GSCustomText)({
    alignSelf: 'center',
    fontSize: 24,
    position: 'absolute',
    width: 200,
    top: 30,
    textAlign: 'center'
});
GSLessonTitle.displayName = 'GSLessonTitle';
export const GSLessonNewWords = glamor(GSCustomText)({
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10
});
GSLessonNewWords.displayName = 'GSLessonNewWords';
export const GSSkillIcon = glamor.view({
    backgroundColor: Colors.lightYellow,
    position: 'absolute',
    borderRadius: 50,
    height: 65,
    width: 65,
    right: 8,
    top: 8
});
GSSkillIcon.displayName = 'GSSkillIcon';
export const GSBadgePosition = glamor.view({
    position: 'absolute',
    bottom: 80,
    right: 0
});
GSBadgePosition.displayName = 'GSBadgePosition';
export const GSListButton = glamor(Button)({
    position: 'absolute',
    top: 10,
    left: 15
});
GSListButton.displayName = 'GSListButton';
//# sourceMappingURL=index.styles.js.map