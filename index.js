require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}\n`);

    try {
        const channelIds = process.env.BUMP_CHANNELS.split(',');
        const roleIds = process.env.BUMP_ROLE_IDS.split(',');

        console.log('--- Loaded Channels ---');
        for (const id of channelIds) {
            try {
                const channel = await client.channels.fetch(id);
                const server = channel.guild;
                console.log(`Channel: ${channel.name} (ID: ${channel.id}) in Server: ${server.name} (ID: ${server.id})`);
            } catch (error) {
                console.error(`Error fetching channel ID ${id}: ${error.message}`);
            }
        }

        console.log('\n--- Loaded Roles ---');
        for (const roleId of roleIds) {
            let roleFound = false;
            client.guilds.cache.forEach((guild) => {
                const role = guild.roles.cache.get(roleId);
                if (role) {
                    console.log(`Role: ${role.name} (ID: ${role.id}) in Server: ${guild.name} (ID: ${guild.id})`);
                    roleFound = true;
                }
            });
            if (!roleFound) {
                console.error(`Role ID ${roleId} not found in any server.`);
            }
        }

        async function bump(channel, role) {
            try {
                const timestamp = new Date().toLocaleString();

                console.log(`\n--- Bump Details ---`);
                console.log(`Timestamp: ${timestamp}`);
                console.log(`Server: ${channel.guild.name} (ID: ${channel.guild.id})`);
                console.log(`Role: ${role.name} (ID: ${role.id})`);
                console.log(`Channel: ${channel.name} (ID: ${channel.id})`);

                await channel.sendSlash('302050872383242240', 'bump');
                console.count('Bumped!');
            } catch (error) {
                console.error('Error sending bump:', error.message);
            }
        }

        client.on('messageCreate', async (message) => {
            if (channelIds.includes(message.channel.id)) {
                roleIds.forEach(async (roleId) => {
                    if (message.content.includes(`<@&${roleId}>`)) {
                        const role = message.guild.roles.cache.get(roleId);

                        if (role) {
                            const timestamp = new Date().toLocaleString();

                            console.log(`\n--- Role Ping Detected ---`);
                            console.log(`Timestamp: ${timestamp}`);
                            console.log(`Server: ${message.guild.name} (ID: ${message.guild.id})`);
                            console.log(`Role: ${role.name} (ID: ${role.id})`);
                            console.log(`Channel: ${message.channel.name} (ID: ${message.channel.id})`);

                            await bump(message.channel, role);
                        } else {
                            console.error(`Role ID ${roleId} not found in guild.`);
                        }
                    }
                });
            }
        });

    } catch (error) {
        console.error('Error setting up client:', error.message);
    }
});

client.login(process.env.TOKEN);
