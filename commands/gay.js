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

const cooldown = new Map()

const gay = new Command("gay", "smartest gay calculator in the world", categories.FUN).setAliases(["howgay"])

async function run(message, args) {

    if (cooldown.has(message.member.id)) {
        const init = cooldown.get(message.member.id)
        const curr = new Date()
        const diff = Math.round((curr - init) / 1000)
        const time = 5 - diff

        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        let remaining

        if (minutes != 0) {
            remaining = `${minutes}m${seconds}s`
        } else {
            remaining = `${seconds}s`
        }
        return message.channel.send(new ErrorEmbed(`still on cooldown for \`${remaining}\``));
    }

    cooldown.set(message.member.id, new Date());

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 5000);

    let member

    if (args.length == 0) {
        member = message.member
    } else {
        if (!message.mentions.members.first()) {
            member = getMember(message, args[0])
        } else {
            member = message.mentions.members.first()
        }

        if (!member) {
            return message.channel.send(new errorEmbed("invalid user"));
        }
    }

    let gayRate

    gayRate = Math.ceil(Math.random() * 101) - 1

    let gayEmoji = ""

    if (gayRate >= 70) {
        gayEmoji = ":rainbow_flag:"
    } else if (gayRate >= 45) {
        gayEmoji = "🌈"
    } else if (gayRate >= 20) {
        gayEmoji = "👫"
    } else {
        gayEmoji = "📏"
    }

    const gayembed = new Embed(message.member, false, `${member.user.toString()} is **${gayRate}**% gay  ${gayEmoji}`)
        .setTitle("very accurate gay calc")

    return await message.channel.send(gayembed)
}

gay.setRun(run)
module.exports = gay