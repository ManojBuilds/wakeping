import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sites: defineTable({
    userId: v.string(),
    name: v.string(),
    url: v.string(),
    status: v.string(), // "active", "error", "pending"
    lastPinged: v.optional(v.number()),
  }).index("by_userId", ["userId"]),
});
