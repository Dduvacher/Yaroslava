import {
  sendMessage,
  Message
} from "../../deps.ts";
import { botCache } from "../../cache.ts";

botCache.monitors.set("unflipTable", {
  name: "unflipTable",
  execute: function (message: Message) {
    if (message.author.bot) return;

    if (message.content === '(╯°□°）╯︵ ┻━┻') {
      return sendMessage(
        message.channelID,
        '┬─┬ ノ( ゜-゜ノ)'
      );
    }
  },
});