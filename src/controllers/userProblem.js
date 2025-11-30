const {getLanguageId, submitBatch, submitToken} = require("../utils/problemUtility");
const Problem = require("../models/problem");


const problemCreate = async(req, resp) => {
    const {title, description, difficulty, tags,
        visibleTestCases, invisibleTestCases, startCode, 
        referenceSolution
    } = req.body;

    try {
        for(const {language, completeCode} of referenceSolution) {
            const languageId = getLanguageId(language);

            const submissions = visibleTestCases.map((testCase)=>({
                source_code: Buffer.from(completeCode).toString('base64'),
                language_id:languageId,
                stdin: Buffer.from(testCase.input).toString('base64'),
                expected_output: Buffer.from(testCase.output).toString('base64')
            }))
            const submitResult = await submitBatch(submissions);
            const resultToken = submitResult.map((value)=>value.token);

            
            const testResult = await submitToken(resultToken);

            for(const test of testResult) {
                if(test.status.id != 3) {
                    return resp.status(400).send(`Test case failed: ${test.status.description}`);
                }
            }
            const userProblem = await Problem.create({
                ...req.body,
                problemCreator : req.user._id 
            })
            resp.status(201).send("Problem Saved Successfully");
        }      
    }
    catch(error) {
        resp.status(400).send("Error: "+error);
    }
}

module.exports = problemCreate;

