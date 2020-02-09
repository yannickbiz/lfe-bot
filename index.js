const { Client, Collection, RichEmbed } = require('discord.js');
const chalk = require('chalk');
require('dotenv').config();

const client = new Client();
const newUsers = new Collection();
const prefix = '!';

client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('ready', () => {
    console.log(`Logged in as ${chalk.blue.underline.bold(client.user.tag)}`);
});

client.on('guildCreate', guild => {
    client.user.setPresence({
        status: 'online',
        game: {
            name: 'lfesports.com',
            type: 'PLAYING',
        },
    });
});

client.on('guildDelete', guild => {
    client.user.setPresence({
        status: 'offline',
        game: {},
    });
});

client.on('guildMemberAdd', member => {
    newUsers.set(member.id, member.user);
    member.send(
        'This server is using lfe-bot, visit lfesports.com for more informations'
    );
});

client.on('guildMemberRemove', member => {
    if (newUsers.has(member.id)) newUsers.delete(member.id);
});

client.on('message', async msg => {
    if (!msg.guild) return;
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    // If msg.member is uncached, cache it.
    if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

    const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) command.run(client, msg, args);
});

client.login(process.env.token);
