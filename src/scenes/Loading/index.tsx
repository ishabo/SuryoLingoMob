import React from 'react';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import Spinner from 'react-native-loading-spinner-overlay';
import I18n from 'I18n';
import glamor from 'glamorous-native';

interface IProps {
  loading: boolean;
}

const Loading = ({ loading }: IProps) =>
  loading && <GSLoading>
    <Spinner visible={loading}
      textContent={I18n.t('loading')}
      textStyle={{ color: '#FFF' }} />
  </GSLoading>;

const GSLoading = glamor.view({
  position: 'absolute',
  top: 0,
  left: 0,
  flex: 1,
});

const mapStateToProps = (state: IInitialState) => ({
  loading: state.api.loading,
});

export default connect(mapStateToProps)(Loading);
