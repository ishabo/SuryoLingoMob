import * as React from 'react';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { isRegistered, getSourceLanguage } from 'services/selectors';
import { NavigationActions, NavigationResetActionPayload } from 'react-navigation';
import { Dispatch } from 'redux';
import { resetToSignon } from 'helpers/navigation';
import * as signon from 'services/signon';
import I18n from 'I18n';
import { GSCustomText, ICustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import { Text } from 'react-native';

interface IProps {
  isLoggedIn: boolean;
  navigationReset: (reset: NavigationResetActionPayload) => void;
  sourceLanguage: TLangs;
  signOut(): void;
  noStyle?: boolean;
}

const SignInOrOut = ({ isLoggedIn, navigationReset, sourceLanguage, signOut, noStyle }: IProps) => {
  const onPress = isLoggedIn ? signOut : () => navigationReset(resetToSignon());
  const text = isLoggedIn ? I18n.t('signon.form.signOut') : I18n.t('signon.form.signonToSave');
  return (
    (noStyle && <Text onPress={onPress}>{text}</Text>) || (
      <GSText onPress={onPress} lang={sourceLanguage}>
        {text}
      </GSText>
    )
  );
};

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isLoggedIn: isRegistered(state),
  sourceLanguage: getSourceLanguage(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  navigationReset: (reset: NavigationResetActionPayload) => dispatch(NavigationActions.reset(reset)),
  signOut: () => dispatch(signon.actions.signout())
});

const GSText = glamor(GSCustomText)<ICustomText>({
  fontSize: 14,
  marginHorizontal: 10,
  fontWeight: '600',
  color: Colors.darkBlue,
  alignSelf: 'center'
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInOrOut);
