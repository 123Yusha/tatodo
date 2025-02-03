# Tatodo

Tatodo is a community events app designed to connect local businesses, event organizers, and residents. It provides a free platform for businesses to advertise their events while giving locals a centralized place to discover and engage with events in their area!

Please view my video demonstration of the app here: https://www.loom.com/share/e5eab9a7abe544f2b6559f050bad1a61?sid=48514bb7-25db-4677-905f-6d118baec108

## Features

- Event Listings: Businesses and organizers can post events with details like descriptions, dates, and locations.

- User Interaction: Users can sign up, sign out, view event details, and register interest.

- Calendar Integration: Add events directly to your device calendar.

- Diverse Categories: Discover events spanning sports, arts, nightlife, and family-friendly activities.

- Free Advertising: A cost-effective way for businesses to promote their events.

## Tech Stack

React Native and Expo: For development, testing, and deployment.

Firebase: For database management and authentication.

To run this app, please ensure you have the following installed:

- Node.js (LTS version recommended)
- Git
- An Expo Account
- Xcode (for iOS Simulator/Device)
- Android Studio (if using Android Emulator/Device)
- Temporary account admins for the Expo account used for the build can be added upon request.

## Getting Started

To set up Tatodo locally, follow these steps:

### 1. Clone the Repository:

git clone https://github.com/123Yusha/tatodo
cd tatodo

### 2. Install Dependencies:

npm install

## Running TAtodo on your device

TAtodo is hosted on Expo EAS. To run the Tatodo app on an emulator or real device, you need to install the Development Build directly on your emulator or device.

### For Android:

 Reference docs: *https://docs.expo.dev/tutorial/eas/android-development-build/*

    1.Download the .apk file from the provided link: https://expo.dev/artifacts/eas/m5Fu5k9A18HTgfQaJveBmT.apk

    2.Install the .apk on an Android emulator or a physical Android device by running: 
    
    adb install path/to/application-a29e14c8-b5a4-4ff4-9ca0-e8c9d8fe33ff.apk
    
    (Ensure ADB is installed and your device/emulator is running.)
    
    3.Open the app from the home screen.

### For iOS (Mac Users Only, with Xcode Installed):

Reference docs: *https://docs.expo.dev/tutorial/eas/ios-development-build-for-simulators/*

    1. Using the following .ipa file: application-9563cc57-e498-47a2-b9bb-5a245bd1e33f.ipa

    2.Install it using Xcode or Apple Configurator.

        - Using Xcode:

        Open Xcode → Devices & Simulators
        Select your iPhone/emulator
        Drag and drop the .ipa file into the installed apps list

        - Using Apple Configurator:

        Connect your device
        Use Apple Configurator to sideload the .ipa file
        
### Run the App
        Once installed, open the app from the home screen on your emulator or real device by following the instructions in your terminal Alternatively, download and select your device from Expo Orbit to run the app. 

## Contact

For questions or feedback, please reach out to yr130488@googlemail.com or find me on Slack!
