import { botCache } from "../../cache.ts";
import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";
import { addReactions, cache, sendMessage } from "../../deps.ts";
import { createSubcommand, sendEmbed } from "../utils/helpers.ts";
import { Milliseconds } from "../utils/constants/time.ts";
import { collectReactions } from "../utils/collectors.ts";
import { Embed } from "../utils/Embed.ts";

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
      return sendMessage(
        message.channelID,
        //@ts-ignore librairie codé avec le fion et ça met une erreur mais tout va bien en fait, UPPER_ALPHABETS existe bien
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

createSubcommand("roll", {
  name: "draw",
  aliases: ["tirage"],
  execute: async (message) => {
    const member = message.member;
    if (!member) return;
    const embed = new Embed()
      .setAuthor(member.tag, member.avatarURL)
      .setDescription(
        `Pour participer au tirage au sort, réagissez avec ☝️.\nVous avez 1min pour vous inscrire.\nLe.La gagnant.e sera tiré.e au sort quand <@!${message.author.id}> réagira avec 🙅.\nУдачи`,
      );
    const tirageMessage = await sendEmbed(message.channelID, embed);
    addReactions(message.channelID, tirageMessage.id, ["☝️", "🙅"]);
    const reactions = await collectReactions({
      key: tirageMessage.id,
      messageID: tirageMessage.id,
      createdAt: Date.now(),
      filter: (() => true),
      stop: ((userId, reaction) =>
        reaction === "🙅" && userId === message.author.id),
      amount: 2000,
      duration: Milliseconds.MINUTE,
    });
    const filteredReactions = reactions.filter((r) => r.emojiName === "☝️");
    const r = new Random();
    const winner = filteredReactions[r.int(0, filteredReactions.length - 1)];
    const winingMessage = winner
      ? `Le.La gagnant.e est <@!${winner.userID}>`
      : "Il n'y a malheureusement pas de gagant.e.s. **CHEH**";
    sendMessage(message.channelID, winingMessage);
  },
});

interface RollArgs {
  dice?: string;
}
