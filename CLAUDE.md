# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React and bootstrapped with Create React App. The site serves as a GitHub Pages hosted portfolio for displaying personal information, research, CV, and other professional content.

## Development Commands

### Essential Commands
- `npm start` - Start development server at http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build production bundle to `build/` folder
- `npm run deploy` - Deploy to GitHub Pages (runs predeploy script automatically)

### Deployment
- `npm run predeploy` - Builds the app for production
- `npm run deploy` - Deploys built app to GitHub Pages using gh-pages

## Architecture

### React Router Structure
The app uses React Router v6 with the following route structure defined in `src/index.js`:
- `/` - Home page (`Home` component)
- `/About` - About page (`About` component) 
- `/CV` - CV/Resume page (`CV` component)
- `/Research` - Research page (`Research` component)
- `*` - 404 Not Found page (`NotFound` component)

### Component Architecture
- `App.js` - Root component with Header, Outlet for routes, and Footer
- `src/components/` - All page components (Home, About, CV, Research, NotFound, Header, Footer)
- Uses CSS and SCSS for styling (`App.css`, `App.scss`)

### Key Dependencies
- React 17.0.2 with React Router DOM 6.2.1
- SASS for styling
- gh-pages for GitHub Pages deployment
- Standard Create React App testing setup with Jest and React Testing Library

### Static Assets
- Public folder contains PDFs, images, favicon, and other static assets
- Special files: `defence_draft.html` with extensive Reveal.js presentation assets

## Development Notes

This is a standard Create React App setup with minimal custom configuration. The main customizations are:
- GitHub Pages deployment setup in package.json
- SASS preprocessing
- React Router for SPA navigation
- Portfolio-specific components and styling