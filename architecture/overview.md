# Architecture Overview

Strata is architected as an interconnected collection of modular, single-responsibility Rust crates. Every stage of the frontend execution lifecycle—from macro expansion to GPU pixel presentation—is implemented in safe, idiomatic Rust without external browser runtimes.

---

## The Execution Pipeline

```text
┌─────────────────────────────────────────────────────────────┐
│                    Strata Application                       │
│             (Components, RSX, Tailwind Classes)             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
   ┌─────────────────────────┐   ┌─────────────────────────┐
   │       strata_dom        │   │        strata_js        │
   │  (Reactive Signals DAG, │   │    (Dynamic Types,      │
   │    64-Byte UiIrNode)    │   │   Promises, Web APIs)   │
   └────────────┬────────────┘   └────────────┬────────────┘
                │                             │
                └──────────────┬──────────────┘
                               ▼
   ┌─────────────────────────────────────────────────────────┐
   │                      strata_style                       │
   │         (Tailwind JIT, 256-Bit SIMD Style Mask)         │
   └───────────────────────────┬─────────────────────────────┘
                               ▼
   ┌─────────────────────────────────────────────────────────┐
   │             strata_layout / strata_parallel             │
   │     (Chromium Parity Flexbox & Grid, Rayon Solver)      │
   └───────────────────────────┬─────────────────────────────┘
                               ▼
   ┌─────────────────────────────────────────────────────────┐
   │                      strata_render                      │
   │       (Display List, Stacking Context, Slug SDF)        │
   └───────────────────────────┬─────────────────────────────┘
                               │
    ┌──────────────┬───────────┼───────────┬──────────────┐
    ▼              ▼           ▼           ▼              ▼
┌────────┐    ┌────────┐  ┌────────┐  ┌────────┐     ┌────────┐
│ Desktop│    │ Mobile │  │  Web   │  │  Web   │     │Terminal│
│ macOS  │    │  iOS   │  │  WASM  │  │ Pure JS│     │  TUI   │
│ Win/Lin│    │ Android│  │ Canvas │  │  DOM   │     │  ANSI  │
└────────┘    └────────┘  └────────┘  └────────┘     └────────┘
```

---

## Crates Ecosystem

The workspace contains 25 specialized crates organized into cohesive layers:

### Core Framework & Declarative Syntax
- **`strata`**: Public umbrella crate providing prelude, runtime builder, and re-exports.
- **`strata_macro`**: Procedural macros (`rsx!`, `#[component]`, and compile-time utility validation).
- **`strata_dom`**: Reactive signals DAG, intermediate representation, and 64-byte `UiIrNode`.
- **`strata_style`**: CSS parser, cascade resolution, Tailwind JIT, and 256-bit SIMD style masks.
- **`strata_primitives`**: Mathematical primitives (vectors, matrices, rects, color spaces).

### Layout & Rendering Engine
- **`strata_layout`**: Spec-compliant Box Model, Flexbox (Level 1), and Grid (Level 2) solvers.
- **`strata_parallel`**: Rayon work-stealing parallel subtree solver based on containment axioms.
- **`strata_render`**: Hardware display lists, layer tree, Slug-tier GPU font rendering, and 3D `<Canvas3D>`.
- **`strata_gpu_path`**: Analytical GPU path engine for subpixel cubic Bezier curves without CPU tessellation.

### Platform Services & Runtime Abstraction
- **`strata_platform`**: Native windowing, frameless client-side decorations, Mica/Acrylic vibrancy, and display servers.
- **`strata-vfs`**: Universal virtual asynchronous filesystem (OPFS, XDG, app sandboxes).
- **`strata-storage`**: Pure-Rust Bitcask append-only write-ahead log (`StrataKV`) and biometric secure keystore.
- **`strata-device`**: OS Geolocation/GPS, hardware sensors, battery, thermals, safe area insets, and 120Hz ProMotion telemetry.
- **`strata-web-api`**: W3C Web Platform APIs (`fetch`, WebSockets, Geolocation, Clipboard, Streams).
- **`strata-audio`** (`strataui/audio`): Low-latency 3D spatial audio graph and DSP synthesis engine.

### Cross-Target Compilation & Tooling
- **`strata-tui`** (`strataui/tui`): Terminal compilation target with double-buffered delta ANSI and Sixel/Kitty graphics.
- **`strata-js` & `strata-codegen-js`** (`strataui/mica`): Pure-Rust ECMAScript runtime and zero-WASM JavaScript ESM codegen.
- **`strata-ui-cli`** (`strataui/cli`): CLI toolchain (`strata`), project wizard, built-in state-preserving HMR dev server, mobile simulator (`strata-sim`), and mobile test runner (`strata-mobile-test`).
- **`strata-devtools`**: In-process HUD, profiler, and Chrome DevTools Protocol (CDP) bridge.
- **`strata-hot-reload`**: Epoch-staged native dynamic reloading with `HmrCodec` reactive state preservation.
- **`strata-mcp`** (`strataui/mcp`): JSON-RPC 2.0 Model Context Protocol server for live app inspection and UI automation.
- **`strata-lsp`** (`strataui/vscode`): Full Language Server Protocol 3.17 server for editor integration.

### Ecosystem Products & C-FFI
- **`strata-a11y`**: AccessKit accessibility tree bridge for native screen-readers.
- **`strata-components`, `strata-icons`, `strata-aria`** (`strataui/components`): High-level UI component kit, 1,000+ vector icons, and accessible headless primitives.
- **`strata-editor`** (`strataui/editor`): Monaco-class interactive `<CodeEditorWidget>` and rich-text document engine.
- **`strata-earth`** (`strataui/earth`): 3D/2.5D/2D GPU planetary geospatial globe engine.
- **`strata-router`, `strata-i18n`, `strata-ui-store`, `strata-crdt`** (`strataui/kit`): Optional SPA routing, ICU i18n, global store, and CRDT sync.
- **`strata-web-reader`, `onyx-reader`, `onyx-browser`** (`strataui/onyx`): Zero-Chromium semantic web reader and native browser.
- **`strata-ffi`**: Production C ABI bindings (`include/strata.h`) for embedding Strata inside C/C++/Python/Swift applications.

---

## Memory Footprint & Cache Locality

Strata uses cache-aligned contiguous memory buffers rather than scattered heap allocations. All nodes in a component tree reside in cache-friendly arenas, ensuring CPU L1/L2 cache lines are saturated during layout passes. This architecture is the primary driver of Strata's sub-3MB resident memory footprint.
