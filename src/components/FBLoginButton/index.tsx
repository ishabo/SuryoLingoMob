import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamor from 'glamorous-native';
import I18n from 'I18n';
import { Button, Icon } from 'native-base';
import { connectViaFacebook } from 'services/signon/actions';
import { calcWindowWidth } from 'helpers';
import Colors from 'styles/colors';
import { GSCustomText } from 'styles/text';
import { TSignonType } from 'services/profile';

const GSButtonText = glamor(GSCustomText)({
  alignSelf: 'stretch',
  flex: 1,
  color: Colors.white,
  textAlign: 'center',
  flexDirection: 'row',
  marginLeft: -30
});

const GSButton = glamor(Button)({
  width: calcWindowWidth(10),
  alignSelf: 'center',
  backgroundColor: Colors.facebook
});

interface IProps {
  signon: TSignonType;
  connectViaFacebook: (signon) => void;
}

class FBLoginButton extends Component<IProps> {
  render() {
    const connectViaFacebookText = this.props.signon === 'signin' ? 'signinViaFacebook' : 'signupViaFacebook';
    return (
      <GSButton iconLeft rounded onPress={() => this.props.connectViaFacebook(this.props.signon)}>
        <Icon name="facebook" type="Entypo" />
        <GSButtonText>{I18n.t(`profile.form.${connectViaFacebookText}`)}</GSButtonText>
      </GSButton>
    );
  }
}

const mapDispatchToProps = {
  connectViaFacebook
};

export default connect(
  null,
  mapDispatchToProps
)(FBLoginButton);
