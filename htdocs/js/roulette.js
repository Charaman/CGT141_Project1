const spinner_dict = {
    "IDLE" : 0,
    "SPIN" : 1
};
const passPhraseNumDict = {
    "M" : 13,
    "O" : 15,
    "N" : 14,
    "S" : 19,
    "I" : 9,
    "E" : 5,
    "U" : 21,
    "R" : 18
}
const spinner_img = {
    idleSpin : "images/random/loading-load.png",
    spinSpin : "images/random/loading-load.gif"
}
const passPhrase = ["M", "O", "N", "S", "I", "E", "U", "R"];
const password = "monsieur";
let spin_state = spinner_dict.IDLE;
let passCounter = 0;
localStorage.setItem("username", "FALSE");
document.getElementById("spinnerHandle").onclick = () => {
    set_state(spin_state, spinner_dict.SPIN)
}


function set_state(previ_state, new_state){
    let prev = previ_state;
    if(new_state == spinner_dict.SPIN){
        spin();
        
    }
    else{
        stop();
    }
    spin_state = new_state;
}
function spin(){
    let img = document.getElementById("wheel");
    img.src = spinner_img.spinSpin;
    setTimeout(() => {
        set_state(spin_state, spinner_dict.IDLE);
        passCounter = passCounter + 1;
    }, 1000)
}
function stop(){
    let img = document.getElementById("wheel");
    img.src = spinner_img.idleSpin;
    let numberField = document.getElementById("numberToSpitOut");
    if(passCounter < 9){
        numberField.innerText = passPhraseNumDict[passPhrase[passCounter]];
    }
    
}
function codeCheck(){
    let passCode = document.getElementById("codeBox").value;
    if(passCode.toLowerCase() == password){
        document.getElementById("output").disabled = false
        document.getElementById("output").hidden = false
        
    }
    else{
        console.log(passCode);
    }
}
function moveTo(){
    window.location.href ="poker.html";
}