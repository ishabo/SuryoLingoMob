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
  alignSelf: 'center',
  color: Colors.white,
  textAlign: 'center',
  flexDirection: 'row',
  fontSize: 14,
  marginLeft: 5
});

const GSButton = glamor(Button)({
  width: calcWindowWidth(10),
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.facebook
});

interface IProps {
  signon: TSignonType;
  connectViaFacebook: (signon) => void;
}

class FBLoginButton extends Component<IProps> {
  render() {
    const connectViaFacebookText = `${this.props.signon}ViaFacebook`;
    return (
      <GSButton iconLeft rounded onPress={() => this.props.connectViaFacebook(this.props.signon)}>
        <GSButtonText>{I18n.t(`signon.form.${connectViaFacebookText}`)}</GSButtonText>
        <Icon name="facebook" type="Entypo" />
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
