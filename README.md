# Nacelle Frontend Engineering Challenge

**by Andrew Avina**

## Setup instructions

### Prerequisites

- **Node.js** (version 16 or higher recommended).
- **Yarn classic/v1** as the package manager (due to an issue with npm and `create-react-app` at the time of development). [Issue in github](https://github.com/facebook/react/issues/31701) - related to recent React v19.

### To run the app locally:

1. From a terminal, run `yarn` to install all the packages
2. Run `yarn start` to run the app in browser
3. To see test results, run `yarn test`. Can be done in separate tab or window of terminal.

**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).** Including some of the boilerplate readme in case it's needed.

### Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

\*\*Note: removed details for brevity - see [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for details.

## My Approach & Key Decisions

### 1. Search Component

- **Decision**: For Challenge 2, I chose to build the search component instead of the modal.
- **Reasoning**: Mostly due to personal preference and having more experience working on search components. For the loading state, I added a debounce/setTimeout to mimic a real-world API call in order to display the loading state. That's one of my assumptions - i.e. data being returned by search would be fetched from API.

### 2. Create React App (CRA)

- **Decision**: Bootstrapped the project with Create React App (CRA).
- **Reasoning**: CRA supports TypeScript, Jest, and React Testing Library out of the box. This saved significant setup time for a quick, small project like this one, enabling a faster development workflow.
- **Alternatives Considered**:
  Vite. While Vite is faster for modern projects, CRA's built-in configurations were more convenient for a project requiring immediate Jest and TypeScript integration.

### 3. Navigation Design

- **Decision**: Implement a simple toggle between views using React's `useState`.
- **Reasoning**: The app has only two views, so a full routing solution like React Router was unnecessary. Using `useState` allowed for a lightweight toggle implementation.
- **Alternatives Considered**: If the app required more views/pages, then a more robust solution like React Router or TanStack Router would be better.

### 4. Styling Approach - CSS

- **Decision**: Use CSS modules for component-specific styles (e.g., Search.css, NotificationList.css).
- **Reasoning**: I mostly have experience with regular, "old-fashioned" CSS. So it's faster for me to implement CSS modules. They also ensure component isolation, avoiding global style conflicts.
- **Alternatives Considered**: I could have used LESS or Tailwind CSS, but CSS modules were faster to implement for me for this project’s scope. But, LESS and Tailwind CSS are certainly viable options as well.

### 5. File Organization

- **Decision**: For this project, I organized components into their own directories, grouping related files such as styles (.css) and tests (.test.tsx) with the component implementation (.tsx).
- **Reasoning**: This structure improves clarity and maintainability by keeping all component-specific files together in one place. It also makes it easier to scale the project if new features or additional files (like utility functions or hooks) need to be added to a component.
- **Alternatives Considered**:
  - Flat file structure (e.g. just files, no directories in `src` folder): While simpler for very small projects, it can quickly become unwieldy as the application grows, leading to harder-to-navigate directories and scattered component-related files.
  - Index files for directories: Adding index.ts files for re-exports simplifies imports but adds unnecessary complexity for a small project like this, where components are straightforward and only imported in a few places.

### 6. Shared types.d.ts file

- **Decision**: AppNotification type is the only type used in multiple files, I put that in one general file.
- **Reasoning**: Easily share a type, DRY, and for larger projects can make it easier to scale and re-use types.

### 7. Prettier

- **Decision**: I chose to use [Prettier](https://prettier.io/) for code formatting.
- **Reasoning**: Fast and easy to setup. You can setup Prettier to automatically format your code via a script or on save (my preference). Saves time and effort of having to worry about formatting. In bigger projects, it works well with linters (e.g. es-lint) and build tools (e.g. husky).

### 8. TDD

- **Decision**: Have terminal app open with 2 tabs running both the dev and test servers.
- **Reasoning**: This helps make TDD easier. As updates are saved to UI and test files, the servers automatically update the browser and re-run your tests. That way you can immediately see if you broke anything...
