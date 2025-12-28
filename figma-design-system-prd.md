# PRD: Figma 디자인 시스템 자동화 파이프라인

## 문서 정보

| 항목       | 내용                           |
| ---------- | ------------------------------ |
| 프로젝트명 | Figma Design System Automation |
| 버전       | 1.0.0                          |
| 작성일     | 2025-01-XX                     |
| 작성자     | Frontend Team                  |
| 상태       | Draft                          |

---

## 1. 개요

### 1.1 배경

디자인팀이 Figma에서 관리하는 디자인 시스템을 프론트엔드 코드로 변환하는 과정에서 수동 작업으로 인한 불일치, 지연, 휴먼 에러가 발생하고 있다. 이를 해결하기 위해 Figma → 코드 자동화 파이프라인을 구축한다.

### 1.2 목표

1. **자동화**: Figma 디자인 변경이 코드에 자동 반영되는 파이프라인 구축
2. **일관성**: 디자인 토큰, 컴포넌트의 Single Source of Truth 확립
3. **생산성**: 반복 작업 제거로 개발자/디자이너 생산성 향상
4. **유연성**: CI/CD 자동화 + 대화형(MCP) 두 가지 워크플로우 지원

### 1.3 범위

**In Scope:**

- Turborepo 기반 모노레포 구축
- Figma Variables → 디자인 토큰 자동 생성
- Figma Styles → 타이포그래피 시스템 추출
- Figma Components → 아이콘 SVG 내보내기
- CI/CD 자동 동기화 파이프라인
- Claude.ai Figma MCP를 활용한 대화형 워크플로우

**Out of Scope:**

- Figma 컴포넌트 → React 컴포넌트 완전 자동 변환 (1차 버전)
- Custom MCP 서버 구축 (필요시 2차 버전에서 검토)
- 디자인 리뷰 자동화

---

## 2. 기술 스택

### 2.1 Core Technologies

| 영역                | 기술                | 버전        | 비고                  |
| ------------------- | ------------------- | ----------- | --------------------- |
| **Monorepo**        | Turborepo           | latest      | 빌드 오케스트레이션   |
| **Package Manager** | pnpm                | 9.x         | workspace 관리        |
| **Versioning**      | Changesets          | 2.x         | 버전/changelog 자동화 |
| **Bundler**         | Vite (library mode) | 6.x         | 패키지 빌드           |
| **Language**        | TypeScript          | 5.x         | 타입 안전성           |
| **UI Framework**    | React               | 18.x / 19.x | 컴포넌트 개발         |

### 2.2 Design System Integration

| 영역              | 기술                  | 용도                               |
| ----------------- | --------------------- | ---------------------------------- |
| **Design Source** | Figma (Professional)  | 디자인 시스템 원본                 |
| **API**           | Figma REST API        | Variables, Styles, Components 추출 |
| **대화형 연동**   | Claude.ai + Figma MCP | 실시간 분석/코드 생성              |

### 2.3 Component Architecture

| 패턴                    | 참조                | 설명                    |
| ----------------------- | ------------------- | ----------------------- |
| **Compound Components** | Radix UI Primitives | Root + Context 패턴     |
| **Headless UI**         | Radix UI Primitives | 스타일 없는 동작만 제공 |
| **asChild Pattern**     | Radix Composition   | 렌더링 위임             |
| **Data Attributes**     | Radix Styling Guide | 상태 기반 스타일링      |

---

## 3. 시스템 아키텍처

### 3.1 전체 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Figma (Design Team)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Variables  │  │   Styles    │  │ Components  │  │    Icons    │ │
│  │   (토큰)    │  │  (타이포)   │  │  (버튼 등)  │  │    (SVG)    │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
└─────────┼────────────────┼────────────────┼────────────────┼────────┘
          │                │                │                │
          ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Automation Layer                                │
│                                                                      │
│  ┌────────────────────────┐      ┌────────────────────────┐         │
│  │    CI/CD Pipeline      │      │   Claude.ai + MCP      │         │
│  │    (GitHub Actions)    │      │     (대화형)           │         │
│  │                        │      │                        │         │
│  │  • 스케줄 동기화       │      │  • 실시간 분석         │         │
│  │  • PR 자동 생성        │      │  • 개별 컴포넌트 추출  │         │
│  │  • 변경 감지           │      │  • 즉시 코드 생성      │         │
│  └────────────────────────┘      └────────────────────────┘         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Design System Monorepo (Turborepo + pnpm)              │
│                                                                      │
│  packages/                                                           │
│  ├── tokens/              ← 🤖 자동 생성 (generated/)               │
│  ├── typography/          ← 🤖 자동 생성                            │
│  ├── icons/               ← 🤖 자동 생성 (SVG → React)              │
│  ├── primitives/          ← 👨‍💻 개발자 작성 (Headless)              │
│  ├── components/          ← 👨‍💻 개발자 작성 (Styled)                │
│  └── themes/              ← 🤖 + 👨‍💻 혼합                           │
│                                                                      │
│  apps/                                                               │
│  ├── storybook/           ← 문서화                                  │
│  └── playground/          ← 개발/테스트                             │
│                                                                      │
│  tools/                                                              │
│  └── figma-sync/          ← Figma API 연동 스크립트                 │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 디렉토리 구조

