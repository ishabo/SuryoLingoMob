import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import glamor from 'glamorous-native';
import Colors from 'styles/colors';

type TSizes = 'large' | 'small';

interface IProps {
  progress: number;
  children: React.ReactChild;
  size: TSizes;
  backgroundColor?: string;
}

export default ({ children, progress, size = 'large', backgroundColor = Colors.lightYellow }: IProps) => {
  const LinearGradientProps = {
    colors: ['transparent', Colors.darkYellow],
    locations: [1 - progress, 0]
  };

  return (
    <GSCircle backgroundColor={backgroundColor} size={size} {...LinearGradientProps}>
      {children}
    </GSCircle>
  );
};

export const GSCircle = glamor(LinearGradient)<{ size: TSizes; backgroundColor: string }>(
  {
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 50
  },
  ({ size, backgroundColor }) => {
    switch (size) {
      case 'large':
        return {
          width: 85.3,
          height: 85,
          bottom: 26.2,
          left: 15.6,
          paddingTop: 10,
          backgroundColor
        };
      case 'small':
        return {
          width: 65.3,
          height: 65,
          bottom: 7,
          left: 7,
          paddingTop: 8,
          backgroundColor
        };
      default:
        return {
          backgroundColor
        };
    }
  }
);
