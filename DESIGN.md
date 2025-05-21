# MRF Generation Application Design

## Overview

This application facilitates the generation of Machine-Readable Files (MRFs) from claims data, as required by the Transparency in Coverage (TiC) regulations. The application allows users to upload CSV files containing claims data, validate the data, and generate JSON MRF files that comply with the required format.


## Installation and Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setting Up the Project

#### Backend Setup
1. Install backend dependencies:

   cd backend
   npm install

2. Start the backend server:

   npm start
   
   The backend server will run on http://localhost:3000 by default.

#### Frontend Setup
1. Install frontend dependencies:

   cd frontend
   npm install

2. Start the development server:

   npm run dev
   
The frontend development server will run on http://localhost:5173 by default.

Both services need to run simultaneously


### Available Scripts

#### Backend
- `npm start`: Starts the server
- `npm run dev`: Starts the server in development mode with hot reload
- `npm run build`: Builds the TypeScript code
- `npm test`: Runs tests

#### Frontend
- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run preview`: Previews the built application
- `npm run lint`: Runs ESLint

## Architecture

### Frontend Architecture

The application follows a component-based architecture using React and is organized into the following main directories:

- `components/`: Reusable UI components
- `pages/`: Page-level components
- `stores/`: MobX state management
- `services/`: API communication layer
- `utils/`: Utility functions and helpers

### State Management

We use MobX for state management with a single store (`mrfStore.ts`) that handles:
- Claims data
- Loading states
- Error handling
- MRF file list management
- User authentication state

The store follows observable/action patterns to ensure predictable state updates and reactive UI rendering.

### Components

1. **FileUpload**
   - Handles CSV file upload using Mantine's Dropzone
   - Parses CSV data using Papaparse
   - Validates data against the defined schema using Zod
   - Provides immediate feedback on parsing errors

2. **ClaimsTable**
   - Displays claims data using AG Grid
   - Provides sorting and filtering capabilities
   - Allows users to approve, edit, or remove claims for MRF generation
   - Implements data validation with visual indicators

3. **MrfFilesList**
   - Displays the list of generated MRF files
   - Provides download functionality for each file
   - Shows metadata including generation date and file size

### Pages

1. **UploadPage**
   - Main page for file upload and claims management
   - Combines FileUpload and ClaimsTable components
   - Handles error display and user feedback
   - Includes submission controls for approved claims
   - Features a "View MRF Files" button for quick navigation to the MRF files page

2. **PublicMrfPage**
   - Public-facing page displaying available MRF files
   - Uses MrfFilesList component
   - Designed to be accessible without authentication
   - Contains explanatory text describing machine-readable files and compliance requirements
   - Structured with clear headings and spacing for readability

### Routing and Navigation

The application uses React Router for navigation with the following route structure:
- `/`: Home page with upload functionality (protected route)
- `/login`: Authentication page (for bonus authentication implementation)
- `/mrf`: Public page displaying available MRF files
- `/mrf/:id`: Detail view for a specific MRF file

Navigation components include:
- Header with navigation links
- Protected route wrapper for authenticated pages
- Breadcrumb navigation for improved UX
- Direct navigation button from the main page to the MRF files page

### Data Flow

1. User uploads CSV file
2. File is parsed and validated on the frontend
3. Valid claims are displayed in the table
4. User approves claims
5. Claims are sent to backend for MRF generation
6. Generated files are stored on the server
7. Updated file list is fetched and displayed

### API Integration

The application communicates with the backend through a simple API layer (`api.ts`) that handles:
- MRF file generation requests
- Fetching the list of available MRF files

API endpoints include:
- `POST /api/mrf/generate`: Generate MRF file from approved claims
- `GET /api/mrf/files`: Get list of all generated MRF files

### Schema Validation

We use Zod for schema validation with defined schemas for:
- Claims data structure (including validation for provider information, procedure codes, etc.)
- API request/response payloads
- Schema handles cases where TIN or NPI fields might be empty as mentioned in requirements

### Design Patterns Used

For MRF file generation, we implement several design patterns:
- **Factory Pattern**: To create different types of MRF file objects
- **Strategy Pattern**: For handling different data processing strategies
- **Adapter Pattern**: For transforming claims data into the required MRF format
- **Observer Pattern**: For updating UI state when operations complete

### UI/UX Considerations

- Modern, clean interface using Mantine components
- Responsive design with Tailwind CSS
- Clear error messaging and loading states
- Intuitive file upload and approval process
- Accessible design following WCAG guidelines
- Center-aligned table content for improved readability in the MRF files listing
- Consistent spacing and typography for better content hierarchy

### Testing

The application implements a comprehensive testing approach to ensure reliability and maintainability:

#### Testing Architecture

- **Test Framework**: Vitest for both frontend and backend testing
- **Test Libraries**: React Testing Library for component testing
- **Environment**: JSDOM for simulating browser environment in Node.js
- **Mocking**: Vi mocking utilities for dependency isolation

#### Frontend Testing Strategy

1. **Component Testing**
   - Visual rendering tests for UI components
   - User interaction simulations (clicks, inputs)
   - State change verification
   - Component trees wrapped with necessary providers (MantineProvider)

2. **Store Testing**
   - State initialization and mutation tests
   - Action dispatch and effect tests
   - API integration tests with mocked responses
   - Error handling verification

3. **Test Coverage Targets**
   - Critical components: MrfFilesList, FileUpload, ClaimsTable
   - State management: mrfStore
   - Utility functions and data transformation logic

#### Backend Testing Strategy

1. **API Endpoint Testing**
   - Request validation and response formatting
   - Success and error case handling
   - File system operation validations
   - Data transformation logic

2. **Integration Testing**
   - End-to-end API request flow testing
   - File processing and generation validation
   - Error propagation verification

3. **Mocking Approach**
   - File system operations mocked for consistent tests
   - External dependencies isolated using mocks
   - Test data generation for consistent test results

#### Test Maintenance

- Tests organized by feature and component
- Shared test utilities for common operations
- Descriptive test naming for clarity
- Setup and teardown procedures for test isolation

### Security

- Frontend validation to prevent invalid data submission
- API endpoint security (to be implemented on the backend)
- File size and type restrictions
- Input sanitization for all user-entered data


