# Helio App Monorepo

This repository contains the monorepo for the Helio App, which includes the web application, the upcoming mobile application, and shared business logic.

## Project Structure

The project is organized as a monorepo with the following structure:

- **/apps**: Contains the individual applications.
  - **/apps/web**: The public-facing Progressive Web App (PWA) built with React.
  - **/apps/mobile**: The upcoming native mobile application built with React Native.
- **/packages**: Contains shared code, utilities, and configurations used across different applications.
  - **/packages/shared-logic**: Core business logic, including context providers (state management), data types, mock data, and configuration. This is the "brain" of the application.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- A package manager (npm, yarn, or pnpm)

### Running the Web Application

1.  Navigate to the web app directory:
    ```sh
    cd apps/web
    ```
2.  Install dependencies (if you haven't already from the root):
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm start
    ```
    The application will be available at `http://localhost:3000` (or another port if 3000 is busy).

### Running the Mobile Application (Future)

Once the mobile app development begins:
1.  Navigate to the mobile app directory:
    ```sh
    cd apps/mobile
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the Metro bundler and run on a simulator/device:
    ```sh
    npm run ios
    # or
    npm run android
    ```

## For Backend Engineers

The frontend application currently operates using mock data located in `packages/shared-logic/src/data/mock-data.ts`. All data fetching and state management logic is centralized within the React Context providers located in `packages/shared-logic/src/context/`.

To integrate a real backend, you will need to replace the mock data manipulations within these context files with API calls to your backend endpoints.

**Key files to modify:**
- `packages/shared-logic/src/context/ServicesContext.tsx`: For services, categories, and reviews.
- `packages/shared-logic/src/context/PropertiesContext.tsx`: For real estate properties.
- `packages/shared-logic/src/context/NewsContext.tsx`: For news, advertisements, and notifications.
- `packages/shared-logic/src/context/UsersContext.tsx`: For user and admin management.
- `packages/shared-logic/src/context/AuthContext.tsx`: For user authentication logic.
- `packages/shared-logic/src/context/AppContext.tsx`: For community features (posts, marketplace, etc.).
- `packages/shared-logic/src/context/TransportationContext.tsx`: For transportation schedules and routes.

All data structures and types are defined in `packages/shared-logic/src/types.ts`. Please ensure your API responses match these types for a smooth integration.