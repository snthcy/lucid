/*
    __               _     __
   / /   __  _______(_)___/ /
  / /   / / / / ___/ / __  / 
 / /___/ /_/ / /__/ / /_/ /  
/_____/\__,_/\___/_/\__,_/   (c) 2020 smexay. Subject to the AGPLv3 license.
*/

const { colorConsole } = require('tracer')
const colors = require('colors')

const logger = colorConsole({
  format: [
    '{{timestamp}} | {{title}} | {{file}} | {{message}}',
    {
      debug: `{{timestamp}} | ${'{{title}}'.magenta} | {{file}} | {{message}}`,
      cmd: `{{timestamp}} | ${'{{title}}'.white} | {{file}} | {{message}}`,
      info: `{{timestamp}} | ${'{{title}}'.cyan} | {{file}} | {{message}}`,
      ready: `{{timestamp}} | ${'{{title}}'.green} | {{file}} | {{message}}`,
      warn: `{{timestamp}} | ${'{{title}}'.yellow} | {{file}} | {{message}}`,
      error: `{{timestamp}} | ${'{{title}}'.red} | {{file}} | {{message}}`,
      load: `{{timestamp}} | ${'{{title}}'.yellow} | {{message}}`
    }
  ],
  dateformat: 'yyyy-mm-dd"T"HH:MM:ss',
  methods: ['cmd', 'debug', 'info', 'ready', 'warn', 'error'],
  filters: [colors.white]
})

const logCommand = (message, args) => {
  args.shift();

  let content = message.content

  if (content.length > 75) {
      content = content.substr(0, 75) + "..."
  }

  const msg = `${message.guild.name} (${message.guild.id}) sent by ${message.author.tag} (${message.author.id}): ${content}`
  logger.cmd(msg);
}

module.exports = {
  logger: logger,
  logCommand: logCommand
}

