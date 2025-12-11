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
    idleSpin : "images/rouletteWheel/rouletteWheel.png",
    spinSpin : "images/rouletteWheel/rouletteWheel.gif"
}
const passPhrase = ["M", "O", "N", "S", "I", "E", "U", "R"];
const password = "monsieur";
let spin_state = spinner_dict.IDLE;
let passCounter = 0;
localStorage.setItem("username", "FALSE");
document.getElementById("wheel").onclick = () => {
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
    if(passCounter < passPhrase.length){
        let img = document.getElementById("wheel");
        img.src = spinner_img.spinSpin;
        setTimeout(() => {
            set_state(spin_state, spinner_dict.IDLE);
            passCounter = passCounter + 1;
        }, 1000)
    }
}
function stop(){
    let img = document.getElementById("wheel");
    img.src = spinner_img.idleSpin;
    let numberField = document.getElementById("numberToSpitOut");
    if(passCounter < passPhrase.length){
        numberField.innerText = passPhraseNumDict[passPhrase[passCounter]];
    }
    
}
function codeCheck(){
    let passCode = document.getElementById("codeBox").value;
    if(passCode.toLowerCase() == password){
        document.getElementById("output").disabled = false;
        document.getElementById("buttonToNextRoom").style.opacity = "1";
    }
    else{
        console.log(passCode);
    }
}
function moveTo(){
    window.location.href = "poker.html";
}