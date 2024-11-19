# Tandklinikken Frederikssund Website

This repository contains the source code for the [Tandklinikken Frederikssund website](https://tandklinikken-frederikssund.dk/).

## Project Structure

dentistFrs/
├─ src/ # Source files
│ ├─ assets/ # Images, vendor libraries
│ ├─ scss/ # SCSS source files
│ ├─ css/ # Compiled CSS
│ ├─ js/ # JavaScript files
│ └─ index.html # Main homepage
├─ dist/ # Production build output
├─ package.json # Project dependencies and scripts
├─ vite.config.js # Vite configuration
└─ purgecss.config.js # CSS optimization config

## Features

- Responsive design for various devices
- User-friendly navigation
- Contact forms for easy communication
- Informative sections about services and team members
- Optimized build process with Vite
- SCSS compilation
- CSS optimization with PurgeCSS

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/aste/dentistFrs.git
   ```
2. Navigate to the project directory::
   ```sh
   cd dentistFrs
   ```
3. Clone the repository:
   ```sh
   npm install
   ```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A modern web browser
- A code editor (e.g., VS Code, Sublime Text)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run sass` - Watch and compile SASS files
- `npm run purge` - Run PurgeCSS optimization
- `npm run clean` - Clean build directory

### Running Locally

1. Start the development server:
   `npm run dev`
2. Open your browser to http://localhost:3000
3. Make changes to files in the src directory
4. The browser will automatically refresh to show your changes

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

## Screenshots

### Mobile Version

![Homepage](assets/img/screenshots/mobile.webp)

### Vertical Tablet Version

![Homepage](assets/img/screenshots/tablet-vertical.webp)

### Horizontal Tablet Version

![Homepage](assets/img/screenshots/tablet-horizontal.webp)

### Desktop Version

![Homepage](assets/img/screenshots/desktop.webp)

## License

This project is licensed under a restrictive license. Permission is required before using any part of this codebase. Please contact the repository owner for more details.
