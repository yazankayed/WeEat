const Restraunt = require('../models/restraunt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
       auth: {
          user: 'ykayed99@gmail.com',
          pass: 'aqswdefrgthy',
       },
  secure: true,
  });

  


//controller to provide meal types
exports.email = (req,res) =>{
  const mailData = {
    from: 'ykayed99@gmail.com',  // sender address
      to: 'y.arefkayed@gmail.com',   // list of receivers
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
    };
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else{
        console.log(info);
        console.log("sddddddddddfffffghfgfdasdfg")
      }
  });
}


//controller to provide meal types
exports.getWidget = (req,res,next) =>{
  Restraunt.distinct('type')
   
  .then(products => {
      res.json({"widgets" : products})
    })
  .catch(err => console.log(err));
}

//controller to provide available cities
exports.getCities = (req,res,next) =>{
  Restraunt.distinct('city_name')
   .then(products => {
      res.json({"cities" : products})
    })
  .catch(err => console.log(err));
}