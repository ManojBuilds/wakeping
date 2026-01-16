import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "ping-all-sites",
  { minutes: 10 }, // every 10 minute
  internal.sites.pingAll,
);

export default crons