import React from 'react';
import { NextButton } from 'components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import I18n from 'I18n';
import { NavigationActions, NavigationResetActionPayload } from 'react-navigation';
import { resetToSignon } from 'helpers/navigation';

interface IProps {
  navigationReset: (reset: NavigationResetActionPayload) => void;
}

const SignonButton = (props: IProps) =>
  <NextButton onPress={() => props.navigationReset(resetToSignon())}
    disabled={false}
    text={I18n.t('profile.form.signonToSave')}
    restProps={{ primary: true, wide: true }}
    lang={'cl-ara'} // This needs to be stored as some default
  />;

const mapDispatchToProps = (dispatch: Dispatch<any>): Partial<IProps> => ({
  navigationReset: (reset: any) => dispatch(NavigationActions.reset(reset)),
});

export default connect(() => ({}), mapDispatchToProps)(SignonButton);
