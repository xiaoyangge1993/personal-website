I will restore the missing project files and implement the personal website with the requested 3D effects and animations.

## Project Restoration & Initialization
Since the project seems to have `node_modules` but is missing source files, I will first restore the essential configuration:
1.  **`package.json`**: Create with Next.js 16, React 19, Tailwind CSS, Framer Motion, Three.js, and other detected dependencies.
2.  **Configs**: Create `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, and `next.config.ts`.
3.  **Styles**: Create `app/globals.css` with Tailwind directives and custom 3D utilities.
4.  **Layout**: Create `app/layout.tsx` with font setup and metadata.

## Component Implementation
I will build the components with a focus on "clean, atmospheric" design and the requested specific 3D effects:

### 1. Header & Hero Section
*   **Header**: Sticky, backdrop-blur effect, transparent background (initially), Logo + Nav + Social Icons.
*   **Hero**:
    *   **Background**: Custom CSS Grid background.
    *   **Left**: Personal introduction with Framer Motion entrance.
    *   **Right**: **3D Floating Keyboard** using `React Three Fiber`. Keys will react to hover (press down effect).

### 2. Experience Section
*   **Left**: **3D Clock** using `React Three Fiber` or SVG with Framer Motion rotation (simpler and cleaner for this style).
*   **Right**: Vertical Timeline with "cool" entrance animations for each node.

### 3. Skills Section (3D Gallery)
*   **Implementation**: A 3D "Cover Flow" or Carousel effect using `Framer Motion` (transform perspective and rotateY).
*   **Content**: 5 Skill Cards (Name, Info, Progress Bar) that look like framed pictures.

### 4. Project Experience (Particles + Flip)
*   **Background**: Particle effect using `react-tsparticles`.
*   **Cards**: 6 cards with **3D Flip** effect (CSS `transform-style: preserve-3d`).
    *   **Front**: Image + Title + Desc.
    *   **Back**: Key highlights (bullet points).

### 5. Works Showcase (3D Perspective)
*   **Interaction**: Mouse-move parallax effect (cards tilt and follow cursor) using Framer Motion `useMotionValue`.
*   **Detail**: "Wire/String" connection to a floating link badge above the card.

### 6. Articles (3D Sway)
*   **Effect**: Gentle 3D floating/swaying animation that intensifies on hover.

### 7. Footer
*   Minimalist design with Copyright, Social Links, and a "Rocket" Back-to-Top button.

## Page Assembly
*   **`app/page.tsx`**: Assemble all sections in a single column layout.
*   **Scroll Parallax**: Add global scroll-linked animations (elements moving at different speeds) using `framer-motion`'s `useScroll`.

I will start by creating the configuration files to make the project runnable.