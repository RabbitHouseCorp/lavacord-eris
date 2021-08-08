"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const lavacord_1 = require("lavacord");
class Manager extends lavacord_1.Manager {
    constructor(client, nodes, options) {
        super(nodes, options || {});
        this.client = client;
        this.send = packet => {
            const guild = this.client.guilds.get(packet.d.guild_id);
            if (!guild)
                return;
            return guild.shard.sendWS(packet.op, packet.d);
        };
        client
            .once("ready", () => {
            this.user = client.user.id;
            this.shards = client.shards.size || 1;
        })
            .on("rawWS", async (packet) => {
            switch (packet.t) {
                case "VOICE_SERVER_UPDATE":
                    await this.voiceServerUpdate(packet.d);
                    break;
                case "VOICE_STATE_UPDATE":
                    await this.voiceStateUpdate(packet.d);
                    break;
                case "GUILD_CREATE":
                    for (const state of packet.d.voice_states)
                        await this.voiceStateUpdate({ ...state, guild_id: packet.d.id });
                    break;
            }
        });
    }
}
exports.Manager = Manager;
//# sourceMappingURL=index.js.map