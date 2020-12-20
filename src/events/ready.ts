import { botCache } from "../../cache.ts";
import { cache } from "../../deps.ts";

botCache.eventHandlers.ready = function () {
  console.info(`Loaded ${botCache.arguments.size} Argument(s)`);
  console.info(`Loaded ${botCache.commands.size} Command(s)`);
  console.info(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
  console.info(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
  console.info(`Loaded ${botCache.monitors.size} Monitor(s)`);
  console.info(`Loaded ${botCache.tasks.size} Task(s)`);

  for (const task of botCache.tasks.values()) {
    setInterval(() => task.execute(), task.interval);
  }

  console.log(
    `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
  );
};
