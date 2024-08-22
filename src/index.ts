import axios from 'axios';
import cron from 'node-cron';
import 'dotenv/config';

const members = [
	'Michael',
	'Clarence',
	'Savelyn',
	'Avon',
	'Gavin',
	'Chris',
	'Danny',
	'Ruei',
];
members.sort();

function getCurrentWeekNumber(): number {
	const now = new Date();
	const startOfYear = new Date(now.getFullYear(), 0, 1);
	const dayOfWeek = startOfYear.getDay() || 7; // Handle Sundays as the last day of the week
	startOfYear.setDate(startOfYear.getDate() + (8 - dayOfWeek));
	const weekNumber = Math.ceil(
		(now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000) + 1
	);
	return weekNumber;
}

// Function to pick a member based on the current week
function pickMemberForWeek(members: string[]): string | null {
	if (members.length === 0) return null; // Handle empty array case
	const weekNumber = getCurrentWeekNumber();
	const offset = 6;
	const memberIndex = (weekNumber + offset) % members.length;
	return members[memberIndex];
}

// Get the selected member for this week
const selectedMember = pickMemberForWeek(members);
console.log(`Selected member for this week: ${selectedMember}`);

// Your Slack Incoming WebHook URL
const webhookUrl: string = process.env.WEBHOOK_URL || '';

// Function to send message to Slack
async function sendMessage(): Promise<void> {
	if (!webhookUrl) {
		console.error('Webhook URL is not set.');
		return;
	}

	const payload = {
		text: `Good morning! This is your daily reminder at 9 AM (UTC+8). Today's host is ${selectedMember}.`,
		icon_emoji: 'ghost',
		username: 'Who is the host?',
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
	'0 9 * * 1-5',
	// '* * * * 1-5',
	() => {
		console.log('Sending daily message at 9 AM (UTC+8)...');
		sendMessage();
	},
	{
		timezone: 'Asia/Taipei', // Set timezone to UTC+8
	}
);

console.log('Cron job scheduled to send a message every day at 9 AM (UTC+8).');
