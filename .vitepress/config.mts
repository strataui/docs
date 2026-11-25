import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Strata',
  description: 'The High-Performance, Pure Rust Universal Frontend Engine',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    math: true
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#08090a' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Strata | Zero-Chromium Pure Rust Universal Frontend Engine' }],
    ['meta', { property: 'og:description', content: 'Zero Chromium. Pixel-perfect CSS & Flexbox/Grid emulation. React/TSX-grade ergonomics. Native 120 FPS GPU rendering across Desktop, Mobile, Web, and Terminal.' }],
    ['meta', { property: 'og:url', content: 'https://strata.larvance.com' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@larvance' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Strata',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'Ecosystem', link: '/ecosystem/developer-tools' },
      { text: 'Crates', link: '/crates/core/strata' },
      { text: 'Harnesses', link: '/harnesses/strata-mobile-test' },
      { text: 'Benchmarks', link: '/benchmarks/scorecard' },
      { text: 'Showcase', link: '/showcase/examples' },
      {
        text: 'v0.1.0',
        items: [
          { text: 'GitHub Organization', link: 'https://github.com/strataui' },
          { text: 'Core Repository', link: 'https://github.com/strataui/strata' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'CLI Toolchain', link: '/guide/cli' }
          ]
        },
        {
          text: 'Framework Concepts',
          items: [
            { text: 'Components & RSX', link: '/guide/components' },
            { text: 'Tailwind CSS JIT', link: '/guide/styling' },
            { text: 'Reactive Signals', link: '/guide/signals' }
          ]
        }
      ],
      '/architecture/': [
        {
          text: 'Core Architecture',
          items: [
            { text: 'System Topology', link: '/architecture/overview' },
            { text: 'Primitives & Memory', link: '/architecture/primitives-and-memory' },
            { text: 'DOM & UiIrNode', link: '/architecture/dom-and-ir' },
            { text: 'Layout Engine', link: '/architecture/layout-engine' },
            { text: 'GPU & SDF Rendering', link: '/architecture/rendering-and-gpu' },
            { text: 'Parallel Reconciliation', link: '/architecture/parallel-engine' },
            { text: 'Virtual FS & Storage', link: '/architecture/virtual-fs-storage' },
            { text: 'Terminal (TUI) Target', link: '/architecture/tui-target' },
            { text: 'Dual Web Compilation', link: '/architecture/dual-web' }
          ]
        }
      ],
      '/ecosystem/': [
        {
          text: 'Developer Ecosystem',
          items: [
            { text: 'DevTools & CDP Bridge', link: '/ecosystem/developer-tools' },
            { text: 'Language Server (LSP)', link: '/ecosystem/lsp-and-editor' },
            { text: 'Mobile & Simulator', link: '/ecosystem/mobile-and-simulator' },
            { text: 'C-FFI & Embedding', link: '/ecosystem/plugins-and-ffi' }
          ]
        }
      ],
      '/crates/': [
        {
          text: 'Core Primitives & Engine (strataui/strata)',
          items: [
            { text: 'strata-ui', link: '/crates/core/strata' },
            { text: 'strata-primitives', link: '/crates/core/strata-primitives' },
            { text: 'strata-macro', link: '/crates/core/strata-macro' },
            { text: 'strata-dom', link: '/crates/core/strata-dom' },
            { text: 'strata-style', link: '/crates/core/strata-style' },
            { text: 'strata-layout', link: '/crates/core/strata-layout' },
            { text: 'strata-a11y', link: '/crates/ui/strata-a11y' }
          ]
        },
        {
          text: 'Graphics, Rendering & Native Platform',
          items: [
            { text: 'strata-render', link: '/crates/render/strata-render' },
            { text: 'strata-ui-platform', link: '/crates/render/strata-platform' },
            { text: 'strata-gpu-path', link: '/crates/render/strata-gpu-path' },
            { text: 'strata-tui (strataui/tui)', link: '/crates/render/strata-tui' },
            { text: 'strata-audio (strataui/audio)', link: '/crates/render/strata-audio' }
          ]
        },
        {
          text: 'Runtime Systems, Mica & Onyx',
          items: [
            { text: 'strata-vfs', link: '/crates/runtime/strata-vfs' },
            { text: 'strata-storage', link: '/crates/runtime/strata-storage' },
            { text: 'strata-device', link: '/crates/runtime/strata-device' },
            { text: 'strata-web-api', link: '/crates/runtime/strata-web-api' },
            { text: 'strata-parallel', link: '/crates/runtime/strata-parallel' },
            { text: 'strata-ffi', link: '/crates/state/strata-ffi' },
            { text: 'strata-js (strataui/mica)', link: '/crates/runtime/strata-js' },
            { text: 'strata-codegen-js (strataui/mica)', link: '/crates/runtime/strata-codegen-js' },
            { text: 'strata-web-reader (strataui/onyx)', link: '/crates/runtime/strata-web-reader' }
          ]
        },
        {
          text: 'UI Components, Editor & App Kit',
          items: [
            { text: 'strata-components (strataui/components)', link: '/crates/ui/strata-ui' },
            { text: 'strata-icons (strataui/components)', link: '/crates/ui/strata-icons' },
            { text: 'strata-aria (strataui/components)', link: '/crates/core/strata-aria' },
            { text: 'strata-editor (strataui/editor)', link: '/crates/ui/strata-editor' },
            { text: 'strata-router (strataui/kit)', link: '/crates/state/strata-router' },
            { text: 'strata-i18n (strataui/kit)', link: '/crates/ui/strata-i18n' },
            { text: 'strata-ui-store (strataui/kit)', link: '/crates/state/strata-store' },
            { text: 'strata-crdt (strataui/kit)', link: '/crates/state/strata-crdt' }
          ]
        },
        {
          text: 'Developer Tooling Crates',
          items: [
            { text: 'strata-ui-cli (strataui/cli)', link: '/crates/tooling/strata-cli' },
            { text: 'strata-devtools', link: '/crates/tooling/strata-devtools' },
            { text: 'strata-hot-reload', link: '/crates/tooling/strata-hot-reload' },
            { text: 'strata-lsp (strataui/vscode)', link: '/crates/tooling/strata-lsp' }
          ]
        }
      ],
      '/harnesses/': [
        {
          text: 'Testing & Harnesses',
          items: [
            { text: 'Headless Mobile Test', link: '/harnesses/strata-mobile-test' },
            { text: 'Virtual Device Simulator', link: '/harnesses/strata-sim' },
            { text: 'Tauri Visual Parity (Internal)', link: '/harnesses/strata-parity-tauri' }
          ]
        }
      ],
      '/benchmarks/': [
        {
          text: 'Performance Verification',
          items: [
            { text: 'Technical Scorecard', link: '/benchmarks/scorecard' },
            { text: 'Comparative Analysis', link: '/benchmarks/comparative-analysis' }
          ]
        }
      ],
      '/showcase/': [
        {
          text: 'Flagship Examples',
          items: [
            { text: 'Showcase Gallery', link: '/showcase/examples' },
            { text: 'EDA & Circuit Studio', link: '/showcase/eda-studio' },
            { text: 'SaaS Telemetry Dashboard', link: '/showcase/saas-dashboard' },
            { text: 'Creative Vector Studio', link: '/showcase/creative-studio' },
            { text: 'Apex E-Commerce Storefront', link: '/showcase/ecommerce-storefront' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/larvance/strata' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Zero Chromium. Pure Rust. Native 120 FPS.',
      copyright: 'Copyright (c) 2026 larvance'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page'
    }
  }
});
