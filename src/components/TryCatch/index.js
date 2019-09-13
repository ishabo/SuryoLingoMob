import React from 'react';
import { View, Text } from 'react-native';
import { logError } from 'helpers';
export default class TryCatch extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.warn(error, info);
        logError(JSON.stringify(error));
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (React.createElement(View, null,
                React.createElement(Text, null, "Something went wrong.")));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=index.js.map