import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import colors from 'styles/colors';
import { GSLoading } from './index';
const renderLoading = () => (React.createElement(GSLoading, null,
    React.createElement(ActivityIndicator, { size: "large", color: colors.lightGray })));
export default ({ loading, noModal }) => noModal ? renderLoading() : React.createElement(Modal, { isVisible: loading }, renderLoading());
//# sourceMappingURL=Loading.js.map