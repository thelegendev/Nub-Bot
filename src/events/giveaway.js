const { GiveawaysManager: gw } = require('discord-giveaways');
const giveawaySchema = require('../schemas/giveaway.js');
 
module.exports = class GiveawaysManager extends gw {
    async getAllGiveaways() {
        return await giveawaySchema.find().lean().exec();
    }
 
    async saveGiveaway(giveawayData) {
        return await giveawaySchema.create(giveawayData);
    }
 
    async editGiveaway(messageId, giveawayData) {
        return await giveawaySchema.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
    }
 
    async deleteGiveaway(messageId) {
        return await giveawaySchema.deleteOne({ messageId }).exec();
    }
};