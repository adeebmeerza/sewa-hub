import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined; // This must be a `var` and not a `let / const`
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached: MongooseCache = global.mongoose as unknown as MongooseCache;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null } as MongooseCache;
}

export default async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  console.log("Database connected");
  return cached.conn;
}

export async function dbDisconnect() {
  try {
    if (cached.conn) {
      await cached.conn.disconnect();
      cached.conn = null;
      cached.promise = null;
      console.log("Database disconnected");
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
}

dbDisconnect();
