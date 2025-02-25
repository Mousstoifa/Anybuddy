import 'react-native-gesture-handler/jestSetup';

// ✅ Mock de `react-native-reanimated`
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // 🔹 Corrige l'erreur en ajoutant une vérification sur `default`
  if (Reanimated.default) {
    Reanimated.default.call = () => {};
  }

  return Reanimated;
});

// ✅ Mock de `NativeAnimatedHelper`
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// ✅ Mock de `fetch`
global.fetch = require('jest-fetch-mock');
jest.useFakeTimers();

// ✅ Mock de `react-native-vector-icons`
jest.mock('react-native-vector-icons', () => ({
  createIconSetFromFontello: jest.fn(),
  createIconSet: jest.fn(),
  createIconSetFromIcoMoon: jest.fn(),
}));

// ✅ Mock de la navigation pour éviter les erreurs Jest
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));
