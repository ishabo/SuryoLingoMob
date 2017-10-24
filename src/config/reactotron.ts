import Reactotron, {
    trackGlobalErrors as errorPlugin
} from 'reactotron-react-native';
import apisaucePlugin from 'reactotron-apisauce';
//import { reactotronRedux } from 'reactotron-redux'

declare global {
    interface Console {
        tron: Reactotron;
    }
}

if (__DEV__) {
    Reactotron
        .configure({
            // host: '10.0.3.2', // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
            // port: 3334,
            // enabled: true,
            name: 'SyroLingo'
        })

        .use(errorPlugin({
            // ignore all error frames from react-native (for example)
            veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
        }))
        //.use(reactotronRedux())
        .use(apisaucePlugin())
        .connect()

    // Totally hacky, but this allows you to not both importing reactotron-react-native
    // on every file.  This is just DEV mode, so no big deal.
    console.tron = Reactotron
} else {
    // a mock version should you decide to leave console.tron in your codebase
    console.tron = {
        log: () => false,
        warn: () => false,
        error: () => false,
        display: () => false,
        image: () => false
    }
}