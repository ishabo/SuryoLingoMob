import { NavigationScreenProp, NavigationActions } from 'react-navigation';

export const backToModules = (navigation: NavigationScreenProp<any, any>) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Modules' })
        ]
    })
    navigation.dispatch(resetAction)
}