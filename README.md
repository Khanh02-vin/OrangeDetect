# Orange Quality Checker - React Native

Ứng dụng React Native để phân tích chất lượng cam sử dụng Machine Learning.

## Tính năng

- 📷 Chụp ảnh cam hoặc chọn từ thư viện
- 🤖 Phân tích chất lượng bằng AI (TensorFlow Lite)
- 📊 Hiển thị kết quả chi tiết
- 📱 Lưu lịch sử quét
- 🎨 Dark/Light theme
- 📍 Theo dõi vị trí
- 🔔 Thông báo

## Cấu trúc dự án

```
src/
├── components/          # UI Components tái sử dụng
├── screens/            # Các màn hình chính
├── services/           # Business logic & ML services
├── models/             # Data models
├── utils/              # Utility functions
├── constants/          # Colors, theme
├── hooks/              # Custom hooks
├── store/              # State management (Zustand)
└── navigation/         # Navigation setup
```

## Machine Learning

### Models được giữ nguyên từ Flutter:
- `assets/ml_models/orange_classifier_cnn_improved.tflite` (13.3MB)
- `assets/ml_models/orange_labels.txt`

### TensorFlow Integration:
- Sử dụng TensorFlow.js cho React Native
- Hỗ trợ preprocessing và inference
- Fallback classification khi confidence thấp

## Cài đặt

### Prerequisites:
- Node.js 18+
- Expo CLI
- iOS Simulator (cho iOS)
- Android Studio (cho Android)

### Installation:
```bash
# Clone repository
git clone <repository-url>
cd OrangeDetect

# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web
```

## Cấu hình

### Environment Variables:
```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_MODEL_VERSION=1.0.0
```

### App Configuration:
- Camera permissions
- Location permissions
- Notification settings
- Model loading

## Sử dụng

### 1. Chụp ảnh:
- Mở app và chọn "Detector"
- Chụp ảnh cam hoặc chọn từ gallery
- Đợi phân tích hoàn tất

### 2. Xem lịch sử:
- Chọn tab "History"
- Xem danh sách các lần quét
- Tap để xem chi tiết

### 3. Cài đặt:
- Chọn tab "Settings"
- Thay đổi theme, notifications
- Quản lý dữ liệu

## Thay đổi linh hoạt

### State Management:
- **Hiện tại**: Zustand
- **Có thể thay đổi**: Redux Toolkit, Jotai, Context API

### UI Framework:
- **Hiện tại**: React Native Paper
- **Có thể thay đổi**: NativeBase, UI Kitten

### Navigation:
- **Hiện tại**: React Navigation
- **Có thể thay đổi**: React Router Native

### Camera:
- **Hiện tại**: expo-camera
- **Có thể thay đổi**: react-native-vision-camera

Xem [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) để biết chi tiết cách thay đổi.

## Dependencies chính

```json
{
  "expo": "~54.0.13",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "@tensorflow/tfjs": "^4.20.0",
  "@tensorflow/tfjs-react-native": "^0.8.0",
  "expo-camera": "~16.0.12",
  "expo-image-picker": "~16.0.4",
  "zustand": "^5.0.2",
  "react-native-paper": "^5.12.5"
}
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="OrangeClassifier"
```

## Building

### Development:
```bash
expo start
```

### Production:
```bash
# iOS
expo build:ios

# Android
expo build:android

# Web
expo build:web
```

## Troubleshooting

### Common Issues:

1. **Model loading fails**:
   - Kiểm tra file model có tồn tại
   - Kiểm tra permissions

2. **Camera not working**:
   - Kiểm tra permissions
   - Restart app

3. **Performance issues**:
   - Giảm image quality
   - Optimize model

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - xem [LICENSE](./LICENSE) file.

## Changelog

### v1.0.0
- Initial React Native version
- TensorFlow Lite integration
- Camera functionality
- History tracking
- Dark/Light theme
