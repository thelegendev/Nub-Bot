<img align="center" alt="Nub Bot banner" src="https://cdn.discordapp.com/attachments/1042013863886999602/1121271560855097374/Text.png">

<p align="center">
<img align="center" alt="GitHub issues" src="https://img.shields.io/github/issues/TheLegenDev/Nub-Bot?style=for-the-badge"> 
<img align="center" alt="GitHub" src="https://img.shields.io/github/license/TheLegenDev/Nub-Bot?style=for-the-badge">
</p>

<p align="center">
A multipurpose discord bot based on discord.js v14.
</p>

> **Warning**
> If you plan to host a public instance of our bot by using our source code, you are not allowed to use neither our bot's username nor its app icon.

> **Note**
> If you plan to use our source code for your project, it'd be appreciated if you would credit us; preferably within your bot.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Installation
- Download [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- Download [Visual Studio Code](https://code.visualstudio.com/download).

## Usage
- **Project Setup**

    1. Fork the Github project:
       1. Sign up / Sign in to [GitHub](https://github.com/).
       2. Navigate to [Nub-Bot](https://github.com/TheLegenDev/Nub-Bot).
       3. Click `Star` to support development.
       4. Click `Fork` to copy all code to your own repository.
   
    2. Click the `Code` button. From the drop-down that appears, click `Download ZIP` to download the entire repository as a ZIP folder.

    3. Extract the files to a new folder and open it with [Visual Studio Code](https://code.visualstudio.com/download).


- **Obtain Discord Bot Token**

    1. Sign in to [Discord Developer Portal](https://discord.com/developers/applications).

    2. Create a bot:
        1. Enter the left side `Applications`.
        2. Click `New Application` in the upper right corner and enter the name of the bot. After confirmation, enter the new page.
        3. Click on the left side `Bot`.
        4. Click on the right side `Add Bot`.
        6. Enable all intents under `Privileged Gateway Intents`.
        7. Click `Save Changes`.
        8. The token can be viewed by selecting `View Token` on the top or there will be a `Reset Token` button if it has already been applied.
   
    3. Set up OAuth2
        1. Click on `OAuth2` in the left column.
        2. Click on `URL Generator` in the left column.
        3. In the right column, select bot under `SCOPES` and select `Administrator` under `BOT PERMISSIONS` at the bottom right.
        4. Copy the URL at the bottom and paste it into your browser.
        5. Choose the server you want to add the bot to.
        6. Click `Continue` > `Authorize`.


- **Obtain MongoDB Connection String**

    1. Sign up / Sign in to [MongoDB](https://www.mongodb.com).
    2. Choose your preferred cloud database plan.
    3. Customise the cluster settings to your preference and click `Create Cluster`.
    4. Navigate to the `Network Access` page, click `Add IP Address` and select `Allow access from anywhere`.
    5. Navigate back to the `Database` page and click `Connect`.
    6. Create a `database user`, click `Choose a connection method` and select `Connect your application`.
    7. Copy your connection string and replace `<password>` with the password for the database user that you created earlier.


- **Project Execution**

    1. Navigate to the `Bot` page on the [Discord Developer Portal](https://discord.com/developers/applications) and click `Reset Token`.
    2. Paste your bot token into the `token` variable inside the `.env` file.
    3. Paste your [MongoDB](https://www.mongodb.com) connection string into the `MONGODBURL` variable inside the `.env` file.
    4. Navigate to the `OAuth2` page and copy the `CLIENT ID`. 
    5. Paste your client ID into the `clientId` variable inside the `handleCommands.js` file.
    6. Navigate to your discord server, enable developer mode and right click the dropdown beside the server name. 
    7. Click `Copy Server ID` and paste it into the `guildId` variable inside the `handleCommands.js` file.
    8. Navigate to the `package.json` file and pay attention to the packages listed under `dependencies`.
    9. Open the terminal inside [Visual Studio Code](https://code.visualstudio.com/download) and install all the packages using `npm i <package-name>`. 
    for instance,
    ```js
    npm i discord.js
    ```
    10. Click the `run` button inside the terminal and type `node src/index.js` or `node .` to turn the bot online.
        
## Contributing
We're open to accepting contributions. Please refer to our [contributing guide](https://github.com/TheLegenDev/Nub-Bot/blob/main/CONTRIBUTING.md) before making one.

## Support
Join us on [Discord](https://discord.gg/URZnqtEbsQ) to get in touch today!

## License
Released under the terms of [GNU General Public License v3.0](https://github.com/TheLegenDev/Nub-Bot/blob/main/LICENSE) license.
