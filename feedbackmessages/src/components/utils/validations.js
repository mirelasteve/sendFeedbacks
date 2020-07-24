const isValidEmail = (email)=>{

    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    return (re).test(email);
}
export default (emails)=>{
    // console.log(emails);
    const invalidEmails = emails
                        .split(',')
                        .map(email=>email.trim())
                        .filter(email=>!isValidEmail(email))
    
    if(invalidEmails.length){
        const result = invalidEmails.filter(x=>x.length)
        return `Invalid emails: ${result}`
    }
    return null;
}