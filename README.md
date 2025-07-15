# Grocery App

## Overview

- This document will overview about estimation for [React Native Practice](https://docs.google.com/document/d/1JxuH8h03KAJ-Vp0vzPMV8D4UPx6jtk5F/edit?pli=1). This practice will build a Stylish app.

### Design

- [Stylish App](https://www.figma.com/design/cbyU4pamdddEA1uowX8Am8/grocery-marketplace-tradly.app?node-id=0-1&p=f&t=fc45hM4NYdeXadJl-0)

### Editor

- Visual Studio Code

## Target

- Handle platform differences between Android, iOS
- Unit test coverage should be greater than 80%
- Configure the app icon and splash screen that match the Expo app
- Must have a form with multiple inputs
- Must have a Home screen with a list greater than 1000 items
- Must have a screen using Camera and Image Picker (We can use a free API to upload Photos or use a local URI)
- Apply Linking and Deep Linking
- Push Notifications: Alert users when tasks are near.

## Features

Build a Mobile application of Food Delivery with features below:

- SignIn/SignUp
- Get products, search, sort, filter
- Get products by category
- Add product to cart
- Delete product
- See product details
- Checkout
- Update profile

## Getting Started

To get started with this boilerplate, follow the instructions below.

### Prerequisites

Ensure sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/set-up-your-environment) instructions till "Creating a new application" step, before proceeding.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://gitlab.asoft-python.com/kien.nguyen/react-native-expo-training.git
   ```

2. **Checkout branch**

   ```bash
   git checkout feat/grocery-app
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

   **Additional step for iOS**

   ```bash
   npx pod-install
   ```

   - If you are having trouble with iOS, try to reinstall the dependencies by running:

     1. `cd ios` to navigate to the `ios` folder.

     2. `bundle install` to install **Bundler**
     3. `bundle exec pod install` to install the iOS dependencies managed by CocoaPods.

4. **Run the application:**

   ```bash
   yarn android
   # or
   yarn ios
   ```

## Features

- **Linting & Formatting:** ESLint and Prettier for code quality.
- **Testing:** Setup with Jest and React Native Testing Library.
- **Storybook:** Storybook configured.

## Folder Structure

```
react-native-expo-training
├── android/               # Android-specific files
│   ├── app/
│   ├── build/
│   └── gradle/
├── app/                   # Expo Router app directory
│   ├── (auths)/          # Authentication screens group
│   ├── (tabs)/           # Tab navigation screens
│   ├── cart/             # Cart related screens
│   ├── categories/       # Category screens
│   ├── products/         # Product screens
│   ├── profile/          # Profile screens
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Home screen
├── assets/               # Static assets
│   ├── fonts/           # Custom fonts
│   └── images/          # Images and icons
├── components/          # Reusable UI components
│   ├── Banner/
│   ├── Button/
│   ├── CartItem/
│   ├── CategoryList/
│   ├── Dropdown/
│   ├── Header/
│   ├── icons/
│   ├── Input/
│   ├── LoginForm/
│   ├── ProductCard/
│   ├── ProductList/
│   ├── SignUpForm/
│   ├── StoreCard/
│   ├── StoreList/
│   ├── Text/
│   └── TotalCart/
├── constants/           # App constants and configuration
├── hooks/              # Custom React hooks
├── interfaces/         # TypeScript interfaces and types
├── json-server-grocery/ # Local JSON server for development
├── mocks/              # Mock data for testing
├── patches/            # Package patches
├── scripts/            # Build and utility scripts
├── services/           # API services and HTTP clients
├── stores/             # State management (Zustand stores)
├── themes/             # Theme configuration (colors, typography, metrics)
├── types/              # Additional TypeScript types
├── utils/              # Utility functions
├── app.json            # Expo app configuration
├── babel.config.js     # Babel configuration
├── eslint.config.js    # ESLint configuration
├── expo-env.d.ts       # Expo TypeScript definitions
├── index.js            # App entry point
├── jest-setup.ts       # Jest setup
├── jest.config.js      # Jest configuration
├── lint-staged.config.js # Lint-staged configuration
├── metro.config.js     # Metro bundler configuration
├── package.json        # Project dependencies
├── test-utils.tsx      # Testing library utilities
└── tsconfig.json       # TypeScript configuration
```

## Usage

### Running on Android

```bash
react-native run-android
```

### Running on iOS

```bash
react-native run-ios
```

To run on specific simulator

```bash
react-native run-ios --simulator "iPhone 15 Pro"
```

### Open Storybook

- Open the Developer Menu: Once your app is running on the simulator or device, open the developer menu with following commands or shake on real device.
  - iOS: Press `Cmd` + `D`
  - Android: Press `Cmd` + `M` or `Ctrl` + `M`
- Select `Toggle Storybook`

### Environment

- Create an `.env` file in the root directory with environment values.

**Notes**: Run `npx pod-install` every when add/update new environment values to let iOS update the latest values.

### Unit test

- The project is configured with `@testing-library/react-native` for unit testing.
- A custom render function is set up in the `test-utils.tsx` file.
- If you add a new provider to the project, include it in the customRender function to make it available for unit tests.

### Debugging

- From React Native `v0.74.0` onwards, Flipper has been removed from the default React Native template. This change means that developers will need to adopt alternative tools for debugging and performance monitoring. Recommended alternatives include: [Reactotron](https://docs.infinite.red/reactotron/), [React Devtools](https://reactnative.dev/docs/react-devtools), [Native Debuggers](https://reactnative.dev/docs/native-debugging)
