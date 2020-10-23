/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const { Command, categories } = require("../classes/Command");
const { ErrorEmbed, Embed } = require("../classes/Embed")

const ping = new Command("ping", "haha bot speed go brrr", categories.INFO).setAliases(["pong"])

async function run(message, args) {

    const now =  new Date().getTime()
    const msg = await message.channel.send("pinging..")
    
    const pingembed = new Embed(message.member, false, "**bot** - `" + (msg.createdTimestamp - message.createdTimestamp) + "ms`\n" + "**api** - `" + Math.round(message.client.ws.ping) + "ms`")
    return await msg.edit(pingembed)
}

ping.setRun(run)
module.exports = ping