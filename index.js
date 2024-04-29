require('dotenv').config();
const { Client, MessageEmbed } = require("discord.js");
const keepAlive = require('./server.js');
const express = require('express');
const app = express();
const port = 8080;

// create main route
app.get('/', (req, res) => res.send('RTX GAMING!'));

// instantiate server
app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));
keepAlive();

async function errorEmbed(text, message) {
  const newembed = new MessageEmbed()
    .setColor("#FF7676")
    .setDescription(`**❌ | ${text} **`);
  return message.channel.send(newembed);
}

const client = new Client({
  disableEveryone: true
});

const axios = require("axios");

const channel_id = "1166637421195178075"; // Put your channel id in "".

client.on('message', async (message) => {
  if (!message.guild || message.author.bot) return;
  try {
    if (message.channel.id !== channel_id) return;
    let res = await axios.get(`http://api.brainshop.ai/get?bid=159454&key=RKi4jqvbEarRLLq2&uid=[uid]&msg=[msg]=${encodeURIComponent(message.content)}`);
    message.reply(res.data.cnt);
  } catch {
    errorEmbed(`Bot error, please try again!`, message);
  }
});

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} is online 

███████╗██╗░░██╗███████╗████████╗███████╗██████╗░
██╔════╝╚██╗██╔╝██╔════╝╚══██╔══╝██╔════╝██╔══██╗
█████╗░░░╚███╔╝░█████╗░░░░░██║░░░█████╗░░██████╔╝
██╔══╝░░░██╔██╗░██╔══╝░░░░░██║░░░██╔══╝░░██╔══██╗
███████╗██╔╝╚██╗███████╗░░░██║░░░███████╗██║░░██║
╚══════╝╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝`);

  client.user.setActivity("discord.gg/gamertags");
});

client.login(process.env.TOKEN);
