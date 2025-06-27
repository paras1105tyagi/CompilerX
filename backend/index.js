const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { generateInputFile } = require('./generateInputFile');
const app = express();
dotenv.config();
const {aiCodeReview} = require('./aiCodeReview');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

app.post("/run", async (req, res) => {
   
    const { language = 'cpp', code , input } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = generateFile(language, code);
        const  inputfilepath = generateInputFile(input);
        const output = await executeCpp(filePath,inputfilepath);
        
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post("/ai-review", async (req, res) => {
    const {code} = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }


    try{
         const review = await aiCodeReview(code);
         res.status(200).json({"review":review});
    } catch(error){
        res.status(500).json({
            succss: false,
            error: error.message || error.toString() ||'An error occured while executing the code'
        })
    }

});   
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});