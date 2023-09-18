import { NotifyClient } from 'notifications-node-client';

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
const notifyClient = new NotifyClient(apiKey);

// reset UK api URL to NotifyNL api URL
notifyClient.apiClient.urlBase = baseUrl;

export default async function handler(req, res) {

    const payload = req.body;
	const templateId = payload.templateId;
	const recipient = payload.recipient;
	const personalisation = payload.personalisation;
	const channel = payload.channel;

	let sendMessage;

	if (channel === "sms") {
		sendMessage = notifyClient.sendSms(templateId, recipient, { personalisation });
	} else if (channel === "email") {
		sendMessage = notifyClient.sendEmail(templateId, recipient, { personalisation });
	};

	const response = await sendMessage;
    res.status(200).json(response.data)
}