import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initializeScheduler } from "../scheduler";
import { generateRSSFeed, generateAtomFeed, generateJSONFeed } from "../rss";
import { generateDynamicSitemap } from "../sitemap";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // RSS/Atom/JSON Feed routes (must be before Vite/static)
  app.get("/rss.xml", async (_req, res) => {
    try {
      const feed = await generateRSSFeed();
      res.type("application/rss+xml").send(feed);
    } catch (err) {
      console.error("[RSS] Error generating feed:", err);
      res.status(500).send("Error generating RSS feed");
    }
  });
  
  app.get("/atom.xml", async (_req, res) => {
    try {
      const feed = await generateAtomFeed();
      res.type("application/atom+xml").send(feed);
    } catch (err) {
      console.error("[Atom] Error generating feed:", err);
      res.status(500).send("Error generating Atom feed");
    }
  });
  
  app.get("/feed.json", async (_req, res) => {
    try {
      const feed = await generateJSONFeed();
      res.type("application/json").send(feed);
    } catch (err) {
      console.error("[JSON Feed] Error generating feed:", err);
      res.status(500).send("Error generating JSON feed");
    }
  });

  // Dynamic sitemap with all articles for SEO
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const sitemap = await generateDynamicSitemap();
      res.type("application/xml").send(sitemap);
    } catch (err) {
      console.error("[Sitemap] Error generating sitemap:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    
    // Initialize the content scheduler after server starts
    initializeScheduler().catch(err => {
      console.error("[Server] Failed to initialize scheduler:", err);
    });
  });
}

startServer().catch(console.error);
