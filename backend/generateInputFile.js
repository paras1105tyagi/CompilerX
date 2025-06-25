const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');


const dirInput = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInput)) {
    fs.mkdirSync(dirInput, { recursive: true });
}

const generateInputFile = (input) => {
    const jobID = uuid();
    const inputFilename = `${jobID}.txt`;
    const inputFilePath = path.join(dirInput, inputFilename);
    fs.writeFileSync(inputFilePath, input);
    return inputFilePath;
};

module.exports = {
    generateInputFile,
};


