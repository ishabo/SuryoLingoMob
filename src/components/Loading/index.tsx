import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Colors from 'styles/colors';
import glamor from 'glamorous-native';

interface IProps {
  loading: boolean;
}

const GSLoading = glamor.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

export default (props: IProps) => (
  <Modal isVisible={props.loading}>
    <GSLoading>
      <ActivityIndicator size="large" color={Colors.darkWhite} />
    </GSLoading>
  </Modal>
);
