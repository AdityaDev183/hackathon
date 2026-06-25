# 🚀 Creator Copilot AI

**Build Smarter. Faster. With AI.**
Replace your entire content team with one AI copilot. A production-ready SaaS platform built for the modern creator.

![Creator Copilot AI](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200)

## 🎯 Features

- **🧠 Multi-Model AI System**: Integrated with NVIDIA NIM APIs (Llama 3.1 8B/70B, FLUX.1, Cosmos, Nemotron).
- **✍️ Content Workflows**: specialized agents for YouTube, TikTok, and Reels.
- **🎨 Image Studio**: 4K Thumbnail generation using FLUX.1-dev.
- **🎬 Video Lab**: AI-generated clips powered by Cosmos AI.
- **📊 Viral Score**: Performance insights and suggestions using Nemotron.
- **💳 Pro Subscriptions**: Stripe integration (test mode) with feature gating.
- **🔐 Secure Auth**: Firebase Authentication with session persistence.
- **⚡ Performance**: Redis-based rate limiting and caching.
- **✨ Premium UI**: Glassmorphism design, Framer Motion animations, and anime.js particle effects.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, anime.js, shadcn/ui.
- **Backend**: Next.js API Routes, NVIDIA NIM SDK, OpenAI SDK.
- **Database**: Firestore (NoSQL).
- **Authentication**: Firebase Auth.
- **Storage**: Cloudinary.
- **Payments**: Stripe Node SDK.
- **Cache**: Redis (ioredis).

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/creator-copilot-ai.git
cd creator-copilot-ai
npm install
```

### 2. Environment Setup
Create a `.env.local` file based on `.env.example`:

```env
# NVIDIA NIM API
NVIDIA_API_KEY=nvapi-...

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# Stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...

# Redis & Cloudinary
REDIS_URL=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 3. Run Locally
```bash
npm run dev
```

## 🏗 Project Structure

- `/app`: Next.js App Router (Pages & API Routes).
- `/components`: UI library (layout, ai-tools, auth, dashboard).
- `/lib`: Core integrations (AI, Firebase, Redis, Stripe).
- `/hooks`: Custom React hooks for auth and state.
- `/styles`: Global CSS and Tailwind configuration.

## 🛡 Security & Scalability

- **API Proxy**: Frontend never interacts directly with NVIDIA keys.
- **Validation**: Zod schema validation on all API endpoints.
- **Rate Limiting**: Redis-powered protection (Free: 10/day, Pro: 100/day).
- **Middleware**: Server-side route protection for dashboard and settings.

## 📜 License
MIT License - Copyright (c) 2025 Creator Copilot AI.