```
design-system/
├── .changeset/
│   └── config.json
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── figma-sync.yml
│       └── release.yml
├── apps/
│   ├── storybook/
│   │   ├── .storybook/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── playground/
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── packages/
│   ├── tokens/
│   │   ├── generated/          # 🤖 자동 생성 (수동 수정 금지)
│   │   │   ├── colors.css
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── .sync-metadata.json
│   │   ├── src/
│   │   │   ├── index.ts        # re-export
│   │   │   └── utils.ts        # 유틸리티
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── typography/
│   │   ├── generated/
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── icons/
│   │   ├── generated/          # 🤖 SVG → React 컴포넌트
│   │   │   ├── IconHome.tsx
│   │   │   ├── IconSearch.tsx
│   │   │   └── index.ts
│   │   ├── src/
│   │   │   ├── Icon.tsx        # Base Icon 컴포넌트
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── primitives/             # 👨‍💻 Headless 컴포넌트
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── ButtonContext.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Dialog/
│   │   │   ├── Select/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── components/             # 👨‍💻 Styled 컴포넌트
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.styles.ts
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── themes/
│       ├── generated/
│       │   ├── light.css
│       │   └── dark.css
│       ├── src/
│       │   ├── ThemeProvider.tsx
│       │   └── index.ts
│       ├── package.json
│       └── vite.config.ts
├── tools/
│   └── figma-sync/
│       ├── src/
│       │   ├── api/
│       │   │   ├── client.ts
│       │   │   └── types.ts
│       │   ├── parsers/
│       │   │   ├── variables.parser.ts
│       │   │   ├── typography.parser.ts
│       │   │   └── icons.parser.ts
│       │   ├── generators/
│       │   │   ├── css.generator.ts
│       │   │   ├── typescript.generator.ts
│       │   │   └── react-icon.generator.ts
│       │   ├── config.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
└── figma.config.json
```

---

## 4. 패키지 설계

### 4.1 패키지 의존성 그래프

```
                    ┌─────────┐
                    │ tokens  │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │typography │   │   icons   │   │  themes   │
   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
                  ┌────────────┐
                  │ primitives │
                  └──────┬─────┘
                         │
                         ▼
                  ┌────────────┐
                  │ components │
                  └──────┬─────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   ┌───────────┐   ┌───────────┐   ┌───────────┐
   │ storybook │   │playground │   │  (apps)   │
   └───────────┘   └───────────┘   └───────────┘
```

### 4.2 패키지별 상세

#### 4.2.1 `@design-system/tokens`

**목적**: Figma Variables를 CSS/JS 토큰으로 변환

**출력 포맷:**

- CSS Custom Properties (런타임 테마 전환)
- TypeScript 상수 (타입 안전성)
- JSON (다른 플랫폼 공유)

**토큰 계층:**

```
primitive/          # 원시 값 (blue-500: #3B82F6)
semantic/           # 의미 기반 (primary: blue-500)
component/          # 컴포넌트별 (button-bg: primary)
```

#### 4.2.2 `@design-system/primitives`

**목적**: Radix UI 패턴 기반 Headless 컴포넌트

**설계 원칙:**

- Compound Component 패턴
- Context를 통한 상태 공유
- asChild prop으로 렌더링 위임
- data-\* 속성으로 상태 노출
- WAI-ARIA 완전 준수

**컴포넌트 구조 예시:**

