module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Returns latency and API ping',
    help: 'scrim [time] [map] [rank] [description]',
    usage: '<input>',
    run: async (client, msg, args) => {
        const localMsg = await msg.channel.send(`⏳ Pinging...`);
        localMsg.edit(
            `Latency is ${Math.floor(
                localMsg.createdAt - msg.createdAt
            )}ms\nAPI Latency is ${Math.round(client.ping)}ms`
        );
    },
};
