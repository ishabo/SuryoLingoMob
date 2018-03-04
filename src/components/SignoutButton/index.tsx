import React from 'react';
import I18n from 'I18n';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as signon from 'services/signon';
import { IInitialState } from 'services/reducers';
import { getLearnersLanguage } from 'services/selectors';
import { GSCustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

interface IProps {
  signout: () => void;
  learnersLanguage: TLangs;
}

const SignoutButton = ({ learnersLanguage, signout }: IProps) =>
  <GSSignout onPress={() => signout()} lang={learnersLanguage} >
    {I18n.t('profile.form.signOut')}
  </GSSignout>;

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  signout: () => dispatch(signon.actions.signout()),
});

const mapStateToProps = (state: IInitialState) => ({
  learnersLanguage: getLearnersLanguage(state),
});

const GSSignout = glamor(GSCustomText)({
  fontSize: 14,
  marginHorizontal: 10,
  fontWeight: '600',
  color: Colors.darkBlue,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignoutButton);
