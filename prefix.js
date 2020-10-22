const prefixes = {E };

exports.g = (msg) => {
  if (msg.guild && prefixes[msg.guild.id] !== undefined) return prefixes[msg.guild.id];
  else return "$";
}

exports.e = (prefix, msg) => {
  if (prefix.length == 0) return false;
  prefixes[msg.guild.id] = prefix;
  return true;
}