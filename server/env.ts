import { config } from "dotenv";

// Load .env before anything else. Several modules read process.env at import
// time (routes.ts configures Mailchimp at module scope), so this must be the
// first import in server/index.ts.
config({ quiet: true });
