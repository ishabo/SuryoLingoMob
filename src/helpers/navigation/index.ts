import { NavigationScreenProp, NavigationActions } from 'react-navigation';

export const backToSkills = (navigation: NavigationScreenProp<any, any>) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Skills' })
        ]
    })
    navigation.dispatch(resetAction)
}