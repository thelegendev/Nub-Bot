<img align="center" alt="Nub Bot banner" src="https://cdn.discordapp.com/attachments/1042013863886999602/1121271560855097374/Text.png">

<p align="center">
<img align="center" alt="GitHub issues" src="https://img.shields.io/github/issues/TheLegenDev/Nub-Bot?style=for-the-badge"> 
<img align="center" alt="GitHub license" src="https://img.shields.io/github/license/TheLegenDev/Nub-Bot?style=for-the-badge">
</p>

<p align="center">
A multipurpose discord bot based on discord.js v14.
</p>

> **Warning**
> If you plan to host a public instance of Nub Bot by using our source code, you are not allowed to use either Nub Bot's username or its app icon.

> **Note**
> If you plan to use our source code for your project, it would be appreciated if you credit us.
> We do not provide coding support. You are expected to solve your personal issue(s) with necessary knowledge. However, if you discover any issue(s) within the public instance of Nub Bot, feel free to report it [here](https://github.com/TheLegenDev/Nub-Bot/issues).

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

    1. Fork the Github project :
       1. Sign up / Sign in to [GitHub](https://github.com/).
       2. Navigate to [Nub-Bot](https://github.com/TheLegenDev/Nub-Bot).
       3. Click `Star` to support development.
       4. Click `Fork` to copy all code to your own repository.
   
    2. Click the `Code` button. From the drop-down that appears, click `Download ZIP` to download the entire repository as a ZIP folder.

    3. Extract the files to a new folder and open it with [Visual Studio Code](https://code.visualstudio.com/download).


- **Obtain Discord Bot Token**

    1. Sign in to [Discord Developer Portal](https://discord.com/developers/applications).

    2. Create a bot :
        1. Enter the left side `Applications`.
        2. Click `New Application` in the upper right corner and enter the name of the bot. After confirmation, enter the new page.
        3. Click on the left side `Bot`.
        4. Enable all intents listed under `Privileged Gateway Intents` and click `Save Changes`.
        5. View and copy the token by clicking the `Reset Token` button.
   
    3. Set up OAuth2 :
        1. Click on `OAuth2` in the left column.
        2. Click on `URL Generator` in the left column.
        3. In the right column, select `bot` and `applications.commands` under `SCOPES`.
        4. Scroll down and select `Administrator` under `BOT PERMISSIONS`.
        5. Copy the URL at the bottom and paste it into your browser.
        6. Choose the server you want to add the bot to and click `Continue` > `Authorize`.


- **Obtain MongoDB Connection String**

    1. Sign up / Sign in to [MongoDB](https://www.mongodb.com).
    2. Choose your preferred cloud database plan.
    3. Customise the cluster settings to your preference and click `Create Cluster`.
    4. Navigate to the `Network Access` page, click `Add IP Address` and select `Allow access from anywhere`.
    5. Navigate back to the `Database` page and click `Connect`.
    6. Create a `database user`, click `Choose a connection method` and select `Connect your application`.
    7. Copy your connection string and replace `<password>` with the password for the database user that you created earlier.


- **Project Execution**

    1. Navigate to the `Bot` page on the [Discord Developer Portal](https://discord.com/developers/applications) and click `Reset Token`. Afterwards, create a `.env` file within the root directory.
    2. Paste your bot token into the `TOKEN` variable inside the `.env` file.
    3. Paste your [MongoDB](https://www.mongodb.com) connection string into the `MONGODBURL` variable inside the `.env` file.
    4. Navigate to the `OAuth2` page and copy the `CLIENT ID`. 
    5. Paste your client ID into the `clientId` variable inside the `handleCommands.js` file.
    6. Navigate to your discord server, enable developer mode and right click the dropdown beside the server name. 
    7. Click `Copy Server ID` and paste it into the `guildId` variable inside the `handleCommands.js` file.
    8. Navigate to the `package.json` file and pay attention to the packages listed under `dependencies`.
    9. Open the terminal in [Visual Studio Code](https://code.visualstudio.com/download) and install all necessary packages using `npm i <package-name>`. 
    For example :
    ```js
    npm i discord.js
    ```
    10. Open a new terminal and type `node .` or `node src/index.js` in there to turn the bot online.
        
## Contributing
We're open to accepting contributions. Please refer to our [contributing guide](https://github.com/TheLegenDev/Nub-Bot/blob/main/CONTRIBUTING.md) before making one.

## Support
Connect with us on [Discord](https://discord.gg/URZnqtEbsQ) for support / any related inquiry.

## License
Released under the terms of [GNU General Public License v3.0](https://github.com/TheLegenDev/Nub-Bot/blob/main/LICENSE) license.
