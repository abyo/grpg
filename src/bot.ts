import AkairoBotClient from './client/AkairoBotClient';
import dotenv from "dotenv"; dotenv.config();

const client: AkairoBotClient = new AkairoBotClient({
  owner: process.env.owner,
  token: process.env.token
});

client.start();
