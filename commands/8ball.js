/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const { Command, categories } = require("../classes/Command")
const { Embed, ErrorEmbed } = require("../classes/Embed")
const { randomFromArray } = require("../utils/utils")

const answers = ["as i see it, yes",
    "ask again later",
    "better not tell you now",
    "cannot predict now",
    "concentrate and ask again",
    "don’t count on it",
    "it is certain",
    "it is decidedly so",
    "most likely",
    "my reply is no",
    "my sources say no",
    "outlook not so good",
    "outlook good",
    "reply hazy, try again",
    "signs point to yes",
    "very doubtful",
    "without a doubt",
    "yes.",
    "yes – definitely",
    "you may rely on it"]

const cooldown = new Map()

const eightball = new Command("8ball", "ask the 8ball a question", categories.FUN)

async function run(message, args) {

    if (cooldown.has(message.member.id)) {
        const init = cooldown.get(message.member.id)
        const current = new Date()
        const difference = Math.round((current - init) / 1000)
        const time = 5 - difference

        const minutes = Math.floor(time / 60)
        const seconds = time - minutes * 60

        let remaining

        if (minutes != 0) {
            remaining = `${minutes}m${seconds}s`
        } else {
            remaining = `${seconds}s`
        }
        return message.channel.send(new ErrorEmbed(`you are still on cooldown for \`${remaining}\``));
    }
    if (args.length == 0) {
        return message.channel.send(new ErrorEmbed("you must ask the 8ball something"))
    }

    cooldown.set(message.member.id, new Date());

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 5000);

    const question = args.join(" ")

    const embed8ball = new Embed(message.member, false, `**${question}** - ${message.member.user.toString()}\n\n🎱 ${randomFromArray(answers)}`)

    message.channel.send(embed8ball)
}

eightball.setRun(run)
module.exports = eightball