```tsx
// Button Primitive
<Button.Root>
  <Button.Icon />
  <Button.Label />
</Button.Root>

// Dialog Primitive
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

#### 4.2.3 `@design-system/components`

**목적**: Primitives + Tokens = Styled 컴포넌트

**설계 원칙:**

- Primitives 기반 구현
- Tokens 참조로 스타일링
- Variants (size, color, state)
- Storybook 문서화 포함

---

## 5. 워크플로우

### 5.1 자동화 워크플로우 (CI/CD)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CI/CD 자동 동기화 플로우                       │
└─────────────────────────────────────────────────────────────────┘

 [Figma 변경]
      │
      ▼
 ┌─────────────────┐
 │  Trigger 방식   │
 │  • 스케줄 (매일)│
 │  • 수동 트리거  │
 │  • Webhook*     │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ GitHub Actions  │
 │ figma-sync.yml  │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Figma API 호출  │
 │ • Variables     │
 │ • Styles        │
 │ • Icons         │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐     ┌─────────────────┐
 │ 변경 감지       │────▶│ 변경 없음       │──▶ [종료]
 │ (Hash 비교)     │     │                 │
 └────────┬────────┘     └─────────────────┘
          │
          │ 변경 있음
          ▼
 ┌─────────────────┐
 │ 코드 생성       │
 │ generated/      │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ PR 자동 생성    │
 │ + Changeset     │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ 개발자 리뷰     │
 │ & 머지          │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Release 워크플로│
 │ (Changesets)    │
 └─────────────────┘
```

### 5.2 대화형 워크플로우 (MCP)

```
┌─────────────────────────────────────────────────────────────────┐
│                  대화형 (Claude.ai + Figma MCP)                  │
└─────────────────────────────────────────────────────────────────┘

 [개발자]
    │
    │ "이 Figma 프레임 분석해줘" + 링크
    ▼
 ┌─────────────────┐
 │   Claude.ai     │
 │   (Figma MCP)   │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Figma 데이터    │
 │ Fetch & 분석    │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ 분석 결과 제공  │
 │ • 구조 분석     │
 │ • Variants 파악 │
 │ • 토큰 추출     │
 └────────┬────────┘
          │
          │ "React로 만들어줘"
          ▼
 ┌─────────────────┐
 │ 코드 생성       │
 └────────┬────────┘
          │
          ▼
 [개발자가 복사 → 프로젝트에 적용]
```

### 5.3 두 워크플로우 통합

**핵심 원칙: generated/ 디렉토리 분리**

```
packages/tokens/
├── generated/          ← 🤖 자동 생성 전용 (수동 수정 금지)
│   ├── colors.css
│   ├── colors.ts
│   └── .sync-metadata.json
└── src/
    ├── index.ts        ← 👨‍💻 개발자 관리 (re-export, 확장)
    └── utils.ts
```

**충돌 방지 메커니즘:**

1. **Hash 기반 변경 감지**
   - Figma 데이터 해시 계산
   - 로컬 메타데이터와 비교
   - 동일하면 스킵

2. **Git Hook으로 수동 수정 방지**

   ```bash
   # pre-commit hook
   if [[ -n $(git diff --cached --name-only | grep "generated/") ]]; then
     warn "generated/ 폴더는 자동 생성됩니다"
   fi
   ```

3. **파일 헤더로 자동 생성 표시**
   ```typescript
   /**
    * 🤖 AUTO-GENERATED FILE - DO NOT EDIT
    * Source: Figma Design System
    * Generated: 2025-01-15T09:00:00Z
    */
   ```

---

## 6. 구현 상세

### 6.1 Turborepo 설정

**turbo.json:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "build:tokens": {
      "outputs": ["generated/**"],
      "inputs": ["figma.config.json"]
    },
    "sync:figma": {
      "cache": false
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "storybook": {
      "dependsOn": ["^build"],
      "persistent": true
    }
  }
}
```

### 6.2 pnpm Workspace 설정

**pnpm-workspace.yaml:**

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
```

**Root package.json:**

```json
{
  "name": "design-system",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "sync:figma": "turbo run sync:figma",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "pnpm build && changeset publish",
    "storybook": "turbo run storybook --filter=@design-system/storybook"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "turbo": "^2.0.0",
    "typescript": "^5.4.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

### 6.3 Changesets 설정

**.changeset/config.json:**

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": ["@changesets/changelog-github", { "repo": "org/design-system" }],
  "commit": false,
  "fixed": [],
  "linked": [["@design-system/*"]],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@design-system/storybook", "@design-system/playground"]
}
```

### 6.4 Vite Library Mode 설정

