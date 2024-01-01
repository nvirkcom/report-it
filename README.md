# Report It

## Overview

Report It aims to develop a unique full-stack web application for report writing using Sass, JWT, Knex.js, MySQL, Passport.js and React. This application will stand out by offering users the ability to write and format reports seamlessly using both Markdown and a WYSIWYG editor. The goal is to provide a versatile and user-friendly interface for creating, editing, and managing reports efficiently.

### Problem

Many businesses and organizations face challenges in creating and managing reports effectively. Existing solutions often lack the versatility of allowing users to choose between Markdown and WYSIWYG editors, leading to inefficiencies in the reporting process.

### User Profile

The primary users of the app will be professionals and employees involved in report creation and management. They will appreciate the flexibility to write and format reports using either Markdown or a WYSIWYG editor.

### Features

1. **User Authentication:**
   - Implement user registration and login functionality using JWT and Passport.js for secure access.

2. **Report Creation:**
   - Allow users to create new reports with a versatile editor, supporting both Markdown and WYSIWYG formats.
   - Include options for text formatting.

3. **Report Editing:**
   - Enable users to edit existing reports.

4. **Report Organization:**
   - Provide a dashboard for users to view and manage their reports.

## Implementation

### Tech Stack

- Sass
- JWT
- Knex.js
- MySQL
- Passport.js
- React

### APIs

No external APIs will be used initially.

### Sitemap

- Home
- Create Report
- Dashboard
- Edit Report
- Report Details

### Mockups

#### Home

Welcome to Report It

#### Dashboard

- Recent Reports
- Create New Report Button

#### Create Report

- Title Input
- Type Dropdown (Markdown or WYSISYG)
- Content Editor (Markdown or WYSIWYG Tabs)
- Submit Button

#### Edit Report

- Edit Title
- Edit Type (Markdown or WYSISYG)
- Edit Content (Markdown or WYSIWYG Tabs)
- Save Changes Button

#### Report Details

- Title
- Content
- Author

### Data

- **Users Table:**
  - User ID
  - Username
  - Password (encrypted)

- **Reports Table:**
  - Report ID
  - Type
  - Title
  - Content
  - Author ID (foreign key)
  - Timestamp

### Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Authenticate and log in a user.
- `GET /api/reports`: Get a list of user's reports.
- `POST /api/reports`: Create a new report.
- `GET /api/reports/:id`: Get details of a specific report.
- `PUT /api/reports/:id`: Edit an existing report.
- `DELETE /api/reports/:id`: Delete a report.

### Auth

Authentication will be handled using JWT and Passport.js. Users will register, log in, and receive a token for accessing secured endpoints.

## Roadmap

**Day 1:**
- Set up project structure and initial configurations.
- Implement user authentication and authorization.
- Create database schema and set up MySQL database.
  
**Day 2:**
- Develop report creation and editing functionalities.
- Create a basic dashboard for report management.

**Day 3:**
- Design and refine the user interface.

**Day 4:**
- Conduct testing and debugging.
- Deploy the application to a hosting service.
- Prepare documentation for the project.

## Nice-to-haves

- **Export to PDF:** Allow users to export reports to PDF format.
- **Integration with Cloud Storage:** Enable attachment uploads to cloud storage services.
- **Advanced Search and Filtering:** Implement advanced search and filtering options for reports.
