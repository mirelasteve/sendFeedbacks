const keys = require('../../config/config');

module.exports = (survey ) =>{
return (
    `
    <html>
 
    <body style='background-image: linear-gradient(to right top, #3d6870, #3a626c, #375c68, #345664, #32505f, #365b67, #3c656f, #437075, #608e84, #8aab8f, #bdc59c, #f5deb3);background-repeat:no-repeat;'>
    <div style='color:#F5DEB3'>
        <h1>${survey.title}</h1>
        <h3>${survey.subject}</h3>
        <h3>${survey.body}</h3>
        <div style='display: inline;'>
            <a style='display: inline;' href="${keys.redirectDomain}/api/surveys/${survey.id}/yes"><button 
            style='background-color: #4CAB32; /* Green */
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;'>Yes</button></a>
        </div>
        <div style='display: inline;'>
            <a style='display: inline;' href="${keys.redirectDomain}/api/surveys/${survey.id}/no"><button 
            style='background-color:orange;
                    border: none;
                    color: red;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;'>No</button></a>
        </div>
       
    </div>
    
    
    </body>
    </html>`
)}