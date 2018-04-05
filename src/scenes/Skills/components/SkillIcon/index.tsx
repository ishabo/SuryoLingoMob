import * as React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import glamor from 'glamorous-native';
import { getSkillIcon } from 'services/selectors';
import { IInitialState } from 'services/reducers';
import { TImageSizes } from 'services/assets';

const GSIcon= glamor(Image)<{ size: number }>(
  {
    alignSelf: 'center',
  },
  props => ({
    width: props.size || 100,
    height: props.size || 100,
  }),
);

interface ISkillIconProps {
  icon: string;
  size?: TImageSizes;
  state?: 'unlocked' | 'locked';
  getSkillIcon: (icon: string, size: TImageSizes) => void;
}

const mapStateToProps = (state: IInitialState) => ({
  getSkillIcon: getSkillIcon(state),
});

const sizes = {
  hdpi: 50,
  xhdpi: 88,
  xxhdpi: 100,
  xxxhdpi: 130,
};

export default connect(mapStateToProps)(
  ({ icon, size = 'xhdpi', getSkillIcon, state = 'unlocked' }: ISkillIconProps) =>
    <GSIcon source={{ uri: 'data:image/png;base64,' + getSkillIcon(icon, size)[state] }}
      size={sizes[size]} />,
);
