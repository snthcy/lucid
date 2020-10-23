/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const { MessageEmbed, GuildMember } = require("discord.js")
const { getColor } = require("../utils/utils")

// custom embed
exports.Embed = class {

    constructor(member, footer, text) {
        this.embed = new MessageEmbed()

        if (member) {
            this.embed.setColor('c173ff')
        }

        if (text) {
            if (text.length > 2000) {
                text = text.substr(0, 2000)
            }
            this.embed.setDescription(text)
        }

        if (footer) {
            this.embed.setFooter("bot.smexay.xyz")
        }
        return this
    }

    setDescription(text) {
        if (text.length > 2000) {
            text = text.substr(0, 2000)
        }
        this.embed.setDescription(text)
        return this
    }

    addField(title, text, inline) {
        if (text.length > 1000) {
            text = text.substr(0, 1000)
        }
        this.embed.addField(title, text, inline)
        return this
    }

    setTitle(text) {
        this.embed.setTitle(text)
        return this
    }

    setImage(url) {
        this.embed.setImage(url)
        return this
    }

    setThumbnail(url) {
        this.embed.setThumbnail(url)
        return this
    }

    setURL(url) {
        this.embed.setURL(url)
        return this
    }

    setHeader(text) {
        this.embed.setAuthor(text)
        return this
    }

    setFooter(text) {
        this.embed.setFooter(text)
        return this
    }

    setColor(color) {
        this.embed.setColor(color)
        return this
    }
}

// error embed
exports.ErrorEmbed = class {

    constructor(text) {

        let answers = ['um no?', 'lol nah', 'try again', 'what dont you understand', 'bruh', 'leav me alone', 'dude stop', 'sorry, but no', 'do you have autism?', 'dude chill', 'frick no']
        let answerchoice = Math.floor(Math.random() * answers.length)
        this.embed = new MessageEmbed().setColor("#e31937")
        this.embed.setTitle("`❌`" + '  ' + answers[answerchoice])
        this.embed.setDescription(text)
        return this
    }

    setDescription(text) {
        if (text.length > 2000) {
            text = text.substr(0, 2000)
        }
        this.embed.setDescription(text)
        return this
    }

    addField(title, text, inline) {
        if (text.length > 1000) {
            text = text.substr(0, 1000)
        }
        this.embed.addField(title, text, inline)
        return this
    }

    setTitle(text) {
        this.embed.setTitle(text)
        return this
    }

    setImage(url) {
        this.embed.setImage(url)
        return this
    }

    setThumbnail(url) {
        this.embed.setThumbnail(url)
        return this
    }

    setURL(url) {
        this.embed.setURL(url)
        return this
    }

    setHeader(text) {
        this.embed.setAuthor(text)
        return this
    }

    setFooter(text) {
        this.embed.setFooter(text)
        return this
    }

    setColor(color) {
        this.embed.setColor(color)
        return this
    }
}