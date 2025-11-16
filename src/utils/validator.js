const validator = require("validator")

const validate = (data)=>{


    console.log("Hii");
    const mandatoryField = ['firstName', 'lastName', 'emailId', 'password'];
    const IsAllowed = mandatoryField.every((k)=>Object.keys(data).includes(k));
    console.log(IsAllowed);
    if(!IsAllowed) {
        throw new Error("Some field missing");
    }
    if(!validator.isEmail(data.emailId)) {
        throw new Error("Invalid Email");
    } 
    if(!validator.isStrongPassword(data.password)) {
        throw new Error("Week password");
    }
    console.log("hii");

}
module.exports = validate;