# Hướng dẫn chuyển đổi từ Flutter sang React Native

## Tổng quan

Dự án OrangeDetect đã được chuyển đổi từ Flutter sang React Native (Expo) với việc giữ nguyên các file Machine Learning và tạo cấu trúc linh hoạt để dễ dàng thay đổi.

## Cấu trúc dự án

```
OrangeDetectRN/
├── assets/
│   ├── images/                 # Hình ảnh UI
│   └── ml_models/             # Models ML (giữ nguyên từ Flutter)
│       ├── orange_classifier_cnn_improved.tflite
│       └── orange_labels.txt
├── src/
│   ├── components/            # UI Components
│   ├── screens/              # Màn hình chính
│   ├── services/             # Business logic & ML services
│   ├── models/               # Data models
│   ├── utils/                # Utility functions
│   ├── constants/            # Colors, theme
│   ├── hooks/                # Custom hooks
│   ├── store/                # State management (Zustand)
│   └── navigation/            # Navigation setup
├── convert_model.py          # Script chuyển đổi model (giữ nguyên)
└── package.json              # Dependencies
```

## Các thay đổi chính

### 1. State Management
- **Flutter**: Riverpod
- **React Native**: Zustand
- **Linh hoạt**: Có thể thay đổi sang Redux Toolkit, Jotai, hoặc Context API

### 2. Navigation
- **Flutter**: GoRouter
- **React Native**: React Navigation
- **Linh hoạt**: Có thể thay đổi sang React Router Native hoặc custom navigation

### 3. UI Framework
- **Flutter**: Material Design
- **React Native**: React Native Paper + Custom components
- **Linh hoạt**: Có thể thay đổi sang NativeBase, UI Kitten, hoặc custom components

### 4. Camera & Image Processing
- **Flutter**: camera package
- **React Native**: expo-camera + expo-image-picker
- **Linh hoạt**: Có thể thay đổi sang react-native-vision-camera

## Machine Learning - Giữ nguyên

### Files không thay đổi:
- `assets/ml_models/orange_classifier_cnn_improved.tflite`
- `assets/ml_models/orange_labels.txt`
- `convert_model.py`

### TensorFlow Integration:
- **Flutter**: tflite_flutter
- **React Native**: @tensorflow/tfjs + @tensorflow/tfjs-react-native

## Cách thay đổi linh hoạt

### 1. Thay đổi State Management

#### Từ Zustand sang Redux Toolkit:

```typescript
// src/store/useAppStore.ts -> src/store/appSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isDarkMode: false,
    history: [],
    // ... other state
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    // ... other reducers
  },
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
```

#### Từ Zustand sang Context API:

```typescript
// src/context/AppContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode };
    // ... other cases
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
```

### 2. Thay đổi UI Framework

#### Từ React Native Paper sang NativeBase:

```typescript
// Thay đổi import
import { Button, Text, View } from 'native-base';

// Cập nhật components
<Button onPress={handlePress} colorScheme="primary">
  <Text>Click me</Text>
</Button>
```

#### Từ React Native Paper sang UI Kitten:

```typescript
// Thay đổi import
import { Button, Text, Layout } from '@ui-kitten/components';

// Cập nhật components
<Button onPress={handlePress} status="primary">
  Click me
</Button>
```

### 3. Thay đổi Navigation

#### Từ React Navigation sang React Router Native:

```typescript
// src/navigation/AppNavigator.tsx
import { NativeRouter, Routes, Route } from 'react-router-native';

export const AppNavigator = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<ColorDetectorScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </NativeRouter>
  );
};
```

### 4. Thay đổi Camera Library

#### Từ expo-camera sang react-native-vision-camera:

```typescript
// src/screens/ColorDetectorScreen.tsx
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const devices = useCameraDevices();
const device = devices.back;

<Camera
  style={StyleSheet.absoluteFill}
  device={device}
  isActive={true}
  photo={true}
/>
```

### 5. Thay đổi TensorFlow Implementation

#### Từ TensorFlow.js sang TensorFlow Lite React Native:

```typescript
// src/services/TensorFlowService.ts
import { TensorFlowLite } from 'react-native-tensorflow-lite';

export class TensorFlowService {
  private tflite: TensorFlowLite;

  async initialize() {
    this.tflite = new TensorFlowLite();
    await this.tflite.loadModel('orange_classifier_cnn_improved.tflite');
  }

  async classifyImage(imageUri: string) {
    const result = await this.tflite.run(imageUri);
    return result;
  }
}
```

## Cấu hình Environment

### Development:
```bash
npm install
npm start
```

### Production:
```bash
npm run build
```

### Testing:
```bash
npm test
```

## Dependencies có thể thay đổi

### State Management:
- Zustand (hiện tại)
- Redux Toolkit
- Jotai
- Context API
- MobX

### UI Framework:
- React Native Paper (hiện tại)
- NativeBase
- UI Kitten
- React Native Elements
- Custom components

### Navigation:
- React Navigation (hiện tại)
- React Router Native
- Custom navigation

### Camera:
- expo-camera (hiện tại)
- react-native-vision-camera
- react-native-camera

### ML:
- @tensorflow/tfjs (hiện tại)
- react-native-tensorflow-lite
- react-native-mlkit

## Lưu ý quan trọng

1. **Models ML**: Luôn giữ nguyên file models và labels
2. **Assets**: Hình ảnh và models được copy từ Flutter project
3. **Business Logic**: Logic phân tích cam được giữ nguyên
4. **API Structure**: Cấu trúc API và data models tương tự Flutter
5. **Testing**: Cần cập nhật tests khi thay đổi dependencies

## Migration Checklist

- [x] Tạo cấu trúc dự án React Native
- [x] Copy assets và models ML
- [x] Tạo components UI
- [x] Tạo screens chính
- [x] Tích hợp TensorFlow
- [x] Tạo state management
- [x] Tạo navigation
- [x] Tạo documentation
- [ ] Testing
- [ ] Performance optimization
- [ ] Production build
