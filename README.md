📱 HealthFlow App

A multi-step onboarding flow built using React Native (Expo) that collects user fitness preferences, saves progress locally and on the cloud, and allows seamless resume functionality.

🚀 Features
🧭 Smart Multi-Step Flow
5-step guided onboarding experience
Includes validation before moving forward
Back and Next navigation supported
⚡ Conditional Logic
Diet Preference step appears only for:
Lose Weight
Build Muscle
Automatically skipped for other goals
💾 Data Persistence
AsyncStorage for offline/local storage
Firebase Firestore for cloud sync
Saves progress on every step change
🔄 Resume Capability
Automatically restores:
Last visited step
All previous answers
Works even after app restart
📊 Progress Tracking
Step indicator: Step X of Y
Visual progress bar
📝 Summary Screen
Displays all answers in clean cards
Edit any step directly
Restart flow anytime
🏃 App Flow
App Launch
Loads saved data from AsyncStorage
Syncs with Firebase
Shows loading state
Step 1 — Age Range
Radio selection (required)
Step 2 — Goal Selection
Options:
Lose Weight
Build Muscle
Improve Endurance
Stay Healthy
Step 3 — Diet Preference (Conditional)
Multi-select checkboxes
Only shown for specific goals
Step 4 — Activity Level
Radio selection
Step 5 — Name Input
Text input field
Summary Screen
Review all inputs
Edit or restart
🛠️ Tech Stack
Framework
React Native (Expo)
Navigation
React Navigation (Stack Navigator)
State Management
React Context + useReducer
Backend
Firebase Firestore
Local Storage
AsyncStorage
🧠 Architecture Approach
Centralized State

All app state is managed through a single FlowContext:

currentStepIndex
answers
loading state
Step Configuration

Steps are defined in a centralized config:

Dynamic rendering
Conditional logic using showIf
Data Sync Strategy
Save locally → instant persistence
Sync with Firebase → backup & restore

        
👩‍💻 Author
Kanchan Kulkarni
