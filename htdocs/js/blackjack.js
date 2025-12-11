const turnState = {
    "PLAYER" : 0,
    "AI" : 1,
    "JUDGE" : 2
}
const cards = {
    "ACE" : 1,
    "TWO" : 2,
    "THREE" : 3,
    "FOUR" : 4,
    "FIVE" : 5,
    "SIX" : 6,
    "SEVEN" : 7,
    "EIGHT" : 8,
    "NINE" : 9,
    "TEN" : 10,
    "JACK" : 10,
    "QUEEN" : 10,
    "KING" : 10
}
const cardNames = ["ACE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "JACK", "QUEEN", "KING"]
let state = turnState.PLAYER;
let ai_Turns = 0
let ref_elem = "---"
let ref_elem2 = "---"
let goal = 3
let code = 9754
document.getElementById("hit").onclick = () => {
    if(state == turnState.PLAYER){
        ref_elem = "scoreResultPlayer"
        ref_elem2 = "cardShowPlayer"
        hit();
    }
}
document.getElementById("stand").onclick = () => {
    if(state == turnState.PLAYER){
        stand(turnState.AI);
    }
}
function set_state(prev_state, new_state){
    let previous = prev_state;
    if(new_state == turnState.AI){
        ref_elem = "scoreResultAI"
        ref_elem2 = "cardShowAI"
        ai_Run()
    }
    else if(new_state == turnState.JUDGE){
        judgeScore()
    }
    state = new_state;
}
function hit(){
    let randomPick = Math.round(Math.random() * 12);
    let name = cardNames[randomPick];
    let rolledScore = cards[name];
    let imgLink = "images/cards/" + name + ".png";
    let prev_score = Number(document.getElementById(ref_elem).innerText);
    
    document.getElementById(ref_elem).innerText = rolledScore + prev_score;
    document.getElementById(ref_elem2).src = imgLink;
}
function stand(newState){
    if(newState == turnState.AI){
        ai_Turns = Math.round(Math.random() * 3) + 2
    }
    set_state(state, newState);
}
function ai_Run(){
    let i = 0;
    let stop = false
    while(i < ai_Turns){
        let score = Number(document.getElementById("scoreResultAI").innerText);
        let random = Math.round(Math.random() * 10)
        if (score < 15){
            setTimeout(() => {
                hit();
            }, 1000 * (i + 1))
        }
        else if(score <= 21 && random > 9){
            setTimeout(() => {
                hit();
            }, 1000 * (i + 1))
        }
        
        i = i + 1;
    }
    setTimeout(() => {
        stand(turnState.JUDGE);
    }, 1000 * (ai_Turns + 1))
}
function judgeScore(){
    let playerScore = parseInt(document.getElementById("scoreResultPlayer").innerText) || 0;
    let aiScore = parseInt(document.getElementById("scoreResultAI").innerText) || 0;
    if((playerScore == 21 && aiScore == 21) || (playerScore > 21 && aiScore > 21)){
        double_Give("totalLossOrWinsPlayer", "totalLossOrWinsAI");
    }
    else if(playerScore == 21){
        point_Give("totalLossOrWinsPlayer");
    }
    else if(aiScore == 21){
        point_Give("totalLossOrWinsAI");
    }
    else if(playerScore > aiScore){
        if(playerScore > 21){
            point_Give("totalLossOrWinsAI");
        }
        else{
            point_Give("totalLossOrWinsPlayer");
        }
    }
    else{
        if(aiScore > 21){
            point_Give("totalLossOrWinsPlayer");
        }
        else{
            point_Give("totalLossOrWinsAI");
        }
    }
}
function point_Give(whoToGive){
    let score = parseInt(document.getElementById(whoToGive).innerText)  || 0;
    document.getElementById(whoToGive).innerText = (score + 1);
    clear();
}
function double_Give(whoToGive1, whoToGive2){
    let score1 = parseInt(document.getElementById(whoToGive1).innerText)  || 0;
    document.getElementById(whoToGive1).innerText = (score1 + 1);
    
    let score2 = parseInt(document.getElementById(whoToGive2).innerText)  || 0;
    document.getElementById(whoToGive2).innerText = (score2 + 1);
    clear();
}
function end_game(winner){
    
    if(winner == "Player"){
        document.getElementById("gameEndWin").hidden = false;
        document.getElementById("winner").innerText = "WINNER: " + winner;
    }
    else{
        document.getElementById("gameEndLoss").hidden = false;
        document.getElementById("restart").disabled = false;

    }
    
}
function clear(){
    document.getElementById("scoreResultPlayer").innerText = 0;
    document.getElementById("scoreResultAI").innerText = 0;
    document.getElementById("cardShowPlayer").src = "images/cards/BACKOFCARD.png";
    document.getElementById("cardShowAI").src = "images/cards/BACKOFCARD.png";
    ai_Turns = 0;
    let playerTotal = document.getElementById("totalLossOrWinsPlayer").innerText
    let aiTotal = document.getElementById("totalLossOrWinsAI").innerText
    if(playerTotal < goal && aiTotal < goal){
        setTimeout(() => {
            set_state(state, turnState.PLAYER);
        }, 1000)
    }
    else{
        checkTotalScore(playerTotal, aiTotal);
    }
}
function checkTotalScore(playerTotal, aiTotal){
    if(playerTotal >= goal ){
        end_game("Player")
    }
    else if(aiTotal >= goal){
        end_game("AI")
    }
}
function fullClear(){
    document.getElementById("scoreResultPlayer").innerText = 0;
    document.getElementById("scoreResultAI").innerText = 0;
    document.getElementById("cardShowPlayer").src = "images/cards/BACKOFCARD.png";
    document.getElementById("cardShowAI").src = "images/cards/BACKOFCARD.png";
    document.getElementById("gameEndLoss").hidden = true;
    document.getElementById("restart").disabled = true;
    document.getElementById("totalLossOrWinsPlayer").innerText = 0;
    document.getElementById("totalLossOrWinsAI").innerText = 0;

    ai_Turns = 0
    ref_elem = "---"
    ref_elem2 = "---"

    setTimeout(() => {
        set_state(state, turnState.PLAYER)
    }, 1250)
}
function checkCode(){
    let inputCode = document.getElementById("inputBox").value
    if(inputCode == code){
        document.getElementById("output").disabled = false
        document.getElementById("output").hidden = false
    }
}
function moveToEnd(){
    window.location.href = "winScreen.html"
}