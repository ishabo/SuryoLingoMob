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
export const isSmallDevice = () => isShortDevice() || isNarrowDevice();

export const calcWindowWidth = (percent: number) => {
  const width = getWindowWidth();
  return width - (width * (percent / 100));
};

export const scaleSize = (size: number, newSize?: number) => {
  return isSmallDevice() ? (newSize ? newSize : size - 2) : size;
}