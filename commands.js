const Snoowrap = require('snoowrap');
const r = new Snoowrap({
  userAgent: 'MemeBot',
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  username: process.env.username,
  password: process.env.password
});

const timchen = require('timchen');

const prefix = require('./prefix.js');

class Cmd {
  constructor(description, usage, run) {
    this.description = description;
    this.usage = usage;
    this.run = run;
  }
  help(msg) {
    return this.description + "\nUsage: `" + prefix.g(msg) + this.usage + "`"
  }
}


exports.help = new Cmd(
  "Summons the help message",
  "help <optional: command name>",
  async (params, msg) => {
    if (!params.length) {
      const embed = {
        embed: {
          title: "MemeBot Help Page",
          description: '**I am here to rule the *Memez* server!!**\n\nList of commands:',
          footer: {
            text: "Type " + prefix.g(msg) + "help <command> to see its usage | Tip: Use a pair of backticks (\`) for multi-word parameters"
          },
          color: 0xffff00,
          fields: []
        }
      };
      Object.keys(exports)
        .filter(key => exports[key] instanceof Cmd)
        .forEach(key => {
          embed.embed.fields.push({ name: prefix.g(msg) + key, value: exports[key].description });
        })
      return embed;
    }
    if (exports[params[0]] instanceof Cmd)
      return exports[params[0]].help(msg);
    else return "Command not found";
  }
);

exports.server = new Cmd(
  "Oh, it's the link of the server I'm ruling",
  "server",
  async params => "https://discord.gg/FU2ve4A"
);

const read = [];
const subreddits = {
  "general": "memes",
  "dank": "dank_meme",
  "deepfried": "DeepFriedMemes",
  "math": "MathJokes",
  "music": "musicmemes",
  "physics": "physicsmemes",
  "programming": "ProgrammerHumor",
  "tech": "techhumor",
  "roblox": "ROBLOXmemes"
}

exports.meme = new Cmd(
  "Summons a random meme from reddit",
  `meme <${Object.keys(subreddits).join(" | ")}>`,
  async (params, msg) => {
    let subreddit = subreddits[params[0]];
    if (!subreddit) return exports.meme.help(msg);

    msg.channel.send("Fetching meme...").then(async wait => {
      const sub = await r.getSubreddit(subreddit);
      let pic, post;
      while (true) {
        post = await sub.getRandomSubmission();
        if (read.includes(post.id)) continue;
        if (post.url.endsWith("jpg") || post.url.endsWith("png")) {
          pic = { file: post.url };
          read.push(post.id);
          break;
        }
      }
      msg.channel.send(`**${post.title}**`, pic);
      wait.delete();
    });
  }
);

const answers = [
  "Certainly",
  "Indeed",
  "Nothing wrong",
  "Of course",
  "Yep",
  "`true`",
  "I doubt it",
  "I'm not sure",
  "That's a stupid question",
  "Why would you even ask",
  "Of course no",
  "Wrong",
  "Nope",
  "`false`",
  "No one thinks so",
  "<@437048770237169666> says no"
]

exports['9ball'] = new Cmd(
  "A copy of <@386333909362933772>'s 8ball",
  "9ball <question>",
  async (params, msg) => {
    if (!params.length) return exports['9ball'].help(msg);
    const question = params.join(' ');
    let hash = 0, i, chr;
    for (let i in question) {
      chr = question.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    const answer = answers[Math.abs(hash) % answers.length];
    return {
      embed: {
        title: "Asked a question: " + question,
        description: answer,
        author: {
          name: msg.member.displayName,
          icon_url: msg.author.avatarURL
        },
        color: 0xffff00
      }
    }
  }
);


exports.timchen = new Cmd(
  "Summons an image of the mighty timchen",
  "timchen",
  async params => {
    const obj = await timchen.random();
    return {
      embed: {
        title: obj.desc,
        image: {
          url: obj.url
        },
        color: 0xffff00
      }
    }
  }
);
