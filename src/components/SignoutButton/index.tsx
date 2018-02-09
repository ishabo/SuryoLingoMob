import React from 'react';
import { NextButton } from 'components';
import I18n from 'I18n';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as signon from 'services/signon';

interface IProps {
  signout: () => void;
}

const SignoutButton = (props: IProps) =>
  <NextButton onPress={() => props.signout()}
    disabled={false}
    text={I18n.t('profile.form.signOut')}
    restProps={{ light: true, wide: true }}
  />;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  signout: () => dispatch(signon.actions.signout()),
});

export default connect(() => ({}), mapDispatchToProps)(SignoutButton);
