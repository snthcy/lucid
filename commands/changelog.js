/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const { Command, categories } = require("../classes/Command");
const { ErrorEmbed, Embed } = require("../classes/Embed")
const version = require('../version.json')

const changelog = new Command("changelog", "read latest updates for the bot", categories.INFO).setAliases(["cl"])

async function run(message, args) {
    
    const embedchangelog = new Embed(message.member, false, `${version.changelog}`)
    .setTitle(`${version.number} Updates`)

    message.channel.send(embedchangelog)
}

changelog.setRun(run)
module.exports = changelog