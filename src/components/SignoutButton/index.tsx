import React from 'react';
import { NextButton } from 'components';
import I18n from 'I18n';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as signon from 'services/signon';
import { IInitialState } from 'services/reducers';
import { getLearnersLanguage } from 'services/selectors';

interface IProps {
  signout: () => void;
  learnersLanguage: TLangs;
}

const SignoutButton = ({ learnersLanguage, signout }: IProps) =>
  <NextButton onPress={() => signout()}
    disabled={false}
    text={I18n.t('profile.form.signOut')}
    restProps={{ light: true, wide: true }}
    lang={learnersLanguage}
  />;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  signout: () => dispatch(signon.actions.signout()),
});

const mapStateToProps = (state: IInitialState) => ({
  learnersLanguage: getLearnersLanguage(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignoutButton);
