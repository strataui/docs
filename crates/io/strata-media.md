# strata-media (`crates/io/strata_media`)

`strata-media` is Strata's pure-Rust visual media capture and playback crate (`strata/crates/io/strata_media`), engineered with **zero C library dependencies** on Linux via direct `V4L2` `mmap` kernel `ioctl`s and pure-Rust pixel conversion.

---

## Key Subsystems

- **Color-Space Conversion (`pixel_format.rs`)**: Exact BT.601 conversions from `Yuyv422`, `Nv12`, `I420`, `Bgra8`, and `Rgb24` directly into `Rgba8` `VideoFrame` buffers and `strata_render::FrameBuffer`.
- **Camera Capture (`camera.rs`)**:
  - Native Linux V4L2 `/dev/video*` enumeration and zero-copy `mmap` frame streaming.
  - Deterministic `MockCameraSource` generating SMPTE color bars for headless CI and UI testing.
  - Reactive hooks: `use_cameras()` and `use_camera()`.
- **Screen & Window Capture (`screen_capture.rs`)**:
  - DRM `/sys/class/drm` monitor discovery, xdg-desktop-portal availability detection, and deterministic `MockScreenCapture`.
- **A/V-Synchronized Video Playback (`video_player.rs`)**:
  - `AvClock` master presentation clock with optional `audio-sync` feature locking video frames to `strata_audio::AudioPlayer`.
  - Extensible `VideoDecoder` trait + `FrameSequenceDecoder` + `VideoPlayer` wired into `<video>` elements via `strata::runtime::media_host::MediaHostRegistry`.

---

## Quick Example

```rust
use strata_media::{MockCameraSource, VideoFrame};

let mut cam = MockCameraSource::new(320, 240, 30);
let frame: VideoFrame = cam.next_frame();
let rgba_fb = frame.to_framebuffer();
assert_eq!(rgba_fb.width, 320);
assert_eq!(rgba_fb.height, 240);
```
