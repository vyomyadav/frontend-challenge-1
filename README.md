# MRF Generation Application

A React application for generating Machine-Readable Files (MRFs) from claims data, compliant with Transparency in Coverage (TiC) regulations.

## Features

- Upload and parse CSV files containing claims data
- Validate claims data against defined schemas
- Approve, edit, or remove claims before processing
- Generate JSON MRF files through API interaction
- View and download generated MRF files
- Public page for accessing MRF files to meet compliance requirements

## Prerequisites

- Node.js (v18+) - Required for both frontend and backend
- npm or yarn
- Git

## Setup Instructions

### Clone the Repository

```bash
git clone <repository-url>
cd frontend-challenge-1
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

The backend server will run on http://localhost:3000 by default.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend development server will run on http://localhost:5173 by default.

> **Important**: Both services (frontend and backend) need to run simultaneously for the application to function correctly.

## Using the Application

1. Access the application at http://localhost:5173
2. Use the upload interface to select a CSV file with claims data
3. Review the parsed claims in the table
4. Approve or modify claims as needed
5. Submit approved claims for MRF file generation
6. Access the MRF files page via the "View MRF Files" button
7. Download generated MRF files as needed

## Available Scripts

### Backend

- `npm start`: Starts the server
- `npm run dev`: Starts the server in development mode with hot reload
- `npm run build`: Builds the TypeScript code
- `npm test`: Runs tests
- `npm run test:watch`: Runs tests in watch mode

### Frontend

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the built application
- `npm run lint`: Runs ESLint
- `npm test`: Runs tests
- `npm run test:watch`: Runs tests in watch mode
- `npm run test:coverage`: Generates test coverage report

## Testing

The application includes comprehensive test suites for both frontend and backend:

### Frontend Tests

Frontend tests use Vitest and React Testing Library to test components and store functionality:

```bash
cd frontend
npm test            # Run all tests once
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

Our frontend testing approach includes:

- **Component Testing**: Testing UI components like MrfFilesList for proper rendering and user interactions
- **Store Testing**: Validating MobX state management in mrfStore, including API calls and state updates
- **Mocked Dependencies**: API calls and external dependencies are mocked for consistent test results
- **Proper Context Providers**: Components are wrapped with MantineProvider for accurate UI rendering

### Backend Tests

Backend tests verify API endpoints and business logic:

```bash
cd backend
npm test            # Run all tests once
npm run test:watch  # Run tests in watch mode
```

Our backend testing approach includes:

- **API Endpoint Testing**: Validating response status and payloads for all endpoints
- **Error Handling**: Testing proper error responses when operations fail
- **File Operations**: Mocking file system operations to test MRF file generation
- **Input Validation**: Testing request validation for required fields and data formats

> **Important**: The test suite requires Node.js version 18 or higher. If you encounter syntax errors with the nullish coalescing operator (`??`), make sure you're using the correct Node.js version by running:
```bash
nvm use 18  # If you're using nvm
```

## Dependencies

### Frontend

- **React**: UI library
- **Mantine**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **MobX**: State management
- **React Router**: Navigation and routing
- **Papaparse**: CSV parsing
- **AG Grid**: Data table component
- **Zod**: Schema validation

### Backend

- **Node.js**: Runtime environment
- **Express**: Web server framework
- **TypeScript**: Programming language
- **fs-extra**: Enhanced file system methods

## API Endpoints

- `POST /api/mrf/generate`: Generates MRF files from approved claims
- `GET /api/mrf/files`: Returns a list of available MRF files

## Project Structure

```
frontend-challenge-1/
├── backend/             # Backend server code
├── frontend/            # Frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── services/    # API communication layer
│   │   ├── stores/      # MobX state management
│   │   └── utils/       # Utility functions
├── data/                # Sample data files
├── DESIGN.md            # Application architecture documentation
└── README.md            # Project documentation
```

## Troubleshooting

- **Node Version Issues**: If you encounter errors when starting the development server, ensure you're using Node.js v18+.
- **API Connection Errors**: Verify that both backend and frontend servers are running simultaneously.
- **CSV Parsing Errors**: Ensure your CSV files follow the expected format (see sample.csv in the data directory).

## Additional Documentation

For more detailed information about the application's architecture and design patterns, please refer to the [DESIGN.md](./DESIGN.md) file.

