/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const { Command, categories } = require("../classes/Command");
const { getMember } = require("../utils/utils");
const { ErrorEmbed, Embed } = require("../classes/Embed")

const avatar = new Command("avatar", "get a users avatar", categories.INFO).setAliases(["av"])

async function run(message, args)  {

    let member;

    if (args.length == 0) {
        member = message.member;
    } else {
        if (!message.mentions.members.first()) {
            member = getMember(message, args.join(" "));
        } else {
            member = message.mentions.members.first();
        }
    }

    if (!member) {
        return message.channel.send(new ErrorEmbed("invalid user"));
    }

    const embedav = new Embed(member, false)
        .setTitle(member.user.tag)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
        .setDescription(`[\`png\`](${member.user.avatarURL({ format: 'png', size: 2048 })}) | [\`jpg\`](${member.user.avatarURL({ format: 'jpg', size: 2048 })})  | [\`gif\`](${member.user.avatarURL({ format: 'gif', size: 2048 })}) | [\`webp\`](${member.user.avatarURL({ format: 'webp', size: 2048 })})`, true)

    message.channel.send(embedav)
}

avatar.setRun(run)
module.exports = avatar