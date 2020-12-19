const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const nodemailer = require('nodemailer');
const { response } = require('express');

const app = express();

app.use(express.json())

app.use((require, response, next) =>{
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Methods", "  GET, PUT, POST, DELETE ")
    response.header("Access-Control-Allow-Headers", "X-PINGOTHER, CONTENT-TYPE, AUTHORIZATION   ")
    app.use(cors())
    next();
})


require('./models/Budget')
const Budget = mongoose.model('Budget')



mongoose.connect('mongodb://localhost:27017/teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    
}).catch((err) =>{
    
});

app.post('/orcamento', async (require, response) =>{

    await Budget.create(require.body, (err) => {

        if(err) return response.status(400).json({
            error: true,
            message: "Erro: Solicitação de orçamento não enviado com sucesso"
        })

        return response.status(400).json({
            error: false,
            message: "Solicitação de orçamento enviada com sucesso"
        })
    })

    var automaticEmail = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a2ab0431c78ea4", 
          pass: "3c7e00a96342b6", 
        },
      });

    var emailHtml = '<p>ola email</p>';    

    var emailText = 'Ola Email auto';  

    var emailSendInfo = {
        from: "74911b42f8-572a15@inbox.mailtrap.io",
        to: require.body.email,
        subject: "Hello ✔", 
        text: emailText, 
        html: emailHtml, 
    }

    await automaticEmail.sendMail(emailSendInfo, function(err){
        if(err) return response.status(400).json({
            error: true,
            message: "Erro: Solicitação de orçamento não enviado com sucesso" 
        })

        return response.json({
            error: false,
            message: "Solicitação de orçamento enviado com sucesso"
        })
    })
 
    
})

app.listen(8080)