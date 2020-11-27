import { config } from "https://deno.land/x/dotenv/mod.ts"
const {
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_PREFIX
 } = config();

export const configs = {
  // Your bot token goes here
  token: Deno.env.get("DISCORD_BOT_TOKEN") || DISCORD_BOT_TOKEN || "",
  // The default prefix for your bot. Don't worry guilds can change this later.
  prefix: Deno.env.get("DISCORD_BOT_PREFIX") || DISCORD_BOT_PREFIX || "!",
  // This isn't required but you can add bot list api keys here.
  botListTokens: {
    DISCORD_BOTS_CO: "",
    DISCORD_BOT_ORG: "",
    BOTS_ON_DISCORD: "",
    DISCORD_BOT_LIST: "",
    BOTS_FOR_DISCORD: "",
    DISCORD_BOATS: "",
    DISCORD_BOTS_GG: "",
    DISCORD_BOTS_GROUP: "",
  },
  // This is the server id for your bot's main server where users can get help/support
  supportServerID: "",
  // These are channel ids that will enable some functionality
  channelIDs: {
    // When a translation is missing this is the channel you will be alerted in.
    missingTranslation: "",
    // When an error occurs, we will try and log it to this channel
    errorChannelID: "776772721450942465",
  },
  // These are the role ids that will enable some functionality.
  roleIDs: {
    // If you have a patreon set up you can add the patreon vip role id here.
    patreonVIPRoleID: "",
  },
  // These are the user ids that will enable some functionality.
  userIDs: {
    // The user ids for the support team
    botSupporters: ["84646266818015232"],
    // The user ids for the other devs on your team
    botDevs: ["84646266818015232"],
    // The user ids who have complete 100% access to your bot
    botOwners: ["84646266818015232"],
  },
};
