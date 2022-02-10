var express = require('./node_modules/express');
var app = express();

app.use(express.static('src'));
app.use(express.static('../smartlottery-contracts/build/contracts'));
app.use(express.json());


app.get('/', function (req, res) {
  res.render('index.html');
});

// if (typeof localStorage === "undefined" || localStorage === null) {
//   LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./src');
//   localStorage.removeItem('flagIndex')
// }

// if(localStorage.getItem('flagIndex')==='undefined' || localStorage.getItem('flagIndex')===null ) {
//   localStorage.setItem('flagIndex.json', Math.floor((Math.random() * 243) + 1));
// }

 app.listen(3939, function () {
   console.log('Smart Lottery Dapp listening on port 3939!');
 });

// app.post('/saveClaimDetails',(req,res) => {
//     var inputData = req.body;
//     var inputKey = Object.keys(inputData)[0];
//     const fs = require('fs');
//     var next_id = -1;
//     fs.readFile("./files/claims.json", (err, data) => {  // READ
//         if (err) {
//             //return console.error(err);
//             res.sendStatus(500);
//             return;
//         };
    
        
//         var data = JSON.parse(data.toString());
//         userData = inputData[inputKey];
//         var next_id = data["next_id"];
//         data["next_id"]+=1;
//         data[next_id] = inputData[inputKey];

//         fs.writeFile("./files/claims.json", JSON.stringify(data), (err, result) => {  // WRITE
//             if (err) {
//                 //return console.error(err);
//                 res.sendStatus(500);
//                 return;
//             } else {
//                 console.log(result);
//                 console.log("Success");
//                 res.send(String(next_id));
//             }
//         });
//     });
//     //console.log(next_id);
//     //res.send(String(next_id));
// })

// app.get('/getAllClaims',(req,res)=>{
//     const fs = require('fs');
//     fs.readFile("./files/claims.json", (err, data) => {  // READ
//         if (err) {
//             console.error(err);
//             res.sendStatus(500);
//             return;
//         };
    
//         var data = JSON.parse(data.toString());
//         //console.log(data);
//         res.send(JSON.stringify(data));
//         return;
//     })
// })

// app.post('/removeClaimDetails',(req,res)=>{
//     var receivedJSON = req.body;
//     var receivedId = Object.keys(receivedJSON)[0];
//     console.log(receivedId);

//     const fs = require('fs');
//     fs.readFile("./files/claims.json", (err, data) => {  // READ
//         if (err) {
//             //return console.error(err);
//             res.sendStatus(500);
//             return;
//         };
    
//         var data = JSON.parse(data.toString());
//         delete data[receivedId];

//         fs.writeFile("./files/claims.json", JSON.stringify(data), (err, result) => {  // WRITE
//             if (err) {
//                 //return console.error(err);
//                 res.sendStatus(500);
//                 return;
//             } else {
//                 console.log(result);
//                 console.log("Success");
//                 res.sendStatus(200);
//             }
//         });
//     });
// })