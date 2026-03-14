# Imbra Connect — Product Brief

## Overview

**Imbra Connect** is a communication protocol abstraction framework — a single Python package providing a unified interface for industrial communication protocols, with paid ports to Go, Rust, and TypeScript.

The core idea: clients program against one abstract interface. Hardware and protocols are plugged in as drivers and adapters. Adding a new protocol or swapping hardware does not change the application code.

---

## Business model

| Tier | Language | License | Distribution |
|------|----------|---------|--------------|
| Free | Python | Open source (TBD) | GitHub + PyPI |
| Paid | Go | Commercial | Private repo / licensed |
| Paid | Rust | Commercial | Private repo / licensed |
| Paid | TypeScript | Commercial | Private repo / licensed |

**License decision pending** — MIT gives maximum freedom but allows free commercial use. LGPL or AGPL adds friction for commercial use and nudges serious users toward the paid Go/Rust versions.

---

## Protocols

Existing implementations:
- **MQTT** — versions 3.x and 5.x (share common base)
- **DeviceNet** — CIP over CAN
- **CAN** — base transport
- **CANopen** — application layer over CAN

Planned:
- **EtherNet/IP** — CIP over TCP/UDP
- **Modbus** — RTU and TCP variants
- Others (Profibus, OPC-UA, FINS, etc.)

### Protocol hierarchy

```
CIP (Common Industrial Protocol — application layer)
├── DeviceNet    (CIP over CAN)
└── EtherNet/IP  (CIP over TCP/UDP)

CAN (transport)
└── CANopen      (application layer over CAN)

MQTT
├── v3.x
└── v5.x

Modbus
├── RTU (serial)
└── TCP
```

---

## Repository structure

Single package per language, protocols as optional extras:

```
imbra-connect/               # public — Python
├── imbra/connect/
│   ├── core/                # abstract interface — Connection, Message, Driver, Adapter
│   ├── protocols/
│   │   ├── mqtt/            # MQTT 3.x + 5.x
│   │   ├── modbus/
│   │   ├── can/
│   │   ├── canopen/         # depends on can/
│   │   ├── cip/             # CIP application layer
│   │   ├── devicenet/       # depends on can/ + cip/
│   │   └── ethernetip/      # depends on cip/
│   └── ...
├── pyproject.toml
└── README.md

imbra-connect-go/            # private — Go (paid)
imbra-connect-rust/          # private — Rust (paid)
imbra-connect-ts/            # private — TypeScript (paid)
```

**Rationale for single package:** with hundreds of protocols possible, per-protocol versioning is unmanageable. One version, one release, protocols as extras.

---

## Installation (Python)

Clients install only what they need via pip extras:

```bash
pip install imbra-connect[mqtt]           # MQTT only
pip install imbra-connect[modbus]         # Modbus only
pip install imbra-connect[devicenet]      # pulls in can + cip automatically
pip install imbra-connect[mqtt,modbus]    # multiple protocols
pip install imbra-connect[all]            # everything
```

Extras are defined in `pyproject.toml` → `[project.optional-dependencies]`.

**Recommended package manager:** `uv` — fast, modern, replaces pip + virtualenv + pip-tools.

---

## Core abstract interface

The framework separates three concerns:

```
Driver     — abstracts the hardware (NetX, SocketCAN, serial, TCP socket)
Adapter    — handles protocol encoding/decoding (bytes ↔ Message)
Connection — ties Driver + Adapter together, exposes send/receive
```

Sketch:

```python
# core/connection.py
class Connection(ABC):
    def connect(self) -> None: ...
    def disconnect(self) -> None: ...
    def send(self, message: Message) -> None: ...
    def receive(self) -> Message: ...

# core/driver.py
class Driver(ABC):
    def open(self) -> None: ...
    def close(self) -> None: ...
    def read(self) -> bytes: ...
    def write(self, data: bytes) -> None: ...

# core/adapter.py
class Adapter(ABC):
    def encode(self, message: Message) -> bytes: ...
    def decode(self, data: bytes) -> Message: ...
```

Any hardware is supported provided a `Driver` implementation exists. Any protocol is supported provided an `Adapter` implementation exists.

---

## Open questions

- [ ] Final license for the Python open source version (MIT vs LGPL vs AGPL)
- [ ] Does the existing abstract interface match the Driver/Adapter/Connection split or is it structured differently?
- [ ] GitHub org for the repos — `Imbra-Ltd` or a separate org?
- [ ] PyPI package name — `imbra-connect` (check availability)
- [ ] Product page on imbra.io — new card alongside Plant Historian

---

## Next steps

1. Finalise the abstract interface design
2. Create `imbra-connect` repo under `Imbra-Ltd` on GitHub
3. Port existing protocol implementations into the new structure
4. Publish to PyPI
5. Add Imbra Connect product card to imbra.io