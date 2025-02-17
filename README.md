<<<<<<< HEAD
# vuerace
horse racing
=======
# 🏇 Horse Racing Simulator

This project is a **horse racing simulator** developed using **Vue.js** and **Pinia**. Players can generate a **6-round racing program**, where randomly created horses compete across **various distances**. The race can be watched in real-time, with animated horse movement and a leaderboard updating dynamically.

---

## 🚀 Features

✅ **Random Horse Generation** → A total of 20 horses are randomly created.  
✅ **Racing Program** → A 6-round racing series is automatically scheduled.  
✅ **Animated Horse Movement** → Horses move smoothly during the race.  
✅ **Live Race Tracking** → Follow the progress of each horse in real time.  
✅ **Race Results** → The leaderboard updates dynamically after each round.

---

## 📌 Technologies Used

- **Vue.js 3** (Composition API)
- **Pinia** (State Management)
- **TypeScript**
- **GSAP** (For Animations)
- **Vitest** (For Testing)

---


* 🎮 How to Play?
* 1️ **Click “Generate Program”** → This will create a racing program with randomly assigned horses.
* 2️ **Click “Start Race”** → The race begins, and the horses start moving.
* 3️ **Each round ends** → when all horses reach the finish line, and the leaderboard updates.
* 4️ **The next** → round starts automatically, and after 6 rounds, the final results are displayed.**



2️⃣ Install Dependencies
- npm install

3️⃣ Start the Development Server
- npm run dev



🧪 Running Tests
- npm run test

## 📜 Project Structure

1. [ ] 📂 src
2. [ ] ┣ 📂 components
3. [ ] ┃ ┣ 📜 RaceTrack.vue      → The race track & animation
4. [ ] ┃ ┣ 📜 RaceControls.vue   → UI controls (Generate & Start buttons)
5. [ ] ┃ ┣ 📜 RaceResults.vue    → The leaderboard & race results
6. [ ] ┣ 📂 store
7. [ ] ┃ ┣ 📜 raceStore.ts       → Pinia store for race state management
8. [ ] ┣ 📂 utils
9. [ ] ┃ ┣ 📜 helper.ts          → Helper functions for horse movement & race logic
10. [ ] ┣ 📂 tests
11. [ ] ┃ ┣ 📜 raceStore.test.ts  → Unit tests for race logic
12. [ ] ┣ 📜 App.vue              → Main application component
13. [ ] ┣ 📜 main.ts              → Application entry point
14. [ ] ┣ 📜 constants.ts         → Constants (race distances, statuses, etc.)
15. [ ] ┗ 📜 vite.config.ts       → Vite configuration file
>>>>>>> 5a69da9 (first commit)
