import * as ReactNative from "react-native";

export const NativeAnimatedHelper = {
  addWhitelistedNativeProps: jest.fn(),
  addWhitelistedUIProps: jest.fn(),
  attachNativeEvent: jest.fn(),
  configureNext: jest.fn(),
  createAnimatedComponent: jest.fn(),
  detachNativeEvent: jest.fn(),
  flattenStyle: jest.fn(),
  injectEventPluginsByName: jest.fn(),
  shouldUseNativeDriver: jest.fn(),
};

export default Object.setPrototypeOf(
  {
    NativeAnimatedHelper
  },
  ReactNative
);
