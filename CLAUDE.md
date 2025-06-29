# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BounceUp is a basketball training PWA designed for 8-year-old boys with ADHD tendencies. The app focuses on gamified training with visual progress tracking and reward systems.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3002)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

## High-Level Architecture

### Tech Stack
- **React 18.2** with Vite 4.4.5 build tool
- **Tailwind CSS 3.3.5** for styling
- **Dexie 3.2.4** for IndexedDB local storage
- **Chart.js 4.4.0** for data visualization
- **PWA** with vite-plugin-pwa for offline capabilities

### Core Modules

1. **Training System** (`src/components/training/`)
   - Four training categories: Dribbling, Shooting, Passing, Movement
   - Parent-child interactive training
   - 10-level progression system with auto-generated plans
   - Custom training creation

2. **User Management** (`src/contexts/UserContext.jsx`)
   - PIN-based security
   - Profile management
   - Data import/export functionality

3. **Progress Tracking** (`src/components/profile/`)
   - Skill radar charts
   - Training calendar view
   - Historical records visualization

4. **Reward System** (`src/contexts/RewardContext.jsx`)
   - Star points accumulation
   - Level progression (10 levels)
   - Reward redemption system
   - Achievement tracking (pending implementation)

5. **Data Persistence** (`src/utils/db.js`)
   - Dexie-based IndexedDB implementation
   - Stores: users, trainingHistory, userRewards, trainingPlans
   - Automatic data migration support

### State Management
Uses React Context API with four main contexts:
- `UserContext` - User authentication and profile
- `TrainingContext` - Training data and history
- `TrainingPlanContext` - Training plans and schedules
- `RewardContext` - Points, levels, and rewards

### Key Design Principles
1. **ADHD-Friendly Design**
   - Short training sessions (3-10 minutes)
   - Clear visual feedback
   - Immediate rewards
   - Simple navigation

2. **Offline-First PWA**
   - Complete offline functionality
   - Resource caching with Workbox
   - Update notifications
   - Add to home screen support

3. **Path Alias**
   - `@` resolves to `src/` directory
   - Used throughout the codebase for clean imports

### Development Workflow
1. Feature development in `src/components/`
2. State management through contexts
3. Data persistence with Dexie
4. Styling with Tailwind utility classes
5. Testing on mobile devices for PWA features

### Important Notes
- Version in package.json (0.1.1) should match deployment
- Development progress tracked in `logs.md`
- No test files exist despite npm test command
- Vercel deployment configured with custom build script
- All dates/times stored in ISO format for consistency