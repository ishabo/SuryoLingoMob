import React from 'react';
import { IWordHint } from 'helpers';
import { Popover, PopoverContainer } from 'react-native-simple-popover';
import { CustomText } from 'styles/text';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';
import shortid from 'shortid';

type TSentence = string | IWordHint[];

export interface IProps {
  sentence: TSentence;
  lang: TLangs;
}

interface IState {
  selectedWord: string;
}
const splitTranslations = (translations: string) =>
  translations.split('|');

export default class Phrase extends React.Component<IProps, IState> {

  state = {
    selectedWord: '',
  };

  private setSelectedWord = (selectedWord: string) => {
    this.setState({ selectedWord }, () => {
      setTimeout(() => {
        if (this.state.selectedWord === selectedWord) {
          this.setState({ selectedWord: '' });
        }
      }, 2000);
    });
  }

  private renderText = (text: string, underline: boolean = false) =>
    <GSSentence
      onPress={() => { this.setSelectedWord(text); }}
      underline={underline}
      lang={this.props.lang}>{text}</GSSentence>

  private renderHint = (translations: string) => {
    const split = splitTranslations(translations);
    return <GSHints>
      {split.map((text: string, index: number) =>
        <GSHintBlock
          key={shortid.generate()}
          last={index === (split.length - 1)}>
          <GSHintText>{text}</GSHintText>
        </GSHintBlock>)}
    </GSHints>;
  }

  render () {
    const { sentence } = this.props;

    if (typeof sentence === 'string') {
      return this.renderText(sentence);
    }

    return <GSHintedSentence>
      {
        sentence.map((word: IWordHint) => {
          const actions = splitTranslations(word.translations);
          if (actions.length > 0) {
            return <PopoverContainer
              key={shortid.generate()}>
              <Popover
                placement={'top'}
                arrowColor={Colors.lightBlack}
                arrowWidth={16}
                arrowHeight={8}
                isVisible={this.state.selectedWord === word.word}
                component={() => this.renderHint(word.translations)}
              >
                {this.renderText(word.word, true)}
              </Popover>
            </PopoverContainer>;
          } else {
            return this.renderText(word.word, false);
          }
        })
      }
    </GSHintedSentence>;
  }
}

const GSHints = glamor.view({
  backgroundColor: Colors.lightBlack,
  alignItems: 'stretch',
  paddingVertical: 5,
  borderRadius: 5,
});

const GSHintBlock = glamor.view<{ last: boolean }>(
  {
    paddingHorizontal: 20,
    borderColor: Colors.lightBlack,
  },
  props => !props.last ? ({
    borderBottomColor: Colors.darkWhite,
  }) : null,
);

const GSHintText = glamor.text({
  color: Colors.white,
});

const GSHintedSentence = glamor.view({
  flexDirection: 'row',
  justifyContent: 'center',
});

const GSSentence = glamor(CustomText)<{ underline: boolean }>(
  {
    borderWidth: 1,
    padding: 0,
    marginHorizontal: 4,
    fontSize: 20,
    alignSelf: 'center',
  },
  props => props.underline ? ({
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  }) : null,
);
