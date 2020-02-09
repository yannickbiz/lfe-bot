const { RichEmbed } = require('discord.js');

module.exports = {
    name: 'scrim',
    aliases: ['scrimmage'],
    category: 'core',
    description: 'Create looking for scrim post',
    help: 'scrim [time] [map] [rank] [description]',
    usage: '<input>',
    run: async (client, msg, args) => {
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
    },
};
