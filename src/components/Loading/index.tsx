import * as React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { IInitialState } from 'services/reducers';
import Modal from 'react-native-modal';
import Colors from 'styles/colors';
import glamor from 'glamorous-native';

interface IProps {
  loading: boolean;
}

interface IState {
  loading: boolean;
}

const MAX_LOADING_TIME = 60 * 1000;

class Loading extends React.Component<IProps, IState> {

  state = {
    loading: false,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: props.loading,
  //   }
  // }

  componentWillReceiveProps (nextProps: Partial<IProps>) {
    if (nextProps.loading === true) {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, MAX_LOADING_TIME)
      })
    }
  }

  render () {
    return <Modal isVisible={this.state.loading}>
      <GSLoading>
        <ActivityIndicator size="large" color={Colors.darkWhite} />
      </GSLoading>
    </Modal>;
  }
}

const GSLoading = glamor.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const mapStateToProps = (state: IInitialState) => ({
  loading: state.api.loading,
});

export default connect(mapStateToProps)(Loading);
