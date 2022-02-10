web3= new Web3(window.web3.currentProvider); 
var contractAddress='0x316665a1A4769d37117F48d9989D004b8Fda4718';
var decentralized_address_p = document.getElementById('decentralized_address');
var abi;
var currentAccount;
//var current_account_position;

var c_abi;
var smartcontract;
var claims;
var test_claim = {
    123:{
        name: "ls",
        description : "Hello world",
        tokens: "100"
    }
}

if(window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
        window.location.reload();
    });
}

async function getCurrentAccount(){
    const acc = await ethereum.request({ method: 'eth_requestAccounts'});
    return acc[0];
}
function sleepMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getLastBlockTimestamp() {
    return (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp;
}

async function setChainTimestamp(ts) {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_setTimestamp',
        params: [ ts ],
    }, () => {});
    // for unknown reason, omitting the second parameter (callback) fails in my environment
}

async function mineBlockWithTS(ts) {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [ts],
    }, () => {});

    await setChainTimestamp(ts);
}

async function fastForward(offset) {
    const t0 = await getLastBlockTimestamp();
    await alignToSystemClock();
    await mineBlockWithTS(t0 + offset);
    return t0 + offset;
}

$.getJSON('../smartlottery.json').then(function(data){
    c_abi = data['abi'];
    //App.contracts.lottery = TruffleContract(auctionArtifact);
    smartcontract = new web3.eth.Contract(c_abi,contractAddress);
    getCurrentAccount().then((value)=>{document.getElementById('decentralized_address').innerHTML+=value; currentAccount = value;});
});


function func(){
    var ownerfunc=document.getElementById("ownerfun");
var playerfunc=document.getElementById("playerfun");
    playerfunc.style.display = "none";
    ownerfunc.style.display = "block";
    document.getElementById("registerfun").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("buytickets").style.display = "none";
}
function func2(){
    var ownerfunc=document.getElementById("ownerfun");
var playerfunc=document.getElementById("playerfun");
    playerfunc.style.display = "block";
     ownerfunc.style.display = "none";
     document.getElementById("registerfun").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("buytickets").style.display = "none";
    document.getElementById("startlot").style.display = "none";
}
function regfun(){

    document.getElementById("registerfun").style.display = "block";
    document.getElementById("update").style.display = "none";
    document.getElementById("buytickets").style.display = "none";
    document.getElementById("startlot").style.display = "none";

}

function updateno(){
    document.getElementById("registerfun").style.display = "none";
    document.getElementById("update").style.display = "block";
    document.getElementById("buytickets").style.display = "none";
    document.getElementById("startlot").style.display = "none";

}
function tickets(){
    document.getElementById("registerfun").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("buytickets").style.display = "block";
    document.getElementById("startlot").style.display = "none";


}
function startlottery(){
    document.getElementById("registerfun").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("buytickets").style.display = "none";
    document.getElementById("startlot").style.display = "block";

}

function registerplayer(add,tokens){
    var success=1;
    var tmp = async function(){ 
        try{
            //alert('hai');
            var tmp1 = add;
            var tmp2 = tokens;
            var tmp3 = currentAccount;
            return await smartcontract.methods.register(add,tokens).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Registration Successfull");
        }
    }); 
}
function startlotteries(time,gain){
    var success=1;
    var tmp = async function(){ 
        try{
           // alert('hai');
            var tmp1 = time;
            var tmp2 = gain;
            //var tmp3 = currentAccount;
            alert(time);
            alert(gain);
            return await smartcontract.methods.startLottery(time,gain).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction Failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Lottery Started");
        }
    }); 
}
function updatewinners(number){
var success=1;
    var tmp = async function(){ 
        try{
            return await smartcontract.methods.UpdateNumberofWinners(number).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("updated Winners");
        }
    }); 
}
function buyticks(number){
var success=1;
    var tmp = async function(){ 
        try{
           // alert('hai');
            //var tmp1 = add;
            //var tmp2 = tokens;
            //var tmp3 = currentAccount;
          //  alert(number);
            return await smartcontract.methods.buyTicket(number).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success:Brought "+number+"Tickets");
        }
    }); 

}
function prin(value) {
    alert(p)
    document.getElementById('tokensaddress').innerHTML =value;
}
function tokenadd()
{
   var success=1;
    var tmp = async function(){ 
        try{
            // alert('hai');
            //var tmp1 = add;
            //var tmp2 = tokens;
            //var tmp3 = currentAccount;
            p= await smartcontract.methods.seeTokenaddress().call({from:currentAccount});
            //alert(p)
            k=document.getElementById('tok');
            u=document.getElementById('tok');
            u.innerHTML+=`<div class="row justify-content-md-center">
            <p id="tok" class="font-italic" style="margin-top: 60px;">Token Address</p>
        </div>`;
            k.innerHTML+=p;
           // k.style.display = "block";
            //document.write(p);
            //alert(JSON.stringify(p))
            //str = JSON.stringify(p);
            //const k = smartcontract.methods.t.call();
            //console.log(JSON.stringify(k));
            //alert(k);
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        //window.print(val);
        if(success==1){
            alert("Success");
        }
    }); 
  //   web3.eth.getStorageAt('0xC7C175553A0835270d0F2A7Ab49e866A92dcc008', 0,
  //   function (err, gain) {
  //   console.log("Current gain: " + parseInt(gain, 16));
  // });
}
function winners()
{
   var success=1;
    var tmp = async function(){ 
        try{
            // alert('hai');
            //var tmp1 = add;
            //var tmp2 = tokens;
            //var tmp3 = currentAccount;
            var p= await smartcontract.methods.seeWinners().call({from:currentAccount});
            k=document.getElementById('tok');
            u=document.getElementById('tok');
            u.innerHTML+=`<div class="row justify-content-md-center">
            <p id="tok" class="font-italic" style="margin-top: 60px;">Winners</p>
        </div>`;
        for(let i = 0; i < p.length; i++){
            k.innerHTML+=p[i];
          }
           // k.innerHTML+=p;
          //  document.getElementById('tokensaddress').innerHTML+=p
            alert(p)
            //print(p)
            //alert(JSON.stringify(p))
            //str = JSON.stringify(p);
            //const k = smartcontract.methods.t.call();
            //console.log(JSON.stringify(k));
            //alert(k);
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    }); 

}
function generatewinners(){
    var success=1;
    var tmp = async function(){ 
        try{
           // alert('hai');
            //var tmp1 = add;
            //var tmp2 = tokens;
            //var tmp3 = currentAccount;
            return await smartcontract.methods.generateWinningTicket().send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Winners Generated!");
        }
    }); 
}    

function settlepayment(){
    var success=1;
    var tmp = async function(){ 
        try{
            alert('hai');
            //var tmp1 = add;
            //var tmp2 = tokens;
            //var tmp3 = currentAccount;
            return await smartcontract.methods.settlePayment().send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Payment Settled!");
        }

    }); 

} 