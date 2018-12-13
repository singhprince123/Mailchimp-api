const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


//body-parser
app.use(bodyParser.urlencoded({extended: true}));

//static folder

app.use(express.static(path.join(__dirname, 'public')));

//signup Route

app.post('/signup', (req, res ) => {
    const {firstName,lastName , email} = req.body;
    
    if(!firstName || !lastName || !email){
        res.redirect('/fail.html');
        return;
    }
    
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME : lastName

                }

            }
        ]
    }
    
    const postData = JSON.stringify(data);

    const options = {
        url : 'https://us19.api.mailchimp.com/3.0/lists/6f65eed3a2',
        method: 'POST',
        headers: {
            Authorization: 'auth 9510995c228833427ad56d7252750aae-us19'
        },
        body: postData

    }

    request(options, (err ,response, body) => {
     if(err){
         res.redirect('/fail.html')
     } else {
         if(response.statusCode === 200){
             res.redirect('/success.html')
         }else {
             res.redirect('/fail.html')
         }
     }
    })
})

const port = process.env.PORT || 3000;  

app.listen(port, console.log(`server started listening on port ${port}`) )