**packages/tokens/vite.config.ts:**

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemTokens',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [],
    },
  },
});
```

**packages/components/vite.config.ts:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### 6.5 Figma Sync 설정

**figma.config.json:**

```json
{
  "figmaFileKey": "YOUR_FIGMA_FILE_KEY",
  "packages": {
    "tokens": "./packages/tokens/generated",
    "typography": "./packages/typography/generated",
    "icons": "./packages/icons/generated",
    "themes": "./packages/themes/generated"
  },
  "sync": {
    "variables": true,
    "typography": true,
    "icons": true
  },
  "naming": {
    "prefix": "ds",
    "caseStyle": "kebab"
  },
  "icons": {
    "componentPrefix": "icon/",
    "format": "svg",
    "optimizeSvg": true
  }
}
```

---

## 7. CI/CD 파이프라인

### 7.1 Figma Sync Workflow

**.github/workflows/figma-sync.yml:**

````yaml
name: Figma Design System Sync

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * 1-5' # 평일 오전 9시 (KST)

env:
  FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Sync from Figma
        run: pnpm turbo run sync:figma

      - name: Check for changes
        id: changes
        run: |
          if [[ -n $(git status --porcelain packages/*/generated) ]]; then
            echo "changed=true" >> $GITHUB_OUTPUT
          else
            echo "changed=false" >> $GITHUB_OUTPUT
          fi

      - name: Build affected packages
        if: steps.changes.outputs.changed == 'true'
        run: pnpm turbo run build --filter='./packages/*'

      - name: Create changeset
        if: steps.changes.outputs.changed == 'true'
        run: |
          cat > .changeset/figma-sync-$(date +%s).md << EOF
          ---
          "@design-system/tokens": patch
          ---

          chore: sync design tokens from Figma
          EOF

      - name: Create Pull Request
        if: steps.changes.outputs.changed == 'true'
        uses: peter-evans/create-pull-request@v6
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: 'chore(tokens): sync design tokens from Figma'
          title: '🎨 Design System Sync'
          body: |
            ## Auto-generated from Figma

            This PR contains updated design tokens synced from Figma.

            ### Changed Files
            ```
            $(git status --porcelain packages/*/generated)
            ```
          branch: design-sync/auto-update
          delete-branch: true
          labels: |
            design-system
            auto-generated
````

### 7.2 Release Workflow

**.github/workflows/release.yml:**

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo run build
      - run: pnpm turbo run test

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm release
          version: pnpm changeset version
          title: 'chore: release packages'
          commit: 'chore: release packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 8. 컴포넌트 아키텍처 (Radix 패턴)

### 8.1 Compound Component 패턴

```tsx
// packages/primitives/src/Button/Button.tsx

import * as React from 'react';
import { createContext, useContext } from 'react';

// Context
interface ButtonContextValue {
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
}

const ButtonContext = createContext<ButtonContextValue | null>(null);

function useButtonContext() {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('Button compound components must be used within Button.Root');
  }
  return context;
}

// Root
interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(({ children, disabled = false, size = 'md', asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <ButtonContext.Provider value={{ disabled, size }}>
      <Comp ref={ref} disabled={disabled} data-disabled={disabled ? '' : undefined} data-size={size} {...props}>
        {children}
      </Comp>
    </ButtonContext.Provider>
  );
});

// Icon
interface ButtonIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(({ children, asChild, ...props }, ref) => {
  const { size } = useButtonContext();
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp ref={ref} data-size={size} {...props}>
      {children}
    </Comp>
  );
});

// Export
export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
};
```

### 8.2 asChild 패턴 (Slot)

```tsx
// packages/primitives/src/utils/Slot.tsx

import * as React from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    ...props,
    ...children.props,
    ref: ref ? composeRefs(ref, (children as any).ref) : (children as any).ref,
  });
});

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}
```

### 8.3 Styled Component (tokens 참조)

```tsx
// packages/components/src/Button/Button.tsx

import { Button as ButtonPrimitive } from '@design-system/primitives';
import { colorVars, spacingVars } from '@design-system/tokens';
import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof ButtonPrimitive.Root> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', className, ...props }, ref) => {
  return <ButtonPrimitive.Root ref={ref} className={`${styles.button} ${styles[variant]} ${className}`} {...props} />;
});
```

```css
/* packages/components/src/Button/Button.module.css */

.button {
  padding: var(--ds-spacing-sm) var(--ds-spacing-md);
  border-radius: var(--ds-radius-md);
  font-family: var(--ds-font-family-sans);
  font-weight: var(--ds-font-weight-medium);
  transition: all 0.2s ease;
}

.button[data-size='sm'] {
  padding: var(--ds-spacing-xs) var(--ds-spacing-sm);
  font-size: var(--ds-font-size-sm);
}

.button[data-size='lg'] {
  padding: var(--ds-spacing-md) var(--ds-spacing-lg);
  font-size: var(--ds-font-size-lg);
}

.primary {
  background-color: var(--ds-color-primary-500);
  color: var(--ds-color-white);
}

.primary:hover:not([data-disabled]) {
  background-color: var(--ds-color-primary-600);
}

.primary[data-disabled] {
  background-color: var(--ds-color-gray-300);
  cursor: not-allowed;
}

.secondary {
  background-color: transparent;
  color: var(--ds-color-primary-500);
  border: 1px solid var(--ds-color-primary-500);
}

.ghost {
  background-color: transparent;
  color: var(--ds-color-gray-700);
}
```

---

## 9. 마일스톤

### Phase 1: 기반 구축 (2주)

| 태스크          | 설명                         | 담당 |
| --------------- | ---------------------------- | ---- |
| Turborepo 세팅  | 모노레포 초기 구조           | FE   |
| pnpm workspace  | 패키지 의존성 설정           | FE   |
| Changesets 설정 | 버전 관리 자동화             | FE   |
| Vite 빌드 설정  | 패키지별 빌드 구성           | FE   |
| CI/CD 기본      | lint, test, build 파이프라인 | FE   |

### Phase 2: Figma 연동 (2주)

| 태스크               | 설명                 | 담당 |
| -------------------- | -------------------- | ---- |
| Figma API 클라이언트 | REST API 래퍼        | FE   |
| Variables Parser     | 토큰 변환 로직       | FE   |
| CSS Generator        | CSS Variables 생성   | FE   |
| TS Generator         | TypeScript 상수 생성 | FE   |
| Icon Exporter        | SVG → React 컴포넌트 | FE   |
| Sync Workflow        | GitHub Actions 설정  | FE   |

### Phase 3: 컴포넌트 개발 (4주)

| 태스크            | 설명                         | 담당 |
| ----------------- | ---------------------------- | ---- |
| Primitives 설계   | Compound Component 기반 구조 | FE   |
| Button Primitive  | 기본 버튼 컴포넌트           | FE   |
| Dialog Primitive  | 모달/다이얼로그              | FE   |
| Select Primitive  | 셀렉트박스                   | FE   |
| Styled Components | Primitives + Tokens          | FE   |
| Storybook 문서화  | 컴포넌트 문서                | FE   |

### Phase 4: 안정화 (2주)

| 태스크      | 설명                      | 담당 |
| ----------- | ------------------------- | ---- |
| E2E 테스트  | 주요 시나리오 테스트      | FE   |
| 성능 최적화 | 번들 사이즈, 트리쉐이킹   | FE   |
| 문서화      | 사용 가이드, Contributing | FE   |
| Pilot 적용  | 실제 프로젝트 적용        | FE   |

---

## 10. 성공 지표

| 지표               | 목표          | 측정 방법        |
| ------------------ | ------------- | ---------------- |
| 토큰 동기화 시간   | < 5분         | CI/CD 실행 시간  |
| 디자인-코드 불일치 | 0건           | QA 리포트        |
| 컴포넌트 재사용률  | > 80%         | 코드 분석        |
| 번들 사이즈        | < 50KB (core) | Bundlesize       |
| Storybook 커버리지 | 100%          | 컴포넌트 수 대비 |

---

## 11. 리스크 및 대응

| 리스크           | 영향          | 대응 방안                    |
| ---------------- | ------------- | ---------------------------- |
| Figma API 변경   | 동기화 실패   | 버전 고정, 모니터링 알림     |
| 토큰 충돌        | 스타일 불일치 | Hash 기반 검증, PR 리뷰 필수 |
| 번들 사이즈 증가 | 성능 저하     | 트리쉐이킹, 청크 분리        |
| Breaking Change  | 앱 빌드 실패  | Changesets, Semver 준수      |

---

## 12. 부록

### A. 참고 자료

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Changesets](https://github.com/changesets/changesets)
- [Vite Library Mode](https://ko.vite.dev/config/build-options)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Figma REST API](https://www.figma.com/developers/api)

### B. 용어 정의

| 용어               | 정의                                                    |
| ------------------ | ------------------------------------------------------- |
| Design Token       | 디자인 의사결정을 코드화한 값 (색상, 스페이싱 등)       |
| Primitive          | 스타일 없이 동작만 제공하는 Headless 컴포넌트           |
| Compound Component | 여러 하위 컴포넌트가 Context로 연결된 패턴              |
| asChild            | 자식 요소에 props를 전달하는 렌더링 위임 패턴           |
| MCP                | Model Context Protocol - AI와 외부 시스템 연동 프로토콜 |

### C. 관련 문서

- 디자인 시스템 스타일 가이드 (Figma)
- 프론트엔드 코딩 컨벤션
- Git 브랜치 전략
