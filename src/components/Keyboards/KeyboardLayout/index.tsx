import * as React from 'react';

import { Vibration, ScrollView } from 'react-native';
import { Icon, Text } from 'native-base';
import shortid from 'shortid';
import { GSBackSpaceKey, GSContainer, GSContent, GSKey, GSKeyText, GSSpaceKey, GSReturnKey } from './index.styles';
import { KeyboardRegistry } from 'react-native-keyboard-input';
import { IKeyboardActions } from 'components/Keyboards';
import I18n from 'I18n';

interface IProps {
  layoutName: string;
  letters: string[];
  lang: TLangs;
}

const VIBRATE_DURATION = 50;

class KeyboardLayout extends React.Component<IProps> {
  private listKeys = (keys: string[], style: { fontSize: number; paddingTop?: number }) =>
    keys.map((key: string) => (
      <GSKey
        key={shortid.generate()}
        primary
        onPress={this.onPress(() => {
          this.onKeyPress(key);
        })}
      >
        <GSKeyText lang={this.props.lang} style={{ ...style }}>
          {key}
        </GSKeyText>
      </GSKey>
    ));

  private onPress = (pressFunction: () => void) => () => {
    pressFunction();
    Vibration.vibrate(VIBRATE_DURATION, false);
  };

  private onKeyPress = (value: string) => {
    this.onItemSelected({
      value,
      action: 'addChar'
    });
  };

  private onBackSpacePress = () => {
    this.onItemSelected({
      value: null,
      action: 'removeChar'
    });
  };

  private onSubmit = () => {
    this.onItemSelected({
      value: null,
      action: 'submitAndClose'
    });
  };

  private onItemSelected = (params: IKeyboardActions) => {
    KeyboardRegistry.onItemSelected(this.props.layoutName, params);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
        <GSContainer>
          <GSContent>
            <GSBackSpaceKey primary onPress={this.onPress(this.onBackSpacePress)}>
              <Icon name="ios-arrow-forward" />
            </GSBackSpaceKey>
            {this.listKeys(this.props.letters, { fontSize: 14, paddingTop: -23 })}
          </GSContent>
          <GSContent>
            <GSReturnKey success onPress={this.onPress(this.onSubmit)}>
              <Text>{I18n.t('questions.continue')}</Text>
            </GSReturnKey>
            <GSSpaceKey primary onPress={this.onPress(() => this.onKeyPress(' '))} />
          </GSContent>
        </GSContainer>
      </ScrollView>
    );
  }
}

export default KeyboardLayout;
