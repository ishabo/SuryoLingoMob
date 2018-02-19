import { Dimensions, ScaledSize } from 'react-native';
let windowDimentions: ScaledSize;

export const getWindowDimentions = () => {
  if (!windowDimentions) {
    windowDimentions = Dimensions.get('window');
  }

  return windowDimentions;
};

export const getWindowHeight = () => getWindowDimentions().height;
export const getWindowWidth = () => getWindowDimentions().width;

export const isShortDevice = () => getWindowHeight() < 600;
export const isNarrowDevice = () => getWindowWidth() < 350;

export const calcWindowWidth = (percent: number) => {
  const width = getWindowWidth();
  return width - (width * (percent / 100));
};
