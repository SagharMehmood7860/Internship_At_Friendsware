# Personal Expense Tracker (Mobile App)

A clean, minimalist single-screen mobile application built using React Native and Expo CLI for the Friendsware Solutions Summer Internship Program 2026 (Week Zero Screening Project). 

The application allows users to seamlessly log personal expenses, view them in a scrollable list, delete entries dynamically, and track their live running total balance formatted in PKR.

## 📱 Features Implemented (Core Deliverables)
- **Add Expense Form:** Title text input, positive numeric amount validation, and specific category picker (Food, Transport, Utilities, Entertainment, Other).
- **Form Validation:** Dynamic inline error handling to block empty fields or negative amounts.
- **Dynamic Expense List:** Renders all added logs dynamically with proper currency formatting (`PKR X,XXX`).
- **Real-time Calculations:** Immediate update of the total aggregate expense value upon adding or deleting items.
- **Clean Architecture:** Fully modular code separation with structural components handled inside the `components/` directory.

---

## 🌟 BONUS TASKS COMPLETED (Day 3 Milestones)
As per the Week Zero Bonus Task List guidelines, the following additional challenges have been implemented under separate commits:

### 🚀 B2 — Category Filter Tabs
- Added a horizontal scrollable row of tab buttons above the expense list containing: **All, Food, Transport, Utilities, Entertainment, Other**.
- Tapping a specific tab dynamically updates the list view state to show only the matching categorized items.
- Integrated conditional active styling so the currently active tab pill is visually distinct with a solid blue background.

### 📊 B4 — Filtered Running Total Aggregations
- Enhanced the mathematical engine to calculate the live aggregate total based on the **currently active filter view** rather than just the global array.
- Switching tabs automatically updates the footer balance via a clean execution flow, showing an accurate running total of expenses for that specific category.

---

## 🛠️ Tech Stack & Dependencies
- **Framework:** React Native (Expo CLI - Blank Workflow)
- **Components:** React Native Core Components (`FlatList`, `TextInput`, `SafeAreaView`, `ScrollView`)
- **Picker:** `@react-native-picker/picker` (Official Community Picker)

---

## 🚀 Instructions to Run the Application

Follow these steps to set up and launch the project environment locally:

### 1. Prerequisites
Make sure you have **Node.js** installed on your machine and the **Expo Go** app installed on your physical Android/iOS test device.

### 2. Installation
Clone the repository (or download the source files) and navigate to the project root folder:
```bash
cd ExpenseTracker
Install the project dependencies configured inside package.json:

Bash
npm install
3. Start the Development Server
Launch the Metro Bundler session using Expo CLI:

Bash
npx expo start -c
4. Deploy on Device
Physical Device: Open the Expo Go app on your Android smartphone, scan the generated terminal QR code, and wait for the JavaScript bundle to load completely.
