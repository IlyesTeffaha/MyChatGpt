import  express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration,OpenAIApi } from "openai";

dotenv.config();

var MyKey ="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";

const configuration = new Configuration({
    apiKey : MyKey,
});

 

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());

app.use(express.json())

app.get('/', async (req,res)=>{
 res.status(200).send({
    message:'Hello from MychatAi',
 })
});

app.post('/', async (req,res)=>{
    try {
        const prompt = req.body.prompt;
console.log(prompt)
        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${prompt}`,
            temperature:0,
            max_tokens:3000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0,
            

        });

        res.status(200).send({
            bot:response.data.choices[0].text
        })
        console.log({bot:response.data.choices[0].text})
    } catch (error) {
        console.log(error);
        res.send({error})
    }
})


app.listen(5000, ()=> console.log("server is running on port 5000"));