module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jestSetup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|react-native-reanimated|@react-navigation|expo)/)',
    ],
  };
  