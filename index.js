//hosting
require('events').EventEmitter.defaultMaxListeners = 100;
const ms = require('ms');
const giveawayEmbed = require('./commands/start-givaway')
const auHelp = require('./tags/au-help')
const dotenv = require("dotenv");
const express = require('express');
const app = express();
const port = 3000;
const roleClaim = require('./role-claim')
const { MongoClient } = require('mongodb')
const MongoDBProvider = require('commando-provider-mongo')
const path = require('path')
const { CommandoClient } = require('discord.js-commando');
const advancedPolls = require('./advanced-polls')
const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const commandBase = require('./commands/command-base')
const loadFeatures = require('./features/load-features')
const mongo = require('./util/mongo')

const modLogs = require('./features/features/mod-logs')

app.get('/', (req, res) => res.send('Hello UptimeRobot Thank you!'));
app.listen(port, () => console.log(`Example app listening at com.sun.net.httpserver.HttpServer:${port}`));



//Giveaway bot
/*
If you want to make discord-economy guild based you have to use message.author.id + message.guild.id as ID for example:
eco.Daily(message.author.id + message.guild.id)
 
This will create a unique ID for each guild member
*/
 
 
//Requiring Packages
const Discord = require('discord.js'); //This can also be discord.js-commando or other node based packages!
const eco = require("discord-economy");
//Create the bot client
//const client = new Discord.Client()
const client = new CommandoClient({
  owner: '737486185466691585',
  commandPrefix: config.prefix,
  invite: 'https://discord.gg/TKKJCSX',
})

