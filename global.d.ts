import { Session } from "@auth/core/types";
import { db as sqliteDb } from "./database/sqlite/db";

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof sqliteDb>;
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      session?: Session | null;
    }
  }
}

export {};
