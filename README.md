
# Minecraft Server Controller Discord Bot

  

This Discord bot acts as a controller for a locally run Minecraft server. It is designed to allow members of a Discord server to start and stop a Minecraft server running on a host's Windows computer. The server automatically closes after a significant period of inactivity in order to keep your host's resources as free as possible.

  

## Setup

  

 1. Install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

 2. Clone the repository.

 3. Create a `.env` file within the project root with the following structure:

	> DISCORD_TOKEN=\<YOUR DISCORD BOT TOKEN HERE\>    
	> ADMIN_ID=\<YOUR DISCORD USERNAME HERE\>

 4. Run `npm install` within the project root.
 5. Download the `server.jar` file from the [Minecraft website](https://www.minecraft.net/en-us/download/server) and place it within the server folder in the project root.
 6. Complete the setup of the Minecraft server as usual (run `server.jar`, agree to EULA, port forward, etc.), then stop the server.
 7. Create the discord bot:
 
    Visit the [Discord Developer Portal](discord.com/developers/applications), create a new application, and give the bot a name. Navigate to the Bot subsection, **uncheck Public Bot and Requires OAuth2 Code Grant**. Copy and paste the token into the DISCORD_TOKEN field in your .env file. Navigate to the OAuth2 subsection, under OAuth2 URL Generator check *bot*, then under Bot Permissions, check *Send Messages* and *Read Messages/View Channels*. Copy and paste the generated URL into your browser and invite the bot to your server.

## Running the bot

There are two methods for running the bot, it can be setup as a windows background service or run from the console.

### Background service

run `node windows-service.js install` in the project root.

### Console



run `node bot.js` in the project root.  This will be much better for debugging because it provides access to the Minecraft server's and the bot's console outputs.