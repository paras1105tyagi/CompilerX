const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputfilePath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
       
        exec(`g++ "${filepath}" -o "${outPath}"`, (compileError, _, compileStderr) => {
            if (compileError) {
                return reject({ error: compileError.message, stderr: compileStderr });
            }

            
            exec(`"${outPath}" < "${inputfilePath}"`, (runError, stdout, runStderr) => {
                if (runError) {
                    return reject({ error: runError.message, stderr: runStderr });
                }
                if (runStderr) {
                    return reject({ stderr: runStderr });
                }
                resolve(stdout);
            });
        });
    });
};

module.exports = {
    executeCpp,
};
