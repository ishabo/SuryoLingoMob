import { Dimensions } from 'react-native';
let windowDimentions;
export const getWindowDimentions = () => {
    if (!windowDimentions) {
        windowDimentions = Dimensions.get('window');
    }
    return windowDimentions;
};
export const getWindowHeight = () => getWindowDimentions().height;
export const getWindowWidth = () => getWindowDimentions().width;
export const isShortDevice = (height = 600) => getWindowHeight() < height;
export const isNarrowDevice = (width = 350) => getWindowWidth() < width;
export const isSmallDevice = (height = 600, width = 350) => isShortDevice(height) || isNarrowDevice(width);
export const calcWindowWidth = (percent) => {
    const width = getWindowWidth();
    return width - width * (percent / 100);
};
export const scaleSize = (size, newSize) => {
    return isSmallDevice() ? (newSize ? newSize : size - 2) : size;
};
//# sourceMappingURL=index.js.map