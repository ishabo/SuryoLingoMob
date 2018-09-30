import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';
import colors from 'styles/colors';
import glamor from 'glamorous-native';
import { IInitialState } from 'services/reducers';

export interface IProps {
  loading: boolean;
}

const GSLoading = glamor.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

const mapStateToDispatch = (state: IInitialState): IProps => ({
  loading: state.api.loading
});

export default connect(mapStateToDispatch)(({ loading }: IProps) => (
  <Modal isVisible={loading}>
    <GSLoading>
      <ActivityIndicator size="large" color={colors.lightGray} />
    </GSLoading>
  </Modal>
));
