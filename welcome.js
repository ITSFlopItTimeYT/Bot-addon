/*module.exports = (client) => {
  const channelId = '762846462299340801' // welcome channel
  const targetChannelId = '762846454808969216' // rules and info

  client.on('guildMemberAdd', (member) => {
    const message = `Please welcome <@${
      member.id
    }> to the server! Check out ${member.guild.channels.cache
      .get(targetChannelId)
      .toString()}`

    const channel = member.guild.channels.cache.get(channelId)
    channel.send(message)
  })
} */