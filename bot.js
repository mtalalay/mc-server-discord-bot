import { Client, GatewayIntentBits } from 'discord.js';
import { spawn } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();
const adminUsername = process.env.ADMIN_ID;

const client = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent
]});
const prefix = '!';
let minecraftProcess = null;
let count = 0;

client.once('ready', () => {
  console.log('Bot is ready!');
  setInterval(checkForInactivity, 300000);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'startmc':
      if (minecraftProcess !== null) {
        message.reply('Minecraft server already running');
      } else {
        count = 0;
        minecraftProcess = spawn('start_server.bat', [], { shell: true });

        minecraftProcess.stdout.on('data', (data) => {
          console.log(`Minecraft Server: ${data}`);
          if (data.includes('[Server thread/INFO]: There are 0 of a max of')) {
            count++;
            if (count > 1) {
              message.reply('Stopping Minecraft server due to inactivity...');
              minecraftProcess.stdin.write("stop\n");
              minecraftProcess.once('exit', (code, signal) => {
                console.log(`Minecraft process exited with code ${code} and signal ${signal}`);
                minecraftProcess = null;
                message.reply('Minecraft server stopped');
              });
            }
          }
        });

        minecraftProcess.stderr.on('data', (data) => {
          console.error(`Error: ${data}`);
        });

        message.reply('Starting Minecraft server...');
      }
      break;
    case 'stopmc':
      if (minecraftProcess === null) {
        message.reply('Minecraft server already stopped');
      } else {
        message.reply('Stopping Minecraft server...');
        minecraftProcess.stdin.write("stop\n");
        minecraftProcess.once('exit', (code, signal) => {
          console.log(`Minecraft process exited with code ${code} and signal ${signal}`);
          minecraftProcess = null;
          message.reply('Minecraft server stopped');
        });
      }
      break;
    case 'ip':
      const admin = message.guild.members.cache.find(member => member.user.username === adminUsername);
      if (admin) {
          message.reply(`${admin}, ${message.author} has requested the IP.`);
      } else {
          console.log('Admin not found.');
      }
      break;
    case 'help':
      message.reply("All commands are listed below:\n" +
                    "`!ip`: Alerts the server admin that you would like the server IP\n" +
                    "`!startmc`: Starts the Minecraft server\n" +
                    "`!stopmc`: Stops the Minecraft server");
      break;
    default:
      message.reply(`\`!${command}\` is not a recognized command. Type \`!help\` for a list of commands`);
      break;
  }
});

const discordToken = process.env.DISCORD_TOKEN;
client.login(discordToken);

function checkForInactivity() {
  if (minecraftProcess !== null) {
    console.log('Checking for Inactivity...')
    minecraftProcess.stdin.write("list\n");
  }
}
