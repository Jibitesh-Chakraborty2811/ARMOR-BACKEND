const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 5000;

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jibiteshheva@gmail.com',
    pass: 'ioof kgjf oupe ickr'
  }
});


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin:'*'}))

let data =[
    {
        name:'Jibitesh Chakraborty',
        uid:'Jibitesh',
        password:'Jibimax@123',
        email : 'jibitesh.chakraborty.281102@gmail.com',
        address : '19A, Ballygunge Place East, Kolkata-19',
        contact : 'jibitesh.chakraborty.281102@gmail.com',
        emergency : ['jibitesh.chakraborty.281102@gmail.com','jibitesh.chakraborty.cse24@heritageit.edu.in','jibiteshchakraborty74984@gmail.com'],
        aadhaar : '123456789012'

    }
]

app.get('/', (req, res) => {
    res.send('Hello, world! This is a simple Express.js app.');
});

// Assuming you have already initialized 'client' with Twilio

app.post('/panic/:uid/:latitude/:longitude', async (req, res) => {
    const uid = req.params.uid;
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;

    console.log(uid)
    console.log(latitude)
    console.log(longitude)

    const sendMessage = async (contact) => {
        /*try {
            const message = await client.messages.create({
                from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
                to: 'whatsapp:' + contact, // Destination number
                body: `${uid} needs your help https://www.google.com/maps?q=${latitude},${longitude}`
            });
            console.log('Message sent successfully!');
            console.log('Message SID:', message.sid);
        } catch (error) {
            console.error('Error sending message:', error);
            //res.status(500).json({ error: 'Error sending message' });
        }*/
        var mailOptions = {
            from: 'jibiteshheva@gmail.com',
            to: contact,
            subject: 'HELP ALERT',
            text: `${uid} needs your help https://www.google.com/maps?q=${latitude},${longitude}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    };

    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        if (data[i].uid === uid) {
            console.log(data[i].uid);
            const emergency = data[i].emergency;
            for (let j = 0; j < emergency.length; j++) {
                console.log(emergency[j])
                await sendMessage(emergency[j]); // Wait for each message to be sent
            }
            break; // Exit the loop once the emergency contacts are found
        }
    }

    for (let i = 0; i < data.length; i++) {
        if(data[i].uid === uid)
        {
            continue;
        }
            
        console.log(data[i])
        contact = data[i].contact;
        await sendMessage(contact);
    }

    res.json({ message: 'Successfully sent SOS' });
});

app.post('/alert/:uid/:latitude/:longitude', async (req, res) => {
    const uid = req.params.uid;
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;

    console.log(uid)
    console.log(latitude)
    console.log(longitude)

    const sendMessage = async (contact) => {
        /*try {
            const message = await client.messages.create({
                from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
                to: 'whatsapp:' + contact, // Destination number
                body: `${uid} needs your help https://www.google.com/maps?q=${latitude},${longitude}`
            });
            console.log('Message sent successfully!');
            console.log('Message SID:', message.sid);
        } catch (error) {
            console.error('Error sending message:', error);
            //res.status(500).json({ error: 'Error sending message' });
        }*/
        var mailOptions = {
            from: 'jibiteshheva@gmail.com',
            to: contact,
            subject: 'HELP ALERT',
            text: `${uid} needs your help https://www.google.com/maps?q=${latitude},${longitude}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    };

    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        if (data[i].uid === uid) {
            console.log(data[i].uid);
            const emergency = data[i].emergency;
            for (let j = 0; j < emergency.length; j++) {
                console.log(emergency[j])
                await sendMessage(emergency[j]); // Wait for each message to be sent
            }
            break; // Exit the loop once the emergency contacts are found
        }
    }

    

    res.json({ message: 'Successfully sent SOS' });
});

app.post('/auth/:uid/:password',(req,res)=>{

    uid = req.params.uid;
    password = req.params.password;

    for(let i = 0; i < data.length; i++)
    {
        if(data[i].uid === uid && data[i].password === password)
        {
            res.status(200).json({message:'user authentication successful'});
            break;
        }

    }

    res.status(500).json({message:'user not found'});

});

app.get('/profile/:uid',(req,res)=>{
    uid = req.params.uid;

    for(let i = 0; i < data.length; i++)
    {
        if(data[i].uid === uid)
        {
            res.json(data[i]);
            break;
        }
    }

    res.json({message:'Not Found'});
});

app.post('/signup/:name/:uid/:password/:email/:address/:contact/:emergency1/:emergency2/:emergency3/:aadhaar',(req,res) =>{
    username = req.params.name;
    uid = req.params.uid;
    password = req.params.password;
    email = req.params.email;
    address = req.params.address;
    contact = req.params.contact;
    emergency1 = req.params.emergency1;
    emergency2 = req.params.emergency2;
    emergency3 = req.params.emergency3;
    aadhaar = req.params.aadhaar;

    newdata = {
        name:username,
        uid:uid,
        password:password,
        email:email,
        address:address,
        contact : contact,
        emergency : [emergency1,emergency2,emergency3],
        aadhaar : aadhaar


    }

    data.push(newdata)

    res.json({message:'New User addedd'})
})



app.listen(port,()=>{
    console.log('App Started At Port 5000')
})