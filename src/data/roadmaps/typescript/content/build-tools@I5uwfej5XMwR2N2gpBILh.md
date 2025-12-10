# Build Tools

Automatically package and optimize your code for production using task runners and bundlers.

## What Are Build Tools?

Build tools do repetitive work automatically. Instead of doing these tasks manually, you set them up once and they run whenever you need them.

## What Do They Do?

Here are common tasks build tools automate:

- **Bundling** - Combine all your code files into optimized packages browsers can download
- **Compiling** - Convert TypeScript to JavaScript, SCSS to CSS, etc.
- **Minification** - Remove unnecessary characters to make files smaller and faster
- **Development server** - Run a local server while you develop so you can test immediately
- **Asset optimization** - Compress images and other files
- **Linting & formatting** - Run quality checks automatically

## Popular Build Tools

### Fast, Modern Tools (Recommended for New Projects)

#### Vite
- **Speed:** Extremely fast development and builds
- **Best for:** Modern web applications, React, Vue, Svelte projects
- **Why use it:** Fastest development experience available
- [@article@Vite Next Generation Frontend Tooling](https://vitejs.dev)

#### Esbuild
- **Speed:** Fastest JavaScript bundler available
- **Best for:** Libraries, quick builds, or when you need raw speed
- **Why use it:** Simple, incredibly fast, minimal configuration
- [@article@esbuild is an extremely fast JavaScript bundler and minifier](https://esbuild.github.io/)

#### SWC
- **Speed:** Super-fast compiler written in Rust
- **Best for:** High-performance builds, large projects
- **Why use it:** Written in Rust for maximum performance
- [@article@swc is a super-fast compiler written in Rust](https://swc.rs/)

### Established Tools

#### Webpack
- **Features:** Most powerful and flexible
- **Best for:** Complex applications with special build requirements
- **Why use it:** Can handle almost any build scenario
- [@article@webpack is a static module bundler for modern JavaScript applications](https://webpack.js.org/)

#### Rollup
- **Best for:** Building libraries and packages
- **Why use it:** Optimized for creating reusable code you'll distribute to others
- [@article@Rollup is a module bundler for JavaScript](https://rollupjs.org/guide/en/)

### Zero-Config Tools (Simplicity)

#### Parcel
- **Best for:** Simple projects where you don't want to think about configuration
- **Why use it:** Works out-of-the-box with minimal setup
- [@article@Parcel is a zero configuration build tool for the web](https://parceljs.org/)

#### tsup
- **Best for:** TypeScript libraries and packages
- **Why use it:** Handles TypeScript setup automatically, minimal config
- [@article@tsup is a zero-config TypeScript build tool](https://tsup.egoist.dev/)

#### tsdx
- **Best for:** Building TypeScript packages and CLI tools
- **Why use it:** Everything pre-configured for TypeScript package development
- [@article@tsdx is a zero-config CLI for TypeScript package development](https://tsdx.io/)

## How to Choose

### For Learning or Simple Projects
Use **Parcel** - it just works with zero configuration.

### For Modern Web Apps
Use **Vite** - fastest development experience, great defaults.

### For Building Libraries
Use **tsup** or **Rollup** - optimized for package distribution.

### For Complex Applications
Use **Webpack** - powerful, but more complex setup.

### For Maximum Speed
Use **Esbuild** or **SWC** - if you need the absolute fastest builds.

## Quick Comparison

| Tool | Speed | Setup | Best For |
|------|-------|-------|----------|
| Vite | ⚡⚡⚡ | Simple | Modern web apps |
| Esbuild | ⚡⚡⚡ | Simple | Speed-critical builds |
| Webpack | ⚡ | Complex | Complex apps |
| Parcel | ⚡⚡ | None | Simple projects |
| tsup | ⚡⚡⚡ | Minimal | TypeScript libraries |
| Rollup | ⚡⚡ | Medium | Library bundles |

## Getting Started

If you're just starting:
1. **Learning?** Use Parcel (zero config needed)
2. **Building a web app?** Use Vite (modern, fast, great tooling)
3. **Creating a library?** Use tsup (built for TypeScript libraries)

Most tools can convert later if your needs change—start simple, upgrade if needed.

- [@feed@Explore top posts about Tools](https://app.daily.dev/tags/tools?ref=roadmapsh)