client.on('ready', async () => {
  console.log('The client is ready!')

  await mongo()

  client.registry
    .registerGroups([
      ['misc', 'misc commands'],
      ['moderation', 'moderation commands'],
      ['economy', 'Commands for the economy system'],
      ['giveaway', 'Commands to manage giveaways'],
      ['games', 'Commands to handle games'],
      ['thanks', 'Commands to help thank people'],
      ['suggestions', 'Commands regarding suggestions'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))

  commandBase.loadPrefixes(client)
  loadFeatures(client)
  loadCommands(client)

  modLogs(client)
})

const bot = client;
const guild = client.guilds.cache.get("761678800609607700");
const cooldowns = new Discord.Collection();
client.on('ready', () => {
        console.log(`${client.user.username} is up and running!`);
    })
    

//Set the prefix and token of the bot.
client.on('ready', () => {
  /*client.user.setActivity(`for E help| ${client.guilds.cache.size} servers` , {type: "WATCHING"}); */
    client.user.setStatus('online')
    client.user.setActivity(`P | epicpeacebot.xyz | ${client.guilds.cache.size} servers`, {
  type: "STREAMING",
  url: "https://twitch.tv/anongreyhat"

});
});
client.on('ready', async () => {
 await mongo().then((mongoose) => {
    try {
      console.log('Connected to mongo!')
    } finally {
      mongoose.connection.close()
    }
  })
})
client.on('ready', () => {
  console.log('The client is ready!')
  advancedPolls(client)
  roleClaim(client)

})
const settings = {
  prefix: 'P ',
  token: process.env.token
}
fs = require('fs')
var data;
fs.readFile('codes.txt', 'utf8', function (err,rawData) {
  if (err) {
    return console.log(err);
  }
  data = rawData.split('\n');
});

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function getRandomLine(){
  return data[randomInt(0,data.length)];
}


client.on('ready', () => {
  console.log('I am ready!');
});
var randomColor = Math.floor(Math.random()*16777215).toString(16);
const randomPuppy = require('random-puppy')
module.exports.run = async (bot, message, args) => {
    const subReddits = ["meme", "me_irl", "dankmeme"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const memeEm = new Discord.MessageEmbed()
    .setImage( img )
    .setTitle(`From /r/${random}`)
    .setURL(`http://reddit.com/${random}`)
    .setColor(randomColor)

}
module.exports.config = {
    name: "meme",
    description: "",
    usage: "E meme",
    accessableby: "everyone",
    aliases: []
}
client.on("message", function(message) {
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('E ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      message.reply("You didn't mention the user to ban!");
    }
  }
})

  let userApplications = {}

  client.on("message", function(message) {
    if (message.author.equals(client.user)) return;

    let authorId = message.author.id;

    if (message.content === "E apply") {
        console.log(`Apply begin for authorId ${authorId}`);
        // User is not already in a registration process
        if (!(authorId in userApplications)) {
            userApplications[authorId] = { "step" : 1}

            message.author.send("```We need to ask some questions so  we can know a litte bit about yourself```");
            message.author.send("```Application Started - Type '#Cancel' to cancel the application```");
            message.author.send("```Question 1: name#tag?```");
        }

    } else {

        if (message.channel.type === "dm" && authorId in userApplications) {
            let authorApplication = userApplications[authorId];

            if (authorApplication.step == 1 ) {
                authorApplication.answer1 = message.content;
                message.author.send("```Question 2: Age?```");
                authorApplication.step ++;
            }
            else if (authorApplication.step == 2) {
                authorApplication.answer2 = message.content;
                message.author.send("```Question 3: Timezone? NA, AU, EU, NZ, or Other? (If other, describe your timezone)```");
                authorApplication.step ++;
            }
            else if (authorApplication.step == 3) {
                authorApplication.answer3 = message.content;
                message.author.send("```Question 4: Role wanted?```");
                authorApplication.step ++;
            }

            else if (authorApplication.step == 4) {
                authorApplication.answer4 = message.content;
                message.author.send("```Thanks for your registration. PeaceAnarch will get to you Type E apply to register again```");
                //before deleting, you can send the answers to a specific channel by ID
                client.channels.cache.get("765372452238131261")
                  .send(`${message.author.tag}\n${authorApplication.answer1}\n${authorApplication.answer2}\n${authorApplication.answer3}\n${authorApplication.answer4}`);
                delete userApplications[authorId];
            }
        }
    }
  });

client.on('message', message => {
  // Ignore messages that aren't from a guild
  
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('E kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});
   
client.on('message', msg => {
  
   if (msg.content === `${settings.prefix}ping`) {
    
    var ping = Date.now() - msg.createdTimestamp + " ms";
    msg.channel.send("Your (local add-on) ping is `" + `${Date.now() - msg.createdTimestamp}` + " ms`");
}})
client.on('message', async message => {
   
  const MOD = message.member;
  const help = new Discord.MessageEmbed()
      .setTitle('Help')
      .setDescription(`
      **Current Prefix** E(space)
      -------gen--------
      {prefix}nitro - generates random nitro code
      -------info--------
       {prefix}help - this pops up  
        {prefix}balance - shows your coins
       {prefix}leaderboard - shows top players  
        {prefix}avatar - shows your avatar 
         -------currency-------
        {prefix}daily - claim daily 100 coins
        -------issues---------
       {prefix}transfer - having issues
       {prefix}coinfilp - having issues  
        {prefix}dice - having issues  
       {prefix}slots - having issues   
       {prefix}work - having issues  
        ------owner only------  
      {prefix}own-add - adds coins to owner  
        ------admin only-------  
       {prefix}delete - deletes user for db  
        {prefix} ban - bans user  
        {prefix}kick - kicks user`)
      .setColor('B0E0E6')
      .setAuthor('PeaceAnarch#2020', 'https://dsc.bio/ITSFlopItTimeYT', 'https://cdn.discordapp.com/avatars/737486185466691585/a_af8b375379e38059b62e5f3cbe2e33bb.gif')
    .setFooter('created by: PeaceAnarch#2020')
 
  //This reads the first part of your message behind your prefix to see which command you want to use.
  var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
 if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
	// ...
}
  //These are the arguments behind the commands.
  var args = message.content.split(' ').slice(1);
 
  //If the message does not start with your prefix return.
  //If the user that types a message is a bot account return.
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
  if (command === 'gstart') {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: You have to mention a valid channel!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);


}
  if (command === 'auhelp') {
    message.channel.send(auHelp.embed)
  }
if (command === 'nitro') {
  //message.reply(interval)
  message.reply(`down for now if you need help go to support`)
  message.react('❌')
}
if (command === 'meme') {
  const LINE = client.guildEmoji.guild("766390715357593600")
  message.channel.send(`
   ${LINE}${LINE}${LINE}${LINE}
   sorry doesnt work right now
   ${LINE}${LINE}${LINE}${LINE}
   `)

}
if (command === 'dmbecker') {
//69356400764203833 09beckerboy
} 
if (command === 'create') {
  var output = await eco.Daily(message.author.id)
    //output.updated will tell you if the user already claimed his/her daily yes or no.
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 1)
      message.reply(`You claimed your daily coins successfully! You now own ${profile.newbalance} coins.`);
 
    } else {
      message.react('❌')
      message.reply('nope')
    }
 
  }
  if (command === 'daily') {
 
    var output = await eco.Daily(message.author.id)
    //output.updated will tell you if the user already claimed his/her daily yes or no.
 
    if (output.updated) {
 
      var profile = await eco.AddToBalance(message.author.id, 100)
      message.reply(`You claimed your daily coins successfully! You now own ${profile.newbalance} coins.`);
 
    } else {
      message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over ${output.timetowait} you can daily again!`)
    }
 
  }
 
  if (command === 'resetdaily') {
 
    var output = await eco.ResetDaily(message.author.id)
 
    message.reply(output) //It will send 'Daily Reset.'
 
  }
 
  if (command === 'leaderboard') {
 
    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)
 
    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
    if (message.mentions.users.first()) {
 
      var output = await eco.Leaderboard({
        filter: x => x.balance > 50,
        search: message.mentions.users.first().id
      })
      message.channel.send(`The user ${message.mentions.users.first().tag} is number ${output} on my leaderboard!`);
 
    } else {
 
      eco.Leaderboard({
        limit: 3, //Only takes top 3 ( Totally Optional )
        filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await client.users.fetch(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.users.fetch(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.users.fetch(users[2].userid) //Searches for the user object in discord for third place
 
        message.channel.send(`My leaderboard:
 
1 - ${firstplace && firstplace.tag || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None'}
2 - ${secondplace && secondplace.tag || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'}
3 - ${thirdplace && thirdplace.tag || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'}`)
 
      })
 
    }
  }
  if (command === 'avatar') {
	if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	}

	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
	});

	// send the entire array of strings as a message
	// by default, discord.js will `.join()` the array with `\n`
	message.channel.send(avatarList);
}
  if (command === 'transfer') {
 
    var user = message.mentions.users.first()
    var amount = args[1]
 
    if (!user) return message.reply('Reply the user you want to send money to!')
    if (!amount) return message.reply('Specify the amount you want to pay!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to transfer!')
 
    var transfer = await eco.Transfer(message.author.id, user.id, amount)
    message.reply(`Transfering coins successfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`);
  }
 
  if (command === 'coinflip') {

    var flip = args[0] //Heads or Tails
    var amount = args[1] //Coins to gamble
 
    if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Please specify the flip, either heads or tails!')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')
 
    var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }
  if (command === 'dice') {
 
    var roll = args[0] //Should be a number between 1 and 6
    var amount = args[1] //Coins to gamble
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('Specify the roll, it should be a number between 1-6')
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')
 
    var gamble = await eco.Dice(message.channel.author, roll, amount).catch(console.error)
    message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }
 
  if (command == 'delete') { //You want to make this command admin only!
 
    var user = message.mentions.users.first()
    if (!user) return message.reply('Please specify a user I have to delete in my database!')
 
    if (!message.guild.me.hasPermission(`ADMINISTRATION`)) return message.reply('You need to be admin to execute this command!')
 
    var output = await eco.Delete(user.id)
    if (output.deleted == true) return message.reply('Successfully deleted the user out of the database!')
 
    message.reply('Error: Could not find the user in database.')
 
  }
  if (command === '0') { //I made 2 examples for this command! Both versions will work!
    var output = await eco.Work(message.author.id)
    //50% chance to fail and earn nothing. You earn between 1-100 coins. And you get one out of 20 random jobs.
    if (output.earned == 0) return message.reply('Awh, you did not do your job well so you earned nothing!')
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`)
 
 
    var output = await eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('Awh, you did not do your job well so you earned nothing!')
 
    message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`)
 
  }
 
  if (command === 'slots') {
 
    var amount = args[0] //Coins to gamble
 
    if (!amount) return message.reply('Specify the amount you want to gamble!')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')
 
    var gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)
    message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
    message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }
  if (command == 'dev-add') {
    if(!message.member.roles.cache.some(r => r.name === "Developer")){
var profile = await eco.AddToBalance(message.author.id, 10000)
      message.reply(`You claimed your dev coins successfully! You now own ${profile.newbalance} coins.`);
}
  }
  if (command == 'own-add') {
    if (message.author.id === '737486185466691585') {
	// ...
	var profile = await eco.AddToBalance(message.author.id, 6969696968)
      message.reply(`You claimed your owner coins successfully! You now own ${profile.newbalance} coins.`);
}else{
  message.react('❌')
  message.reply(`cannot use not a founder
  bettcha didnt think id catch your ass`)
  }
} 
});

client.login(process.env.token)