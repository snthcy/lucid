/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const fs = require("fs");
let { command, categories } = require("../classes/Command")
const { embed } = require("../classes/Embed");
const log = require('./logger')
const color = require('color')

const commands = new Map()
const aliases = new Map()
const cooldown = new Set()

function loader() {

    // load the commands
    log.logger.log(`loading commands..`)
    let commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

    // delete the command cache
    if (commands.size > 0) {

        for (command of commands.keys()) {
            delete require.cache[require.resolve(`../commands/${command}.js`)]
        }
        commands.clear()
    }

    // load each command into a table
    for (file of commandFiles) {
        try {
            command = require(`../commands/${file}`);

            let enabled = true;

            // if no ___ disable the command
            if (!command.name || !command.description || !command.run || !command.category) {
                enabled = false;
            }

            // each enabled command to array
            if (enabled) {
                commands.set(command.name, command);
                if (command.aliases) {
                    for (f of command.aliases) {
                        aliases.set(f, command.name)
                        log.logger.log('>' + ` registered command ${file} (name: ${command.name} | aliases: ${command.aliases})`.green)
                    }
                }
            }
        } catch (e) {
            console.log('>' + ` skipped command bc error: ${e}`)
        }
    }
    exports.aliasesSize = aliases.size
    exports.commandsSize = commands.size
}

async function help(message) {
    let prefix = 'placeholder'
    const helpEmbed = new embed(message.member, false, `bot.smexay.xyz`)
        .setHeader('lucid help')
        .setDescription(`The prefix for **${message.guild}** is \`${prefix}\``)
        .setColor('ffffff')
        .addField('useful resources', '[website](https://example.com)\n' + '[commands list](https://example.com)\n' + '[support server](https://example.com)\n' + '[status](https://example.com)', false)

    await message.channel.send(helpEmbed)
}

function runCmd(cmd, message, args) {
    if (cmd == "help") {
        return help(message, args)
    }

    let alias = false
    if (!commandExists(cmd)) {
        if (!aliases.has(cmd)) {
            return
        } else {
            alias = true
        }
    }

    // cooldown
    if (cooldown.has(message.author.id)) return

    cooldown.add(message.author.id)

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, 500)

    // permissions
    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return

    if (!message.guild.me.hasPermission("EMBED_LINKS")) {
        return message.channel.send("`❌` i am lacking permission `EMBED_LINKS`")
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("`❌` i am lacking permission `MANAGE_MESSAGES`")
    }

    try {
        log.logCommand(message, args)
        if (alias) {
            commands.get(aliases.get(cmd)).run(message, args)
        } else {
            commands.get(cmd).run(message, args)
        }
    } catch (e) {
        console.log(e)
    }
}

function commandExists(cmd) {
    if (commands.has(cmd)) {
        return true
    } else {
        return false
    }
}

exports.help = help
exports.loader = loader
exports.runCommand = runCmd
exports.commandExists = commandExists