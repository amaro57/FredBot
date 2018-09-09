exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let move = args[0].toUpperCase();
    if (move === "2B"){
        message.channel.send("" +
            "```\n" +
            "Character: Arizona | Move: 2B \n" +
            "Startup: 7f | Active: 5f | Recovery: 16f \n" +
            "Frame Adv.: -2 \n" +
            "Guard: Low | Invul: - | Notes: - \n" +
            "```");
    }
    message.channel.send({ embed });

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "arizona",
    category: "Miscelaneous",
    description: "Don't Touch the Cow.",
    usage: "arizona"
};
