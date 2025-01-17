# Tandklinikken Frederikssund Website

This repository contains the source code for the [Tandklinikken Frederikssund website](https://tandklinikken-frederikssund.dk/).

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features
- Responsive design for various devices.
- User-friendly navigation.
- Contact and appointment forms for easy communication.
- Informative sections about services and team members.
- Smooth animations and interactive UI elements.
- SEO optimization with sitemap and robots.txt.

## Tech Stack
- **Frontend:** HTML5, SCSS, JavaScript
- **Bundler:** Vite
- **Deployment:** Netlify


## Project Structure
```
├─ index.html                  # Main homepage
├─ public
│  ├─ _redirects               # Redirect rules from prior site paths
│  ├─ img                      # Image assets
│  ├─ netlify.toml             # Netlify configuration
│  ├─ robots.txt               # SEO rules for web crawlers
│  ├─ site.webmanifest         # PWA Manifest
│  └─ sitemap.xml              # Sitemap for SEO
├─ src
│  ├─ assets
│  │  └─ scss
│  │     ├─ _animations.scss
│  │     ├─ _style.scss        
│  │     └─ main.scss          # Main stylesheet
│  └─ js
│     ├─ animations.js
│     ├─ appointment-form.js
│     ├─ contact-form.js
│     └─ main.js               # JavaScript entry point 
├─ package-lock.json           # Lockfile for dependencies
├─ package.json                # Project metadata and dependencies
└─ vite.config.js              # Vite configuration
```              

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aste/dentistFrs.git
   cd dentistFrs
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

2. **Edit Files:**
   - HTML: `index.html`
   - Styles: `styles/`
   - JavaScript: `main.js`, `appointment-form.js`, `contact-form.js`, `animations.js`

3. **Live Reload:** Changes will automatically reload in the browser.

## Deployment

1. **Build the project for production:**
   ```bash
   npm run build
   ```
   This will generate optimized files in the `dist/` directory.

2. **Deploy to Netlify:**
   - Connect the repository to Netlify.
   - Set the build command to `npm run build`.
   - Set the publish directory to `dist/`.

## Screenshots

### Mobile Version
![Homepage](assets/img/screenshots/mobile.webp)

### Vertical Tablet Version
![Homepage](assets/img/screenshots/tablet-vertical.webp)

### Horizontal Tablet Version
![Homepage](assets/img/screenshots/tablet-horizontal.webp)

### Desktop Version
![Homepage](assets/img/screenshots/desktop.webp)

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

## License

This project is licensed under a restrictive license. Permission is required before using any part of this codebase. Please contact the repository owner for more details.


