# 🧩 Code Stash

A sleek, modern web application for managing and organizing code snippets. Built with **Next.js 15**, **MongoDB**, and **React Context**, it enables developers to create, edit, and organize code snippets with a seamless and responsive UI.

👉 **Live Demo**: [HERE](https://code-stash-beta.vercel.app/)

---

## ✨ Features

- 📝 Create, edit & delete code snippets
- ⚡ Optimistic UI for instant feedback
- 📱 Mobile-first responsive design
- ☁️ MongoDB-powered backend via Mongoose
- 🔧 React Context API for state management
- 🧠 Server Actions for smooth data mutations
- 🔐 OAuth2 authentication

---

## 🖼️ Preview

![Snippet Manager Demo](public/preview.png)

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React
- **Backend**: Next.js, Server Actions
- **Database**: MongoDB
- **State Management**: React Context
- **Styling**: Tailwind CSS, Vanilla CSS
- **Auth**: Auth.js, Google OAuth, GitHub OAuth
- **Package Manager**: NPM
- **Version Control**: Git

---

## 📦 Getting Started

### 1. Clone the repository

```bash
// SSH
git clone git@github.com:EOEboh/code-stash.git

// HTTPS
git clone https://github.com/EOEboh/code-stash.git
```

### 2. Install dependencies

```bash
npm install

```

### 3. Set up environment variables

```
MONGO_DB_URI=
AUTH_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

> Get your MONGODB_URI from MongoDB Atlas

### 4. Run the development server

```
npm run dev
```

> Visit http://localhost:3000 in your browser

## 🧠 Project Structure

```bash
/src
 /app
   /api           - API routes for fetching snippets
   /components    - Reusable UI components
   /context       - SnippetContext for state management
   /hooks         - Reusable hooks for shared logic
   /lib           - DB connection and helpers
   /models        - Mongoose schemas
   /snippets      - Create, view, edit, and delete snippet pages
   /styles        - Global styles, Tailwind config
```

## ⚙️ Server Actions

This project uses Next.js 15 Server Actions for database operations like:

    createSnippet

    updateSnippet

    deleteSnippet

Eliminates the API overhead that comes with mutating requests.

## ⚡ Optimistic UI

When editing snippets, changes appear immediately in the UI before server confirmation, providing a fast, native-like experience and enhancing user experience.
📌 Future Improvements

    🗃️ Snippet tags/categories

    🔍 Full-text search

    🌍 Public snippet sharing

    ✨ AI-based snippet suggestions

## 📄 License

MIT — Emmanuel O. Eboh

## 💬 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.
