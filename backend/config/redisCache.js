import Redis from "ioredis";

export const redis = new Redis({
  host: "127.0.0.1", // Replace with your Redis server's address
  port: 6379, // Default Redis port
});

// Check Redis connection
redis.on("connect", () => {
  console.log("Connected to Redis ✅");
});

redis.on("error", (err) => {
  console.error("Redis Error ❌", err);
});
