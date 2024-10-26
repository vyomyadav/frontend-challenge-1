# Coding Challenge: MRF Generation from Claims File OON Rates

## Introduction

As part of the Transparency in Coverage (TiC) regulations, health insurers are required to publish their allowed amounts monthly in a machine-readable format. This challenge involves building a React application that facilitates the generation of these Machine-Readable Files (MRFs) from a CSV file containing claims data.

You will create an interface that allows users to upload, parse, validate, and approve claims data. The approved data will then be sent to a backend API to generate JSON MRF files, which will be stored on the server on disk. Additionally, you will implement mock auth for certain routes and expose a public page displaying the list of MRF files.

_Please look into the [RUBRIC.md](./RUBRIC.md) for our evaluation criteria_

## Objectives

- **Build a user-friendly interface** for uploading and managing claims data.
- **Parse and validate** the uploaded CSV claims file.
- **Present the data** to users for approval before processing.
- **Interact with a simple backend API** to generate and store JSON MRF files.
- **Fetch and display** the list of MRF files for each customer.
- **Implement authentication** for secure routes using dummy auth.
- **Expose a public page** displaying MRF files.
- **Document the application design** and functionality.

## Tools and Libraries to Use

- **UI Components**: [Mantine](https://mantine.dev/) (do **NOT** design components from scratch).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (use Tailwind classes for styling).
- **State Management**: [MobX](https://mobx.js.org/README.html) (use one file for all state management).
- **CSV Parsing**: [Papaparse](https://www.papaparse.com/) for parsing CSV files.
- **Data Tables**: [AG Grid](https://www.ag-grid.com/) for displaying data in tables.
- **Routing**: [React Router](https://reactrouter.com/) for handling routes.
- **Schema Validation**: [Zod](https://zod.dev/) for validating claims data.
- **API Interaction**: Use `fetch` or any other library for API calls.
- **Authentication**: Implement dummy authentication for secure routes.
- **Storage**: Store generated MRF files on the server in a local folder.

## Instructions

### 1. TiC Compliance for Allowed Amounts Publication

- Understand that under the TiC regulations, health insurers must publish their allowed amounts monthly in a machine-readable JSON format. The format is publicly documented [here](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/allowed-amounts).
- This application will aid in generating these JSON MRF files from a CSV file containing claims data.

### 2. Build an Interface for CSV Upload

- **Create a user interface** that allows users to upload a CSV file of claims.
- **Use Mantine components** for building the interface (do not design components from scratch).
- The interface should include:
  - A file upload button.
  - Display of the selected file name.
  - Error handling for incorrect file formats.
  - A table of all the claims that the user will approve.

### 3. Parse, Validate, and Present Claims Data

- **Use Papaparse** to parse the input CSV file on the frontend. A sample has been included under `data/sample.csv`
- **Validate the claims data** against a defined schema (you need to define a high-quality schema for the claims data).
- **Handle parsing and validation errors** gracefully by informing the user of any issues.
- **Present the parsed and validated data** to the user using AG Grid in a tabular format.
- Allow the user to **approve** claims before submission.
   - BONUS: Allow the user to **edit** or **remove** claims as well.

### 4. Interact with Backend API for JSON MRF Generation

- **Define a high-quality schema** for the data to be sent to the backend API.
- **Implement a function** to send the approved claims data to the backend API.
- The backend API will **convert the data into JSON MRF files** and store them on the server in a local folder.
- The format is publicly documented [here](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/allowed-amounts). You will simply run averages on each provider, procedure, place of service, billing class combination to generate the file.
- This is the bulk of the project, I expect you to use good design patterns from here: https://refactoring.guru/design-patterns/catalog to manage the generation of the final file.
- If there are missing required fields such as TIN. You can ignore them.

### 5. Fetch and Display List of MRF Files

- **Create an API endpoint** that fetches the list of generated MRF files for each customer.
- **Display the list** on a page similar to [this example](https://mrf.mano.claims/EdisonHealth).

### 6. Implement Dummy Auth for Secure Routes

- **Implement dummy authentication** (e.g., a simple admin login) to protect routes that allow uploading and processing of claims data.
- **Ensure that only authenticated users** can access these secure routes.
- **Publicly expose the MRF files page** without requiring authentication.

### 7. Expose Public MRF Page

- **Create a public page** that displays the list of MRF files fetched from the API.
- Ensure that this page is **accessible without authentication**.
- The page should be user-friendly and display the files in a clear and organized manner.

### 8. Application Design Documentation

- **Create a markdown file (`DESIGN.md`)** that explains the entire application architecture and functionality.
- Include details about:
  - Overall application flow.
  - Components and their responsibilities.
  - State management using MobX.
  - Interaction with the backend API.
  - Routing and navigation.

### 9. Code Organization and Best Practices

- Organize your code into appropriate folders:
  - `components/` for reusable components.
  - `pages/` for page-level components.
  - `stores/` for MobX state management (use one file for all state management).
  - `services/` for API calls and backend interaction.
  - `utils/` for utility functions.
- **Maintain high code quality** with proper spacing, comments, and meaningful naming conventions.

## Submission Guidelines

- **Provide a forked repository link** containing your project. Make sure it is public or add @mihilmy as a collaborator.
- Include a **`README.md`** file with clear instructions on how to set up and run your application locally.
- Ensure all dependencies are listed, and any setup scripts or configuration files are included.
- Your code should be **well-organized** and **easy to navigate**.
- Please look into the [RUBRIC.md](./RUBRIC.md) for our evaluation criteria
