<p align="center">
  <a href="https://www.muse.egeuysal.com/">
    <img src="https://res.cloudinary.com/dpgeyzgaw/image/upload/v1747010081/Muse%20Logo.png" height="96">
    <h3 align="center">Muse</h3>
  </a>
</p>

<p align="center">
  Discover. Create. Inspire.
</p>

<p align="center">
  <strong>
    <a href="https://www.muse.egeuysal.com/docs">Documentation</a> ∙ 
    <a href="https://www.muse.egeuysal.com/changelog">Changelog</a> ∙ 
    <a href="CONTRIBUTING.md">Contributing</a>
  </strong>
</p>

## Muse

**Muse** is a collaborative idea-sharing platform where users can store, discover, and share short, spontaneous thoughts. Designed to be fast, minimal, and inspiring, Muse helps creators capture ideas in the moment—and browse others’ thoughts to spark new ones. Whether you're brainstorming, planning, or daydreaming, Muse gives your ideas a home.

### Features

- **Fast Idea Capture**: Submit short ideas instantly with a title, category, and timestamp.
- **Explore by Tag or Time**: Filter ideas by category or browse by date to revisit inspiration.
- **Random Idea Generator**: Feeling stuck? Muse can serve you a random idea from the vault.
- **Public Idea Board**: See what others are thinking. Muse is a shared mental playground.
- **Lightweight API Backend**: Built with Go, using `net/http` and `encoding/json` for speed and simplicity.
- **Minimal Frontend**: Built with Next.js for a fast, responsive, and clean UI.

### Installation

To run Muse locally:

1. Clone the monorepo:
   ```bash
   git clone https://github.com/egeuysall/muse.git
   cd muse
   ```
2. Navigate to each project and install dependencies:
   **Frontend:**
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```
   **Backend:**
   ```bash
   cd ../backend
   go run main.go
   ```
3. Access the frontend at http://localhost:3000 and ensure your backend is running on http://localhost:8080.

### Technologies Used
- **Go (Golang)**: For a fast and reliable backend using the standard library.
- **Next.js 15**: React framework for building the modern web with the App Router.
- **TypeScript**: For safe and structured frontend development.
- **Tailwind CSS**: For minimal, responsive design.
- **pnpm**: Fast, disk-efficient package manager.

### Environment Variables
Create a **.env** file in both frontend and backend folders with appropriate keys.

### Development
**Muse is structured as a monorepo:**
- **Frontend**: Next.js app
- **Backend**: Go server
Use standard linting and formatting before commits.

### License
Muse is open-source and released under the [Apache 2.0 License](./LICENSE).

### Contact

- **Email**: [hello@egeuysal.com](mailto:hello@egeuysal.com)
- **GitHub**: [@egeuysall](https://github.com/egeuysall)
