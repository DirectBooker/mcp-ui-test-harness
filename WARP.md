# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.5 React application using the App Router architecture, Turbopack for development/build performance, TypeScript, and Tailwind CSS v4. The project uses the latest React 19.1.0 and follows modern Next.js patterns with the `src/app` directory structure.

## Architecture

**Framework & Tech Stack:**
- Next.js 15 with App Router (not Pages Router)
- React 19.1.0 with TypeScript
- Tailwind CSS v4 (newer version with different config approach)
- ESLint with Next.js configuration
- Geist fonts (both Sans and Mono variants)

**Directory Structure:**
- `src/app/` - App Router directory containing pages, layouts, and route handlers
- `src/app/layout.tsx` - Root layout component with font configuration and metadata
- `src/app/page.tsx` - Home page component
- `src/app/globals.css` - Global styles with Tailwind CSS imports and CSS custom properties
- `public/` - Static assets (SVG icons and images)

**Key Configuration Files:**
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` maps to `./src/*`)
- `eslint.config.mjs` - ESLint flat config format with Next.js rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS v4

## Development Commands

**Start development server:**
```bash
npm run dev
```
- Uses Turbopack for faster development builds
- Runs on http://localhost:3000

**Build for production:**
```bash
npm run build
```
- Uses Turbopack for optimized production builds

**Start production server:**
```bash
npm run start
```
- Serves the built application (must run `npm run build` first)

**Linting:**
```bash
npm run lint
```
- Runs ESLint with Next.js TypeScript rules

## Styling System

**Tailwind CSS v4:**
- Uses `@import "tailwindcss"` in globals.css (v4 syntax)
- PostCSS plugin: `@tailwindcss/postcss`
- Custom CSS properties defined in `:root` for theming
- Dark mode support via `prefers-color-scheme`
- Font variables integrated with Tailwind through CSS custom properties

**CSS Architecture:**
- Global styles in `src/app/globals.css`
- CSS custom properties for theming (--background, --foreground)
- Geist fonts loaded via `next/font/google` and exposed as CSS variables

## Font System

The application uses Vercel's Geist font family:
- `Geist` (Sans) - Main UI font
- `Geist_Mono` - Monospace font for code
- Fonts are optimized through Next.js font system
- CSS variables: `--font-geist-sans`, `--font-geist-mono`

## TypeScript Configuration

**Path Aliases:**
- `@/*` resolves to `./src/*`
- Example: `import Component from '@/components/Component'`

**Build Target:**
- ES2017 for broad compatibility
- Strict mode enabled
- Next.js TypeScript plugin integrated

## Important Notes

**Next.js App Router:**
- This project uses App Router (not Pages Router)
- File-based routing in `src/app/` directory
- Server Components by default
- `layout.tsx` files for nested layouts
- `page.tsx` files for route pages

**Turbopack Integration:**
- Both dev and build commands use `--turbopack` flag
- Provides faster builds and hot reloading
- Some features may differ from standard Webpack builds

**ESLint Configuration:**
- Uses flat config format (.mjs file)
- Extends Next.js core web vitals and TypeScript rules
- Ignores build directories and generated files