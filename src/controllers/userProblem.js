const {getLanguageId, submitBatch, submitToken} = require("../utils/problemUtility");
const Problem = require("../models/problem");


const problemCreate = async(req, resp) => {
    const {title, description, difficulty, tags,
        visibleTestCases, invisibleTestCases, startCode, 
        referenceSolution, problemCreator
    } = req.body;
    console.log(req.body);

    try {
        for(const {language, completeCode} of referenceSolution) {
            const languageId = getLanguageId(language);
            //console.log(typeof(visibleTestCases), "1");
            const submissions = visibleTestCases.map((testCase)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin: testCase.input,
                expected_output : testCase.output
            }))
            const submitResult = await submitBatch(submissions);
            // console.log(typeof(submitResult), "2");
            console.log(submitResult);
            const resultToken = submitResult.map((value)=>value.token);
            const testResult = submitToken(resultToken);
            for(const test of testResult) {
                if(test.result_id != 3) {
                    return resp.status(400).send("error occured");
                }
            }
            console.log(hii);
            const userProblem = Problem.create({
                ...req.body,
                problemCreator : req.result._id 
            })
            resp.status(201).send("Problem Saved Successfully");
        }      
    }
    catch(error) {
        resp.status(400).send("Error: "+error);
    }
}

module.exports = problemCreate;

