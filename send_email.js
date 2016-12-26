var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'testmail@zoho.com',
        pass: '123456'
    }
});

//var mainOptions;
/*fs.readFile('../dynamodb_node/test.ejs', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    mainOptions = {
        from: '"Tester" testmail@zoho.com',
        to: "totest@zoho.com",
        subject: 'Hello, world',
        html: ejs.render(data, { name: 'Stranger' }, sendMailCallback)
    };
    //console.log("html datat ======================>", mainOptions.html);
    console.log("html datat ======================>");
});*/


ejs.renderFile(__dirname + "/test.ejs", { name: 'Stranger' }, function (err, data) {

    if (err) {
        console.log(err);
    } else {
        var mainOptions = {
            from: '"Tester" testmail@zoho.com',
            to: "totest@zoho.com",
            subject: 'Hello, world',
            html: data
        };
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }


});