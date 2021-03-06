const embeds = require("../plugins/embeds");
const database = require("../plugins/database");
const { sleep } = require("../plugins/util");

module.exports.default = async (client, message) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    const target = message.mentions.members.first();
    const author = await message.member.user.id;
    const whitelistRole = "727637167370797187";
    let targetId = target.id;

    if (targetId) {
      if (!target.roles.cache.has(whitelistRole)) {
        let user = await database.User.findById(targetId);
        if (user) {
          targetId = user._id;
          const aprovedChannel = client.channels.cache.get(
            "734850572376866978"
          );
          await target.roles.add("727637167370797187");
          await target.setNickname(user.nickname);
          await aprovedChannel.send(
            embeds.aprovedEmbed(targetId, user.nickname, author)
          );
          await target.send(embeds.aprovedEmbedPv(targetId, user.nickname));
        } else {
          const msg = await message.channel.send(
            `O usuário <@${targetId}> não existe no banco de dados`
          );
          await sleep(7000);
          await msg.delete();
        }
      } else {
        const msg = await message.channel.send(
          `O usuário <@${targetId}> já possui Whitelist`
        );
        await sleep(7000);
        await msg.delete();
      }
    }
  }
};
