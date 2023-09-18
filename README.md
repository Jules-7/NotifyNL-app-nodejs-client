This is an example Next.js application that illustrates how [notifications-node-client](https://www.npmjs.com/package/notifications-node-client) can be used to send SMS and emails using [NotifyNL](https://sandbox.notifynl.nl/) API.

## Requirements

* API key. You can create an API key by signing into your account on [NotifyNL](https://sandbox.notifynl.nl/) and going to `API integration`.

## Running the app locally

1. Create `.env.local` by copying `.env.local.example`
1. Replace `<API_KEY>` with the API key created via [NotifyNL](https://sandbox.notifynl.nl/)
1. Run `$ npm install` to install all the dependencies
1. Run `$npm run dev` to start the development server on [http://localhost:3000](http://localhost:3000)
