import React from 'react';
import { View, Text } from 'react-native';

interface IProps {
  children: any;
}

interface IState {
  hasError: boolean;
}

export default class TryCatch extends React.Component<IProps, IState> {
  state = { hasError: false };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.warn(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
