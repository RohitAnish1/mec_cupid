# MEC Cupid Registration Client

This is the frontend application for the MEC Cupid matchmaking platform. It allows users to register, answer compatibility questions, and submit their preferences for matchmaking.

## Features

- **User Authentication**: Google OAuth integration using Supabase.
- **Guidelines**: Display event rules and guidelines before registration.
- **Registration Form**: Collect user details like name, WhatsApp number, and preferences.
- **Compatibility Questions**: Gather user interests and preferences for matchmaking.
- **Responsive Design**: Optimized for various screen sizes using TailwindCSS.

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Authentication**: Supabase
- **State Management**: React Hooks

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mec-cupid.git
   cd mec-cupid/registration-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `registration-client` directory and add the following environment variables:
   ```
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Folder Structure

```
registration-client/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── assets/            # Images and other assets
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   ├── index.css          # Global styles
│   └── firebaseConfig.js  # Firebase configuration
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Deployment

This application can be deployed to platforms like Vercel, Netlify, or any static hosting service. Ensure the `.env` variables are configured in the hosting platform.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
