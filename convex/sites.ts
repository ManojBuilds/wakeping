import { Crons } from "@convex-dev/crons";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";
import { internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";

const crons = new Crons(components.crons);

// Public Queries & Mutations
export const createSite = mutation({
  args: {
    name: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const siteId = await ctx.db.insert("sites", {
      userId: identity.subject,
      name: args.name,
      url: args.url,
      status: "pending",
    });

    return siteId;
  },
});

export const getSites = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("sites")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const deleteSite = mutation({
  args: { id: v.id("sites") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const site = await ctx.db.get(args.id);
    if (!site || site.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});

// Internal Functions for Actions/Crons
export const getAllSitesInternal = internalQuery({
  handler: async (ctx) => {
    return await ctx.db.query("sites").collect();
  },
});

export const updateSiteStatus = internalMutation({
  args: {
    id: v.id("sites"),
    status: v.string(),
    lastPinged: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      lastPinged: args.lastPinged,
    });
  },
});

// Actions
export const pingSite = internalAction({
  args: {
    id: v.id("sites"),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    let status = "active";
    try {
      const response = await fetch(args.url, { method: "GET" });
      if (!response.ok) {
        status = "error";
      }
    } catch (error) {
      status = "error";
      console.error(`Failed to ping ${args.url}:`, error);
    }

    await ctx.runMutation(internal.sites.updateSiteStatus, {
      id: args.id,
      status,
      lastPinged: Date.now(),
    });
  },
});

export const pingAll = internalAction({
  handler: async (ctx) => {
    const sites = await ctx.runQuery(internal.sites.getAllSitesInternal);

    await Promise.all(
      sites.map((site) =>
        ctx.runAction(internal.sites.pingSite, { id: site._id, url: site.url })
      )
    );
  },
});

export const registerPingCron = internalMutation({
  handler: async (ctx) => {
    const existing = await crons.get(ctx, { name: "ping-all-sites" });
    if (existing === null) {
      await crons.register(
        ctx,
        { kind: "interval", ms: 10 * 60 * 1000 }, // 10 minutes
        internal.sites.pingAll,
        {},
        "ping-all-sites"
      );
      console.log("Registered global ping cron");
    }
  },
});
