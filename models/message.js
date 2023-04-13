const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    timestamp: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

MessageSchema.virtual('date').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Message', MessageSchema);