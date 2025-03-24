import Redis from "ioredis";

// ` redis configur
export const redis = new Redis({
  host: "127.0.0.1", // Replace with your Redis server's address
  port: 6379, // Default Redis port
});

// % Check Redis connection
redis.on("connect", () => {
  console.log("Connected to Redis ✅");
});

redis.on("error", (err) => {
  console.error("Redis Error ❌", err);
});

// ` Configur redis cache key generate
export const generateCacheKey = (req) => {
  const baseUrl = req.path.replace(/^\/+|\/+$/g, "");

  return `${baseUrl}`;
};
