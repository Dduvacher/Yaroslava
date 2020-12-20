import { botCache } from "../../cache.ts";
import { processReactionMessageCollectors } from "../utils/collectors.ts";

botCache.eventHandlers.reactionAdd = function (message, emoji, userID) {
  // Process reaction collectors.
  processReactionMessageCollectors(message, emoji, userID);
};
