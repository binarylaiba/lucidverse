# 🌌 LucidVerse · AetherDream
### Cyber-Ethereal Neural Dreamscape Explorer & AI Subconscious Reality Compiler

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg?style=flat&logo=express)](https://expressjs.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-API-6366f1.svg?style=flat)](https://openrouter.ai/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black.svg?style=flat&logo=three.js)](https://threejs.org/)

---

## ✦ Overview

**AetherDream (LucidVerse)** is a full-stack, cyber-ethereal web application and neural dream engine. It translates human subconscious prompts and atmospheric parameters into mathematically structured, navigable dimensional realms.

Powered by **Three.js**, **WebGL Shaders**, the **Web Audio API**, **OpenRouter AI models**, and **Supabase PostgreSQL**, AetherDream delivers an immersive sensory interface for exploring the architecture of human thought.

---

## ✨ Key Features

### 1. 🔮 Neural Dream Weaver (`/weave`)
- **Atmospheric Physics Engine**: 5 continuous parameter sliders (*Fog Density, Stardust Particles, Bloom Intensity, Void Depth, Harmonic Carrier 216Hz–963Hz*).
- **Environment Matrix Presets**: Quick-load matrices (*Crystalline Sanctuary, Bioluminescent Abyss, Fractal Astral Library, Solaris Core*).
- **Spatial Entity Population**: Selectable beacons and relics (*Floating Quartz Spires, Astral Navigators, Chronos Portals*).
- **OpenRouter AI Generation**: Compiles prompts into structured JSON dream manifests via `POST /api/dreams/generate`.

### 2. 💎 3D Void Engine & WebGL Shaders
- **Interactive Three.js Scene**: 18+ faceted crystal meshes (octahedrons, icosahedrons, tetrahedrons) with physical transmission materials, wireframes, central spire, and mouse-tracked spatial parallax.
- **GPU WebGL Shader Layer**: Simplex noise volumetric nebula clouds, luminous celestial lunar corona, and starfield distortion.

### 3. 🎧 432Hz Binaural Harmonics Synthesizer
- Built on the **Web Audio API**: Dual stereo oscillators producing 432Hz carrier waves with an embedded 5.5Hz theta frequency offset, lowpass biquad filtering, and smooth exponential gain ramps.

### 4. 📜 Codex Dimension Encyclopedia (`/codex`)
- Searchable and filterable archive of dimensional planes.
- Real-time text query filtering across titles, tags, frequencies, and lore.
- Category filters (*Ethereal, Neural, Crystalline, Solar, Void, Cosmic*) and dedicated bookmarks drawer.

### 5. 📡 Collective Stream Broadcast Theater (`/stream`)
- Dynamic mood and frequency visualizer matched to active broadcast signals.
- **Navigator Telemetry Chat**: Real-time traveler message stream with simulated observer responses and reaction telemetry.

### 6. 🎛️ Reality Calibration Deck (`/shift`)
- Continuous sensory calibration sliders (*Neural Sensitivity, Coherence Barrier, Temporal Anchor*).
- System toggles (*AI Guidance, Chronicle Auto-Record, Binaural Soundscape, CRT Hologram Scanlines*).
- Live calculated **Lucidity Index** gauge with local profile persistence.

### 7. 🤖 Contextual Aether AI Oracle (`POST /api/ai/chat`)
- In-character sentient digital oracle responding contextually to active dream states, dimensional frequencies, and live telemetry data.

---

## 🏛️ System Architecture

```
lucidverse/
├── aetherdream/                   # Frontend SPA (Vite + React + TypeScript)
│   ├── src/
│   │   ├── components/            # 3D Viewports, Shaders, Modals, HUD Overlays
│   │   ├── context/               # Global Dream Context & State Management
│   │   ├── data/                  # Seed dimensions, entities, stream presets
│   │   ├── layouts/               # Root MainLayout with background layers
│   │   ├── pages/                 # Drift, Weave, Stream, Codex, Shift, Details, My Dreams
│   │   ├── styles/                # Tailwind CSS v4 design tokens & glow utilities
│   │   └── utils/                 # Web Audio API 432Hz binaural sound generator
│   ├── vercel.json                # Vercel deployment configuration
│   └── package.json
│
├── server/                        # Backend REST API (Express + TypeScript)
│   ├── src/
│   │   ├── config/                # Validated env, OpenRouter, Supabase client
│   │   ├── controllers/           # Health, Dream, Dimension, Stream, AI controllers
│   │   ├── middleware/            # Zod request validator, Centralized error handler
│   │   ├── repositories/          # Isolated Supabase PostgreSQL query layer
│   │   ├── routes/                # Express API routes mounted under /api
│   │   ├── services/              # OpenRouter API communication & Dream business logic
│   │   ├── types/                 # Type-safe Zod schemas and DTOs
│   │   └── utils/                 # Standardized JSON response envelopes & logger
│   ├── schema.sql                 # PostgreSQL DDL for Supabase tables & seeds
│   ├── railway.json               # Railway deployment configuration
│   └── package.json
│
├── .gitignore                     # Repository-wide secret & build artifact protection
├── package.json                   # Root workspace scripts
└── README.md
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design** | Tailwind CSS v4, Framer Motion, Vanilla CSS Custom Properties |
| **3D & Graphics** | Three.js (r174), Custom WebGL Fragment/Vertex Shaders |
| **Audio Synthesis** | Web Audio API (Dual Stereo Oscillators, BiquadFilterNode) |
| **Backend API** | Node.js, Express, TypeScript, tsx |
| **AI Synthesis** | OpenRouter API (`meta-llama/llama-3.3-70b-instruct`) |
| **Database** | Supabase (Cloud PostgreSQL with JSONB parameters) |
| **Validation** | Zod Schema Validation |

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/binarylaiba/lucidverse.git
cd lucidverse
```

### 2. Configure Environment Variables
Create a `.env` file inside the `server/` directory:
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your credentials:
```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Initialize Supabase Database
In your **[Supabase Dashboard](https://supabase.com/dashboard)** $\rightarrow$ **SQL Editor**, run the SQL statements in [`server/schema.sql`](server/schema.sql) to create the `dreams`, `dimensions`, and `stream_transmissions` tables with initial seed data.

### 4. Install Dependencies
```bash
# In the repository root
npm install --prefix aetherdream
npm install --prefix server
```

### 5. Start Development Servers
```bash
# Terminal 1: Start Frontend (Runs on http://localhost:5173)
npm --prefix aetherdream run dev

# Terminal 2: Start Backend (Runs on http://localhost:5000)
npm --prefix server run dev
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and service status (`{ status: "ok", services: { openrouter, supabase } }`) |
| `POST` | `/api/dreams/generate` | Synthesizes a structured Dream JSON via OpenRouter |
| `POST` | `/api/dreams` | Saves a new dream to Supabase |
| `GET` | `/api/dreams` | Lists all saved dreams |
| `GET` | `/api/dreams/:id` | Retrieves a single dream by UUID |
| `DELETE` | `/api/dreams/:id` | Deletes a dream by UUID |
| `GET` | `/api/dimensions` | Lists all registered Codex dimensions |
| `GET` | `/api/dimensions/:id` | Retrieves a single dimension by ID |
| `GET` | `/api/stream` | Lists recent collective stream transmissions |
| `POST` | `/api/stream` | Records a new traveler transmission |
| `POST` | `/api/ai/chat` | Contextual Aether AI chat given `message`, `dreamContext`, and `telemetry` |

---

## ☁️ Deployment

- **Frontend (Vercel)**: Connect your repository on [vercel.com](https://vercel.com/new), set **Root Directory** to `aetherdream`, and deploy.
- **Backend (Render / Railway)**: Connect your repository on [render.com](https://render.com/) or [railway.com](https://railway.com/), set **Root Directory** to `server`, add your environment variables (`OPENROUTER_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`), and deploy.

---

## 🔒 Security & Privacy

- All API keys and secrets (`OPENROUTER_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are kept exclusively on the server and are never bundled with or exposed to the client.
- `.env` files are excluded from Git via `.gitignore`.
- Incoming requests are strictly validated using **Zod** with centralized error interception.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.