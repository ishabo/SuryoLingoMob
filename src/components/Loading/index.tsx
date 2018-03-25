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

const Loading = ({ loading }: IProps) =>
  <Modal isVisible={loading}>
    <GSLoading style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.darkWhite} />
    </GSLoading>
  </Modal>;

const GSLoading: any = glamor.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const mapStateToProps = (state: IInitialState) => ({
  loading: state.api.loading,
});

export default connect(mapStateToProps)(Loading);
