import * as React from 'react'
import { connect } from 'react-redux'
import { Platform, View, NativeModules, Keyboard } from 'react-native'
import {
  GSContainer,
  GSContent,
  GSTextArea,
  GSTextAreaContainer,
  GSKeyboardToggleButton,
} from './index.styles'
import Colors from '@sl/styles/colors'
import { isNarrowDevice } from '@sl/helpers'
import {
  KeyboardAccessoryView,
  KeyboardRegistry,
  KeyboardUtils,
} from 'react-native-keyboard-input'
import Keyboards, { IKeyboardActions } from '@sl/components/Keyboards'
import { Icon } from 'native-base'
import { IInitialState } from '@sl/services/reducers'
import {
  toggleCustomKeyboard,
  setPreferences,
} from '@sl/services/preferences/actions'

const iosScrollBehavior =
  Platform.OS === 'ios'
    ? NativeModules.KeyboardTrackingViewManager
        .KeyboardTrackingScrollBehaviorNone
    : null

interface IProps {
  disableKeyboard: boolean
  placeholder: string
  captureInput: (input: string) => void
  showCustomKeyboard: boolean
  inputLanguage: TLangs
  autoFocus?: boolean
  onSubmit?: () => void
  customKeyboardEnabled: boolean
  toggleCustomKeyboard: () => void
  setPreferences: (pref) => void
  renderNextButton: React.ReactElement<any>
}

interface IState {
  value: string
  keyboardOn: boolean
  nextButtonBottomPosition: number
  customKeyboardEnabled: boolean
  firstLoad: boolean
}

class TextArea extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: '',
      keyboardOn: false,
      nextButtonBottomPosition: 20,
      customKeyboardEnabled: false,
      firstLoad: true,
    }
  }

  keyboardDidShowListener
  keyboardDidHideListener

  componentDidMount() {
    if (this.props.customKeyboardEnabled && Platform.OS === 'android') {
      this.refreshCustomKeyboard()
    } else {
      this.textArea.focus()
    }

    setTimeout(() => {
      this.setState({ firstLoad: false })
    }, 500)

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    )
  }

  componentDidUpdate(prevProps: Partial<IProps>) {
    if (prevProps.customKeyboardEnabled && !this.props.customKeyboardEnabled) {
      this.textArea.focus()
    }
  }

  static getDerivedStateFromProps(
    props: Partial<IProps>,
    state: Partial<IState>,
  ) {
    if (!state.firstLoad && Platform.OS === 'android') {
      return { customKeyboardEnabled: props.customKeyboardEnabled }
    } else {
      return {}
    }
  }

  refreshCustomKeyboard = () => {
    setTimeout(() => {
      this.setState({ customKeyboardEnabled: false }, () => {
        this.setState({ customKeyboardEnabled: true }, this.textArea.focus)
      })
    }, 100)
  }

  keyboardDidShow = () => {
    this.setState({
      keyboardOn: true,
    })
  }

  keyboardDidHide = () => {
    this.setState({ keyboardOn: false })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  onChange = (value) => {
    this.setState({ value }, () => {
      this.props.captureInput(value)
    })
  }

  updateValue = (key: string) => {
    const value = this.state.value + key
    this.setState({ value }, () => {
      this.props.captureInput(value)
    })
  }

  deleteBack = () => {
    const { value } = this.state
    this.onChange(value.slice(0, -1))
  }

  private textArea

  getCustomKeyboard = () =>
    this.props.inputLanguage === 'cl-syr' ? 'SyriacKeyboard' : 'ArabicKeyboard'

  receivedKeyboardData = (_, params: IKeyboardActions) => {
    switch (params.action) {
      case 'addChar':
        this.updateValue(params.value)
        break
      case 'removeChar':
        this.deleteBack()
        break
      case 'submitAndClose':
        this.props.onSubmit()
        KeyboardUtils.dismiss()
        break
      default:
    }
  }

  renderCover() {
    return <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.25)' }} />
  }

  toggleCustomKeyboard = () => {
    this.props.toggleCustomKeyboard()
  }

  renderKeyboardToggleButton() {
    return (
      <GSKeyboardToggleButton onPress={this.toggleCustomKeyboard}>
        <Icon
          type='Entypo'
          name='keyboard'
          style={{
            fontSize: 40,
            color: this.props.customKeyboardEnabled ? 'gray' : 'blue',
            marginRight: 4,
          }}
        />
      </GSKeyboardToggleButton>
    )
  }

  private setNativeKeyboard = () => {
    this.props.setPreferences({ customKeyboardEnabled: false })
  }

  private shouldDisplayCustomKeyabord = () => Platform.OS === 'android'

  render() {
    return (
      <GSContainer>
        <GSContent>
          <GSTextAreaContainer>
            <GSTextArea
              placeholder={this.props.placeholder}
              placeholderTextColor={Colors.gray}
              multiline
              autoCorrect={false}
              onTouchStart={this.setNativeKeyboard}
              blurOnSubmit={false}
              onSubmitEditing={this.props.onSubmit}
              underlineColorAndroid='rgba(0,0,0,0)'
              numberOfLines={isNarrowDevice() ? 4 : 5}
              value={this.state.value}
              onChangeText={this.onChange}
              keyboardAppearance='light'
              rtl={Platform.OS === 'ios'}
              innerRef={(c: TextArea) => (this.textArea = c)}
              lang={
                this.state.value.length === 0
                  ? 'cl-ara'
                  : this.props.inputLanguage
              }
              accessible={false}
            />
            {Platform.OS === 'android' && this.renderKeyboardToggleButton()}
          </GSTextAreaContainer>
        </GSContent>

        {this.shouldDisplayCustomKeyabord() && (
          <KeyboardAccessoryView
            androidAdjustResize
            iOSScrollBehavior={iosScrollBehavior}
            kbInputRef={this.textArea}
            kbComponent={
              this.state.customKeyboardEnabled ? this.getCustomKeyboard() : null
            }
            onItemSelected={this.receivedKeyboardData}
            revealKeyboardInteractive
            style={{ flex: 1 }}
          />
        )}
      </GSContainer>
    )
  }
}

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  customKeyboardEnabled: state.preferences.customKeyboardEnabled,
})

const mapDispatchToProps: Partial<IProps> = {
  toggleCustomKeyboard,
  setPreferences,
}

export default connect(mapStateToProps, mapDispatchToProps)(TextArea)

KeyboardRegistry.registerKeyboard(
  'SyriacKeyboard',
  () => Keyboards.SyriacKeyboard,
)
KeyboardRegistry.registerKeyboard(
  'ArabicKeyboard',
  () => Keyboards.ArabicKeyboard,
)
