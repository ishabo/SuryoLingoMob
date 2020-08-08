import React from 'react'
import { connect } from 'react-redux'
import glamor from 'glamorous-native'
import I18n from '@sl/i18n'
import { Button, Icon } from 'native-base'
import { connectViaFacebook } from '@sl/services/signon/actions'
import { calcWindowWidth } from '@sl/helpers'
import Colors from '@sl/styles/colors'
import { GSCustomText } from '@sl/styles/text'
import { TSignonType } from '@sl/services/profile'

const GSButtonText = glamor(GSCustomText)({
  alignSelf: 'center',
  color: Colors.white,
  textAlign: 'center',
  flexDirection: 'row',
  fontSize: 14,
  marginLeft: 5,
})

const GSButton = glamor(Button)({
  width: calcWindowWidth(10),
  alignSelf: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.facebook,
})

interface IProps {
  signon: TSignonType
  connectViaFacebook: (signon) => void
}

const FBLoginButton: React.FC<IProps> = ({ signon }) => (
  <GSButton iconLeft rounded onPress={() => connectViaFacebook(signon)}>
    <GSButtonText>{I18n.t(`signon.form.${signon}ViaFacebook`)}</GSButtonText>
    <Icon name='facebook' type='Entypo' />
  </GSButton>
)

const mapDispatchToProps = {
  connectViaFacebook,
}

export default connect(null, mapDispatchToProps)(FBLoginButton)
