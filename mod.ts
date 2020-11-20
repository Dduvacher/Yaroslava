import StartBot, { Intents } from "./deps.ts";
import { botCache } from "./cache.ts";
import { configs } from "./configs.ts";
import { importDirectory } from "./src/utils/helpers.ts";
import { loadLanguages } from "./src/utils/i18next.ts";

console.info(
  "Beginning Bot Startup Process. This can take a little bit depending on your system. Loading now...",
);

// Always require these files be processed before anything else
await Promise.all([
  "./src/customizations/structures",
].map(
  (path) => importDirectory(Deno.realPathSync(path)),
));

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    "./src/commands",
    "./src/inhibitors",
    "./src/events",
    "./src/arguments",
    "./src/monitors",
    "./src/tasks",
    "./src/permissionLevels",
    "./src/events",
  ].map(
    (path) => importDirectory(Deno.realPathSync(path)),
  ),
);

// Loads languages
await loadLanguages();
await import("./src/database/database.ts");

StartBot({
  token: configs.token,
  // Pick the intents you wish to have for your bot.
  // For instance, to work with guild message reactions, you will have to pass the Intents.GUILD_MESSAGE_REACTIONS intent to the array.
  intents: [
    Intents.GUILDS,
    Intents.GUILD_MESSAGES,
    Intents.GUILD_MESSAGE_REACTIONS,
  ],
  // These are all your event handler functions. Imported from the events folder
  eventHandlers: botCache.eventHandlers,
});
