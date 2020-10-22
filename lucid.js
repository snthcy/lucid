/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/


// L I B R A R I E S
const mongoose = require('mongoose')
const colors = require('colors')
// const config = require("./config.json");
const version = require('./package.json')
const { runCommand, loader } = require("./utils/loader")

// I N T E G R A T I O N S
const Discord = require('discord.js')

// I N I T I L I Z A T I O N
class Lucid extends Discord.Client {

    constructor() {

        super({ autoReconnect: true });

        // this.config = config
        this.log = require('./utils/logger')
        this.commands = new Discord.Collection()
        this.cooldown = new Discord.Collection()
        let ready = false

        // const Guild = require('./models/guild')

        loader()

        // E V E N T S
        this.once("ready", async () => {

            let memberCount = 0

            await this.guilds.cache.forEach(g => {
                memberCount = memberCount + g.memberCount
            })

            this.log.logger.ready("logged in as " + this.user.tag.magenta);
            this.log.logger.info(`serving ${memberCount.toLocaleString().magenta} kids in ${this.guilds.cache.size.toLocaleString().magenta} guilds`)

            this.user.setActivity(`@lucid help | v${version.version}`, {
                type: "STREAMING",
                url: "https://www.twitch.tv/monstercat"
            });

            // mongoose.connect(this.config.mongoURL, {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     autoIndex: false,
            //     family: 4
            // });

            // waiting on top.gg to approve the bot
            this.on("guildCreate", async (guild) => {
                this.log.logger.info(`joined a new guild ${guild.name}. new count: ${this.guilds.cache.size}`)
                
                // await statsPost(client.guilds.cache.size)
                // this.log.logger.info(`guild count posted to top.gg: ${client.guilds.cache.size}`)
            })


            this.on("guildDelete", async (guild) => {
                this.log.logger.info(`removed from ${guild.name}. new count: ${this.guilds.cache.size}`)
            })


            this.on("guildMemberAdd", member => {
            })


            this.on("message", async message => {

                if (message.author.bot) return;

                // setup db and custom prefix when i get home
                let prefix = 'ld '

                if (!message.content.startsWith(prefix) || !ready) return;

                const args = message.content.substring(prefix.length).split(" ");
                const cmd = args[0].toLowerCase();

                return runCommand(cmd, message, args);
            });

            this.on("channelCreate", async channel => {
            })
        })

        setTimeout(() => {
            this.login('NzA1NTIyMzQwMTU0MzEwNzE2.Xqs64Q.wmUinySOSNqLI5kDMHpAyo9kvI4').then(() => {
                setTimeout(() => {
                    ready = true
                }, 2000)
            })
        }, 2000)
    }
}

const lucidClient = new Lucid();