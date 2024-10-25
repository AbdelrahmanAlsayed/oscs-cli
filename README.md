# OSC-CLI

OSCS-CLI (Open Source Contributor Suggester CLI) is a simple command-line tool to help us the developers to discover open-source projects related to our preferences. It fetches and displays repositories based on field, job title, language proficiency, and other criteria.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Commands](#commands)
- [Project Structure](#project-structure)
- [Future Enhancements and Plans](#future-enhancements-and-plans)
- [License](#license)
- [Author](#author)

## Installation

To install OSCS-CLI globally via npm:

```bash
npm install -g oscs-cli
```

## Usage

OSCS-CLI currently supports fetching and listing gitHub projects based on user input preferences.

### Commands

- **Fetch Projects**: Fetches and saves projects matching the user’s preferences.

  ```bash
  oscs-cli fetch
  ```

- **List Projects**: Displays saved projects in a table format.
  ```bash
  oscs-cli list
  ```

### Example Workflow

1. Run `oscs-cli fetch` to gather projects. Enter information as prompted (e.g., field, job title).
2. View saved projects with `oscs-cli list`.

### Project Structure

The following structure ensures code is organized, scalable, and maintainable:

```
oscs-cli/
├── bin/
│   └── index.js          # CLI entry point
├── src/
│   ├── commands/         # Commands directory
│   ├── utils/            # Utilities like loading spinner
├── projects.json         # Data file for storing projects
├── package.json          # npm config
├── README.md             # Project documentation
└── LICENSE               # License file
```

### Future enhancements and plans

Planning to enhance the app by adding automated testing for core functions, managing user choices in a better way than this very simple one to provide the most relevant projects, focusing on global error handling, and setting up a CI/CD pipeline to automate the process. actually a lot of things to consider so I'm still figuring it out.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- <a href="https://www.linkedin.com/in/abdelrahmmaan/" target="_blank" rel="noopener noreferrer">LinkedIn<a>
