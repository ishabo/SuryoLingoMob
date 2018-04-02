import * as React from 'react';
import { SignonButton, SignoutButton } from 'components';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { isRegistered, getLearnersLanguage } from 'services/selectors';
import { NavigationActions, NavigationResetActionPayload } from 'react-navigation';
import { Dispatch } from 'redux';
import { resetToSignon } from 'helpers/navigation';
import * as signon from 'services/signon';

interface IProps {
  isLoggedIn: boolean;
  navigationReset: (reset: NavigationResetActionPayload) => void;
  learnersLanguage: TLangs;
  signOut (): void;
  simple?: boolean;
}

const SignInOrOut = ({ isLoggedIn, navigationReset, learnersLanguage, signOut }: IProps) =>
  isLoggedIn &&
  <SignoutButton onPress={signOut} learnersLanguage={learnersLanguage} /> ||
  <SignonButton simple onPress={() => navigationReset(resetToSignon())} learnersLanguage={learnersLanguage} />

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  isLoggedIn: isRegistered(state),
  learnersLanguage: getLearnersLanguage(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  navigationReset: (reset: any) => dispatch(NavigationActions.reset(reset)),
  signOut: () => dispatch(signon.actions.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInOrOut);
