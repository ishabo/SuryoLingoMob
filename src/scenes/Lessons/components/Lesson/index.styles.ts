import { Button } from 'native-base';
import glamor from 'glamorous-native';
import { GSCustomText } from 'styles/text';
import Colors from 'styles/colors';

export const GSLesson = glamor.view({
  height: 300,
  width: 300,
});

export const GSButton = glamor(Button)({
  marginTop: 10,
  alignSelf: 'center',
  padding: 10,
  paddingHorizontal: 30,
  position: 'absolute',
  bottom: 20,
});

export const GSButtonText = glamor.text<{ active: boolean }>(
  {},
  props => ({
    color: props.active ? Colors.white : Colors.gray,
  })
)

export const GSCard = glamor.view<{ active: boolean }>(
  {
    shadowOffset: { width: 4, height: 4 },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 2,
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 280,
    height: 220,
    marginLeft: 5,
    position: 'relative',
  },
  props => ({
    backgroundColor: props.active === true ? Colors.white : Colors.lightGray,
  }),
);

export const GSLessonTitle = glamor(GSCustomText)({
  alignSelf: 'center',
  fontSize: 24,
  position: 'absolute',
  width: 200,
  top: 30,
  textAlign: 'center',
});

export const GSLessonNewWords = glamor(GSCustomText)({
  alignSelf: 'center',
  fontSize: 16,
  textAlign: 'center',
  marginHorizontal: 10,
});

export const GSSkillIcon = glamor.view({
  backgroundColor: Colors.lightYellow,
  position: 'absolute',
  borderRadius: 50,
  height: 65,
  width: 65,
  right: 8,
  top: 8,
});

export const GSBadgePosition = glamor.view({
  position: 'absolute',
  bottom: 80,
  right: 0,
});
