# WARNING
Selfbots are against Discord's Terms of Service.
Which can be found at https://discord.com/guidelines and https://discord.com/terms

This code is strictly educational.

I am not liable for any accounts that get moderated by Discord due to the use of this selfbot.

# Setup
Open **.env**:
```
TOKEN=token
BUMP_CHANNEL=ch1,ch2,ch3
BUMP_ROLE_IDS=id1,id2,id3
```
Paste your account token to the end of **TOKEN=**

Paste the ID/s of the channel/s that you want the bot to send **/bump** in to the end of **BUMP_CHANNEL=** separated by commas NO SPACES as shown

Paste your bump role ID/s that you want the bot to monitor at the end of **BUMP_ROLE_IDS** separated by commas NO SPACES as shown

# Running the Bot

Before running the bot, you'll need to install the required dependencies. Run the following command in the root directory of your project:

```bash
npm install
```

This will install all the necessary packages for this software.

Once the dependencies are installed, you can run the bot with:

```bash
node index.js
```

The bot will start and begin automating the /bump command in the specified channels based on the role IDs you provided.

# How to get your user token
1. Open Discord
2. Press `CTRL+SHIFT+I` to open the Developer Console
3. Copy and paste the code below into the console to automatically copy your user token to the clipboard.
```js
window.webpackChunkdiscord_app.push([[Math.random()], {}, (req) => {for (const m of Object.keys(req.c).map((x) => req.c[x].exports).filter((x) => x)) {if (m.default && m.default.getToken !== undefined) {return copy(m.default.getToken())}if (m.getToken !== undefined) {return copy(m.getToken())}}}]); console.log("%cDone!", "font-size: 50px"); console.log(`%cYou now have your token in the clipboard!`, "font-size: 16px")
```
(Token script taken from https://github.com/Discord-Oxygen/Discord-Oxygen-source)