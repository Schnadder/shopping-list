# Shopping List / Todo App

This project is a simple cross-platform shopping and todo list application built as part of a university assignment.  
It demonstrates rapid mobile development using [Ionic](https://ionicframework.com/) with [Vue.js](https://vuejs.org/) and [Capacitor](https://capacitorjs.com/), focusing on fast item entry, list management, and persistent storage in JSON files.

---

## Project Information

- Course: IDATT2506 Applikasjonsutvikling for mobile enheter
- Institution: NTNU
- Author: Sander S. Nessa
- Year: 2025
- Platform: Ionic + Vue + Capacitor
- Target: Android (Emulator / Physical Device)

---

## Features (Planned / Implemented)

- Create, delete and switch between multiple shopping/todo lists.
- Add new items quickly with keyboard focus retained.
- Mark items as purchased/done with a tap.
- Persist data to JSON files locally on the device.
- (Optional) Reorder list items via long press and drag.

---

## Tech Stack

- Ionic
- Vue.js
- Capacitor
- Android Studio (emulator)
- Node.js & npm

---

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/Schnadder/shopping-list.git
cd shopping-list
```

### 2. Install dependencies
```
npm install
```

### 3. Run in browser (optional quick check)
```
ionic serve
```
Visit http://localhost:8100 to preview the app.

### 4. Build and run on Android
```
ionic build
npx cap sync android
npx cap open android
```

- This opens the Android project in Android Studio.
- Choose an emulator or device and press Run.

---

## Tested On
- **Ionic CLI:** 7.2.1 
- **Ionic Framework:** @ionic/vue 8.7.7  
- **Capacitor CLI:** 7.4.4  
- **@capacitor/android:** 7.4.4  
- **Node.js:** v22.13.1  
- **npm:** 11.6.2  

### Android Emulator
- **Device:** Medium Phone (Pixel-like)  
- **Android version:** 16 “Baklava” (API level 36, Google Play image)  
- **Resolution:** 1080 × 2400 px, density 420 dpi  
- **CPU cores:** 4  
- **RAM:** 2 GB  

---

---
