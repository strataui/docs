# Strata Documentation

Interactive documentation, mdBook architectural guides, live component gallery, and WebAssembly playground for Strata.

## Overview

This repository hosts the official documentation, architectural guides, interactive component gallery, and mdBook preprocessing tooling for Strata.

## Documentation Structure

- `architecture/`: Architectural deep dives into subpixel CSS layout, GPU compositing, reactive signals, and memory safety.
- `benchmarks/`: Empirical performance benchmarks across cold boot latency, memory footprint, layout throughput, and binary sizes.
- `crates/`: Crate-by-crate API documentation and design guidelines.
- `guide/`: Getting started guides, component authoring, and platform deployment instructions.
- `ecosystem/`: Companion tools, CLI workflows, and editor extensions.
- `showcase/`: Real-world application showcases and interactive demos.
- `mdbook/`: The `mdbook-strata` preprocessor that compiles RSX code snippets into live, interactive WebAssembly widgets within mdBook chapters.

## Verification & Testing

```bash
cargo check --workspace --all-targets
cargo test --workspace
```

## License

Licensed under the MIT License. See [LICENSE](file:///home/usr/Projects/strataui/docs/LICENSE) for details.
