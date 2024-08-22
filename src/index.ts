import axios from 'axios';
import cron from 'node-cron';

// Your Slack Incoming WebHook URL
const playground =
	'https://hooks.slack.com/services/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';
const webhookUrl: string = playground;

// Function to send message to Slack
async function sendMessage(): Promise<void> {
	const payload = {
		text: 'Good morning! This is your daily reminder at 9 AM (UTC+8).',
		icon_emoji: 'ghost',
		username: 'Who is the host',
	};

	try {
		const response = await axios.post(webhookUrl, payload);
		console.log('Message sent:', response.data);
	} catch (error) {
		console.error('Error sending message:', error);
	}
}

// Schedule the message to be sent every day at 9 AM (UTC+8)
cron.schedule(
	'* * * * *',
	() => {
		console.log('Sending daily message at 9 AM (UTC+8)...');
		sendMessage();
	},
	{
		timezone: 'Asia/Taipei', // Set timezone to UTC+8
	}
);

console.log('Cron job scheduled to send a message every day at 9 AM (UTC+8).');
