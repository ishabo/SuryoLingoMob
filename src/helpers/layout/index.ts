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

export const isShortDevice = (height: number = 600) => getWindowHeight() < height;
export const isNarrowDevice = (width: number = 350) => getWindowWidth() < width;
export const isSmallDevice = (height: number = 600, width: number = 350) =>
  isShortDevice(height) || isNarrowDevice(width);

export const calcWindowWidth = (percent: number) => {
  const width = getWindowWidth();
  return width - width * (percent / 100);
};

export const scaleSize = (size: number, newSize?: number) => {
  return isSmallDevice() ? (newSize ? newSize : size - 2) : size;
};
