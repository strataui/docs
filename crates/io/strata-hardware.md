# strata-hardware (`crates/io/strata_hardware`)

`strata-hardware` provides zero-C-dependency peripheral, controller, haptic, and low-level hardware bus I/O for Strata applications (`strata/crates/io/strata_hardware`).

---

## Key Subsystems

- **Gamepad & HOTAS Input (`gamepad.rs`)**:
  - Direct Linux `evdev` (`/dev/input/event*`) kernel `ioctl` driver with capability discovery, dual-stick/HOTAS axis normalization, configurable axial & radial deadzones, force-feedback rumble, deterministic `MockGamepadController`, and reactive `use_gamepads()` hook.
- **Unified Haptics (`haptics.rs`)**:
  - `HapticsEngine`, semantic `HapticPattern` presets (`LightTap`, `MediumImpact`, `HeavyImpact`, `SelectionTick`, `Success`, `Warning`, `Error`, `CustomWaveform`), and `MockHapticsSink` for testing.
- **Serial / UART Bus (`serial.rs`)**:
  - Pure-Rust Unix `termios` UART port configuration (`SerialConfig`, baud rates, parity, stop bits, flow control), Linux `/sys/class/tty` discovery, `MockSerialEndpoint` paired loopback, and `use_serial_ports()`.
- **USB Raw HID (`hid.rs`)**:
  - Linux `/dev/hidraw*` sysfs VID/PID/usage discovery, feature/input/output report transfers, and `MockHidDevice`.
- **Bluetooth LE GATT (`ble.rs`)**:
  - BlueZ system D-Bus adapter discovery, Bluetooth SIG Heart Rate Measurement (`0x180D` / `0x2A37`) binary parser, `MockBleAdapter`, `use_ble_devices()`, and `latest_ble_heart_rate_bpm()` bridged cleanly into `strata-device::use_heart_rate()`.

---

## Quick Example

```rust
use strata_hardware::{MockSerialEndpoint, SerialConfig};

let (mut tx, mut rx) = MockSerialEndpoint::pair(SerialConfig::default());
tx.write_all(b"TELEMETRY_OK").unwrap();
let mut buf = [0u8; 32];
let n = rx.read(&mut buf).unwrap();
assert_eq!(&buf[..n], b"TELEMETRY_OK");
```
