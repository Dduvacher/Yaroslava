import { botCache } from "../../cache.ts";
import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";
import { addReaction, getMessage, Message, sendMessage } from "../../deps.ts";
import { cache } from "../../deps.ts";
import { configs } from "../../configs.ts";
import { createSubcommand } from "../utils/helpers.ts";
import {
  collectReactions,
  needMessage,
  needReaction,
} from "../utils/collectors.ts";

botCache.commands.set("roll", {
  name: "roll",
  description: "commands/roll:DESCRIPTION",
  botChannelPermissions: ["SEND_MESSAGES"],
  arguments: [
    {
      name: "sub command",
      type: "subcommand",
      required: false,
    },
    {
      name: "dice",
      type: "string",
      lowercase: false,
      required: false,
    },
  ],
  execute: async function (message, args: RollArgs) {
    const r = new Random();
    if (!args.dice) {
      return sendMessage(message.channelID, r.int(1, 101));
    }
    if (args.dice === "letter" || args.dice === "lettre") {
      //@ts-ignore librairie codé avec le fion et ça met une erreur mais tout va bien en fait, UPPER_ALPHABETS existe bien
      return sendMessage(
        message.channelID,
        r.string(1, Random.UPPER_ALPHABETS),
      );
    }
    const diceRegexp = /(\d*)D(\d+)/gi;
    const matches = diceRegexp.exec(args.dice);
    if (matches) {
      const parsedDiceNumber = parseInt(matches[1], 10);
      const parsedDiceType = parseInt(matches[2], 10);
      const diceNumber = !isNaN(parsedDiceNumber) ? parsedDiceNumber : 1;
      const diceType = !isNaN(parsedDiceType) ? parsedDiceType : 100;
      let result = 0;
      for (let i = 0; i < diceNumber; i++) {
        result += r.int(1, diceType + 1);
        console.log(result);
      }
      return sendMessage(message.channelID, `${result}`);
    }
    return sendMessage(
      message.channelID,
      "Je comprends pas bien ce que tu veux roll мой маленький.",
    );
  },
});

interface RollArgs {
  dice?: string;
}
