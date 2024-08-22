"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
// Your Slack Incoming WebHook URL
const playground = 'https://hooks.slack.com/services/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';
const webhookUrl = playground;
// Function to send message to Slack
function sendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            text: 'Good morning! This is your daily reminder at 9 AM (UTC+8).',
            icon_emoji: 'ghost',
            username: 'Who is the host',
        };
        try {
            const response = yield axios_1.default.post(webhookUrl, payload);
            console.log('Message sent:', response.data);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    });
}
// Schedule the message to be sent every day at 9 AM (UTC+8)
node_cron_1.default.schedule('* * * * *', () => {
    console.log('Sending daily message at 9 AM (UTC+8)...');
    sendMessage();
}, {
    timezone: 'Asia/Taipei', // Set timezone to UTC+8
});
console.log('Cron job scheduled to send a message every day at 9 AM (UTC+8).');
