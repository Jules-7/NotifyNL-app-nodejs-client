import { NotifyClient } from 'notifications-node-client';

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
const notifyClient = new NotifyClient(apiKey);

// reset UK api URL to NotifyNL api URL
notifyClient.apiClient.urlBase = baseUrl;

export default async function handler(req, res) {

    const query = req.query;
    const { channel } = query;

    const getAllTemplates = notifyClient.getAllTemplates(channel);
    const response = await getAllTemplates;

    res.status(200).json(response.data)
  }