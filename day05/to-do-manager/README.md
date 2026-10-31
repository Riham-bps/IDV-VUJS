# Project - To-Do Manager

## Project Description

The goal of this project is to design a working prototype of a to-do manager app using Vue 3 and TypeScript.

## Required Features

- The interface allows users to create a task using a form
- The interface allows users to delete a task
- The interface displays a list of tasks (including the title and status)
- Users can change the status of a task (to do, in progress, done)
- Tasks are saved in localStorage and persist after a page refresh
- The site contains a header and a footer

## Bonus Features

- The title of a task can be edited
- Tasks can be filtered by status
- The interface elements are accessible to people with disabilities and include ARIA attributes.

## Technologies Used

- Vite: a fast, modern frontend build tool and local development server used to create, test, and bundle web applications
- Vue 3: a JavaScript framework for building user interfaces
- TypeScript: a programming language that adds static type checking to JavaScript
- ESLint: helps catch errors and enforce coding standards
- Prettier: ensures consistent code formatting
- localstorage: used to save data in the browser

## Project Architecture

```
to-do-manager/
├── public/                  # Static files (favicon)
├── src/
│   ├── components/
│   │   ├── TaskForm.vue     # Form to create a new task
│   │   ├── TaskFilter.vue   # Filter tasks by status
│   │   └── TaskList.vue     # Display, edit and delete tasks
│   ├── types/
│   │   └── task.ts          # Status enum and Task interface
│   ├── App.vue              # Main component: task list, localStorage
│   └── main.ts              # Application entry point
├── index.html
├── package.json             # Manage dependencies and command scripts
└── tsconfig.json
```

## Project Initialization and Launch

### Prerequisites
- Node.js and npm installed on your machine


### Steps
1 - Clone the repository via the CLI
```sh
git clone https://github.com/Riham-bps/IDV-VUJS.git
```

2 - Navigate to the correct folder
```sh
cd IDV-VUJS/day05/to-do-manager/
```

3 - Install the dependencies
```sh
npm install
```

4 - Run the program
```sh
npm run dev
```
5 - Open the URL displayed in the terminal

## Git Workflow

### Branches

- `main`: stable version, the one presented on the day of the defense
- No `dev` branch: this is a small, individual project, so I work directly on `main`

### Commits

- `feat: feature description`: add a feature
- `fix: bug description`: fix a bug
- `style: description`: visual changes (CSS) and code formatting (Prettier, ESLint), no logic change
- `chore: description`: maintenance tasks (configuration, dependencies, project setup)
- `docs: README update`: modify the README

## Author

- bassim_r
