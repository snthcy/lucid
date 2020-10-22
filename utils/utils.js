/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

// const { topgg } = require("../config.json")
// const dbl = new DBL(topgg)
const mongoose = require('mongoose')

// async function statsPost (guildCount) {
//     return await dbl.postStats(guildCount)
// }

// exports.statsPost = statsPost


function randomFromArray (array) {
  if (Array.isArray(array)) {
    return array[Math.floor(Math.random() * array.length)]
  }
}

exports.randomFromArray = randomFromArray



