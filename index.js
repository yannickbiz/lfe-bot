const { Client, Collection, RichEmbed } = require('discord.js');
require('dotenv').config();

const client = new Client();
const newUsers = new Collection();
const prefix = '!';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
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
    if (!msg.guild) return; // exit if msg is not from this serv
    if (!msg.content.startsWith(prefix)) return; // exit if msg don't start with {prefix}
    if (msg.author.bot) return; // exit if msg is from bot

    const args = msg.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch (cmd) {
        case 'ping':
            msg.reply('Pong!');
            break;
        case 'scrim':
            // !scrim [time] [map] [rank] [description]
            const [time, map, rank, ...description] = args;

            const ScrimRichEmbed = new RichEmbed()
                .setColor(3447003)
                .setAuthor(msg.author.username, msg.author.avatarURL)
                .setTitle('Looking for Scrim')
                .setURL('http://google.com')
                .setDescription(description.join(' '))
                .addField('Time', time, true)
                .addField('Map', map, true)
                .addField('Rank', rank, true)
                .setTimestamp()
                .setFooter('© lfesports.com', client.user.avatarURL);

            msg.channel.send(ScrimRichEmbed).then(function(msg) {
                msg.react('\u{1F440}');
            });
            break;
    }
});

client.login(process.env.token);
