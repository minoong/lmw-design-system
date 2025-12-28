import { Button } from '@lmw-design-system/components';
import { IconHome, IconSearch, IconClose } from '@lmw-design-system/icons';
import { useTheme } from '@lmw-design-system/themes';

function App() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div
      style={{
        padding: 'var(--ds-spacing-8)',
        fontFamily: 'var(--ds-font-family-sans)',
        backgroundColor: 'var(--ds-bg-primary)',
        color: 'var(--ds-fg-primary)',
        minHeight: '100vh',
      }}
    >
      <header style={{ marginBottom: 'var(--ds-spacing-8)' }}>
        <h1 className="ds-heading-2">Design System Playground</h1>
        <p className="ds-body-md" style={{ color: 'var(--ds-fg-secondary)' }}>
          Test and explore components in real-time
        </p>
      </header>

      <section style={{ marginBottom: 'var(--ds-spacing-8)' }}>
        <h2 className="ds-heading-4" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Theme
        </h2>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button variant={theme === 'light' ? 'primary' : 'ghost'} size="sm" onClick={() => setTheme('light')}>
            Light
          </Button>
          <Button variant={theme === 'dark' ? 'primary' : 'ghost'} size="sm" onClick={() => setTheme('dark')}>
            Dark
          </Button>
          <Button variant={theme === 'system' ? 'primary' : 'ghost'} size="sm" onClick={() => setTheme('system')}>
            System
          </Button>
        </div>
        <p className="ds-caption" style={{ marginTop: 'var(--ds-spacing-2)' }}>
          Current: {theme} (resolved: {resolvedTheme})
        </p>
      </section>

      <section style={{ marginBottom: 'var(--ds-spacing-8)' }}>
        <h2 className="ds-heading-4" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Button Variants
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--ds-spacing-8)' }}>
        <h2 className="ds-heading-4" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Button Sizes
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            alignItems: 'center',
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--ds-spacing-8)' }}>
        <h2 className="ds-heading-4" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Buttons with Icons
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
          }}
        >
          <Button variant="primary">
            <Button.Icon>
              <IconHome size={20} />
            </Button.Icon>
            <Button.Label>Home</Button.Label>
          </Button>
          <Button variant="secondary">
            <Button.Icon>
              <IconSearch size={20} />
            </Button.Icon>
            <Button.Label>Search</Button.Label>
          </Button>
          <Button variant="ghost" aria-label="Close">
            <Button.Icon>
              <IconClose size={20} />
            </Button.Icon>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="ds-heading-4" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Icons
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            alignItems: 'center',
          }}
        >
          <IconHome size={24} />
          <IconSearch size={24} />
          <IconClose size={24} />
        </div>
      </section>
    </div>
  );
}

export default App;
