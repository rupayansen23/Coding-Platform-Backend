const axios = require('axios');

const getLanguageId = (lang)=>{
    const language = {
        "c++" :54,
        "java" :62,
        "javascript":63,
    }
    return language[lang.toLowerCase()];
}
const submitBatch = async (submissionsArr)=>{
    
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'true'
        },
        headers: {
            'x-rapidapi-key': 'b307fa7a49msh2bf1a83ede98f56p1951e0jsnd70027ef674b',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions : submissionsArr
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return await fetchData();
}

const waiting = async (timer) => {
    setTimeout(()=>{
        return 1;
    }, timer)
}

const submitToken = async (resultToken)=>{
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(","),
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': 'b307fa7a49msh2bf1a83ede98f56p1951e0jsnd70027ef674b',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            //console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }

    while(true) {
        const result = await fetchData();
        const isResultObtained = result.submissions.every((r)=>r.status_id > 2);
        if(isResultObtained) {
            return result.submissions;
        }
        await waiting(1000);
    }

}

module.exports = {getLanguageId, submitBatch, submitToken};