/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

exports.Command = class {
    
    constructor(name, description, category, permissions, aliases, run) {
        this.name = name.toString()
        this.description = description.toString()
        if (Object.values(categories).indexOf(category) == -1) throw new Error("not a valid category")
        this.category = category
        return this
    }

    setPermissions(permissions) {
        this.permissions = permissions
        return this
    }

    setAliases(aliases) {
        this.aliases = aliases
        return this
    }

    setRun(run) {
        this.run = run
        return this
    }
}

const categories = {
    NONE: "none",
    FUN: "fun",
    INFO: "info",
    MONEY: "money", // ;)
    MODERATION: "moderation",
}

exports.categories = categories