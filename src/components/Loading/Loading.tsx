import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import colors from '@sl/styles/colors';
import { GSLoading, IProps } from './index';

const renderLoading = () => (
  <GSLoading>
    <ActivityIndicator size="large" color={colors.lightGray} />
  </GSLoading>
);

export default ({ loading, noModal }: IProps) =>
  noModal ? renderLoading() : <Modal isVisible={loading}>{renderLoading()}</Modal>;
