# 🪙 Krrish Sehgal - Bitcoin Developer Portfolio

A modern, Bitcoin-themed portfolio showcasing my journey as a blockchain developer, open-source contributor, and software engineer.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://krrishsehgal.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

## 🚀 Live Demo

Visit the live portfolio: [krrishsehgal.vercel.app](https://krrishsehgal.vercel.app)

## ✨ Features

- **🎨 Bitcoin-Themed Design**: Custom Bitcoin orange (#F7931A) color scheme throughout
- **📊 Live GitHub Stats**: Real-time open-source contributions dashboard with 5-minute auto-refresh
- **🔄 Dynamic Organization Pages**: Interactive pages for each organization with paginated PR feeds
- **♾️ Infinite Scroll**: Load more functionality for seamless browsing of contributions
- **⚡ Performance Optimized**:
  - Server-side caching (10-min for stats, 5-min for PRs)
  - Client-side SWR caching with deduplication
  - Static generation for main pages
- **🎬 Animated Background**: Custom Bitcoin-themed canvas animations
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🌙 Dark Mode**: Built-in dark theme for comfortable viewing
- **🔍 SEO Optimized**: Comprehensive metadata for search engines and social media

## 🛠️ Tech Stack

### Core

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

### Data & State

- **Data Fetching**: [SWR](https://swr.vercel.app/) - React Hooks for data fetching with caching
- **API Integration**: GitHub REST API for live contribution data

### Visualization & UI

- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Animations**: Custom Canvas API for Bitcoin background animations
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Fonts**: [Geist Font](https://vercel.com/font) - Vercel's design system font

### Developer Experience

- **Package Manager**: pnpm - Fast, disk space efficient package manager
- **Analytics**: Vercel Analytics - Privacy-friendly analytics
- **Deployment**: [Vercel](https://vercel.com/) - Zero-config deployment platform

## � Performance

```
- **Package Manager**: pnpm - Fast, disk space efficient package manager
- **Analytics**: Vercel Analytics - Privacy-friendly analytics
- **Deployment**: [Vercel](https://vercel.com/) - Zero-config deployment platform

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Load JS**: ~113 kB (optimized bundle size)
- **Caching Strategy**:
  - Server: 10-min cache for OSS stats, 5-min for org PRs
  - Client: 2-min SWR cache with smart deduplication

## 👨‍💻 About Me

I'm a Software Engineer specializing in Bitcoin and blockchain development, with a passion for building secure, decentralized systems. Currently pursuing BTech in Computer Science at JIIT, New Delhi.

**Highlights:**
- 🎓 **Google Summer of Code 2025** - OWASP Foundation
- 🪙 **Summer of Bitcoin 2025** - Unchained Capital
- 🏆 **Smart India Hackathon 2024 Winner** - 300,000+ teams
- 🌟 **50+ Merged PRs** across various open-source projects
- 💻 **Maintainer** of 50+ GitHub repositories

## 📫 Connect With Me

**Krrish Sehgal**
```

## 🎨 Customization

### Update Content

Edit the JSON files in the `data/` directory:

- `data/site.json` - Personal information, skills, bio
- `data/career.json` - Career timeline and experiences

### Modify Styling

- **Colors**: Update Bitcoin orange theme in `tailwind.config.js` or component files
- **Typography**: Modify fonts in `app/layout.tsx`
- **Components**: Customize components in `components/` directory

### Add Pages

Create new pages in the `app/` directory following Next.js App Router conventions.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Configure Environment Variables

Add `GITHUB_TOKEN` in Vercel Dashboard:

1. Go to Project Settings > Environment Variables
2. Add `GITHUB_TOKEN` with your GitHub personal access token
3. Select all environments (Production, Preview, Development)

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Load JS**: ~113 kB (optimized bundle size)
- **Caching Strategy**:
  - Server: 10-min cache for OSS stats, 5-min for org PRs
  - Client: 2-min SWR cache with smart deduplication

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About Me

I'm a Software Engineer specializing in Bitcoin and blockchain development, with a passion for building secure, decentralized systems. Currently pursuing BTech in Computer Science at JIIT, New Delhi.

**Highlights:**

- 🎓 **Google Summer of Code 2025** - OWASP Foundation
- 🪙 **Summer of Bitcoin 2025** - Unchained Capital
- 🏆 **Smart India Hackathon 2024 Winner** - 300,000+ teams
- 🌟 **50+ Merged PRs** across various open-source projects
- 💻 **Maintainer** of 50+ GitHub repositories

## 📫 Connect With Me

**Krrish Sehgal**

- 🌐 Portfolio: [krrishsehgal.vercel.app](https://krrishsehgal.vercel.app)
- 💼 GitHub: [@krrish-sehgal](https://github.com/krrish-sehgal)
- 🐦 Twitter: [@KrrishSehgal](https://twitter.com/KrrishSehgal)
- 📧 Email: krrishsehgal03@gmail.com
- 📄 Resume: [View CV](https://drive.google.com/file/d/1eVuA4NnhOicSNwGLd_BXiEps-cdZMa5V/view)

## 💼 Open to Opportunities

🪙 **Actively seeking Bitcoin development roles** - Full-time, contract, or open-source collaborations welcome!

Interested in:

- Bitcoin protocol development
- Lightning Network applications
- Cryptography & security
- Blockchain infrastructure
- DeFi & Smart contracts

---

**Built with ❤️ and Bitcoin** 🪙

⭐ **Star this repo if you like the portfolio!**
