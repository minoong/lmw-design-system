# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                              # Run all apps
pnpm dev --filter=web                 # Web app (port 3000)
pnpm dev --filter=docs                # Docs app (port 3001)
pnpm dev --filter=@lmw-design-system/playground  # Playground (port 5173)

# Storybook
pnpm storybook                        # Run Storybook (port 6006)

# Build
pnpm build                            # Build all packages
pnpm build --filter=@lmw-design-system/components

# Lint and Type Check
pnpm lint
pnpm check-types
pnpm format

# Figma Sync
pnpm sync:figma                       # Sync design tokens from Figma

# Changesets (Versioning)
pnpm changeset                        # Create a changeset
pnpm version                          # Update versions
pnpm release                          # Publish packages
```

## Architecture

Turborepo monorepo with pnpm workspaces. Node.js 18+ required.

### Package Structure

```
packages/
├── tokens/         (@lmw-design-system/tokens)      - Design tokens (colors, spacing, radius)
├── typography/     (@lmw-design-system/typography)  - Font system
├── icons/          (@lmw-design-system/icons)       - React icon components
├── themes/         (@lmw-design-system/themes)      - ThemeProvider, light/dark CSS
├── primitives/     (@lmw-design-system/primitives)  - Headless components (Radix patterns)
├── components/     (@lmw-design-system/components)  - Styled components
├── eslint-config/  (@repo/eslint-config)            - Shared ESLint config
└── typescript-config/ (@repo/typescript-config)    - Shared TS configs

apps/
├── web/            - Next.js 16 app (port 3000)
├── docs/           - Next.js 16 docs (port 3001)
├── storybook/      - Component documentation
└── playground/     - Development environment

tools/
└── figma-sync/     - Figma API integration
```

### Package Dependency Graph

```
tokens → typography → themes
    ↓         ↓         ↓
    └─────────┴─────────┘
              ↓
         primitives
              ↓
         components
              ↓
    storybook / playground / apps
```

### Component Architecture (Radix Patterns)

**Primitives** - Headless compound components:

```tsx
<Button.Root size="md">
  <Button.Icon>
    <IconHome />
  </Button.Icon>
  <Button.Label>Home</Button.Label>
</Button.Root>
```

**Components** - Styled versions using primitives + tokens:

```tsx
<Button variant="primary" size="md">
  Click me
</Button>
```

Key patterns:

- `asChild` prop for render delegation (Slot pattern)
- `data-*` attributes for state-based styling
- Context for state sharing between compound parts

### Generated Files

Files in `packages/*/generated/` are auto-generated from Figma. Do not edit manually.

Header indicates auto-generation:

```typescript
/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Source: Figma Design System
 */
```

### SCSS / Styling

Design tokens are exposed as SCSS files with CSS custom properties:

```scss
// Import design system styles in your app
@use '@lmw-design-system/tokens/scss';
@use '@lmw-design-system/typography/scss';
@use '@lmw-design-system/themes/scss/light';
@use '@lmw-design-system/themes/scss/dark'; // optional
@use '@lmw-design-system/components/css';
```

**Token Variables:**

```scss
--ds-color-primary-500
--ds-spacing-md
--ds-radius-lg
--ds-font-size-lg
```

**Theme Variables:**

```scss
--ds-bg-primary
--ds-fg-primary
--ds-interactive-primary
```

**Typography Mixins:**

```scss
@use '@lmw-design-system/typography/scss' as typography;

.custom-heading {
  @include typography.heading-base;
  font-size: var(--ds-font-size-2xl);
}
```

### Key Dependencies

- React 19, Next.js 16
- TypeScript 5.9
- Vite 6 (library builds)
- Storybook 8
- Changesets (versioning)
