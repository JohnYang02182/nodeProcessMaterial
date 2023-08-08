import axios from 'axios';
import express from 'express';
import { Configuration, OpenAIApi } from "openai";
import { post } from './request.js'
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(express.json());

console.log('getAccessKey ',process.env.OPENAI_KEY);
var count = 0;

const configuration = new Configuration({
    organization: "org-0WE6MMTqaQ4l9MCiC4ZdGWsH",
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
export const completion = async (Inputparams) => await openai.createChatCompletion({
    model: "gpt-3.5-tubo",
    messages: [
        {
            role: "system",
            content: "You are empathic and always encourage people when they fail, feel frustrated, feel sad."
        },
        {
            role: "user", 
            content: Inputparams
        }
    ]
})

const chatLint = async(param) => {
  return await post('https://api.openai.com/v1/chat/completions', param);
}

app.post('/api/chat',async (req,res) => {
  if(count >= 5){
    return res.status[404].json({ message: 'Over the limit of today.'});
  }
  let saveReqInfo = req.body;
  const parameterOpenAi = completion(saveReqInfo);
  try {
    const getOpenAiRes = await chatLint(parameterOpenAi);
    res.status[200].json(getOpenAiRes);
    count = count +1;
  } catch(error) {
    const errorMessage = `We got the ${error}.`;
    res.status[404].json(errorMessage);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});