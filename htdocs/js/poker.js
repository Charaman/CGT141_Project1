var Selected_1= 0;
var Selected_2= 0;
var pair_1 = false;
var pair_2 = false;
var pair_3 = false;
var pair_4 = false;
var has_selection_made = false;


const card_1 = document.getElementById("card_1");
const card_2 = document.getElementById("card_2");
const card_3 = document.getElementById("card_3");
const card_4 = document.getElementById("card_4");
const card_5 = document.getElementById("card_5");
const card_6 = document.getElementById("card_6");
const card_7 = document.getElementById("card_7");
const card_8 = document.getElementById("card_8");
const end_button = document.getElementById("finish_game")


//making an array of cards so that they can all be called and that the selection for the first and last in the pair can alternate
const cards = [card_1, card_2, card_3, card_4, card_5, card_6, card_7, card_8];

cards.forEach((card, index) => {
    const cardNumber = index + 1;

    card.addEventListener("click", () => {
        if (!has_selection_made) {
            first_sel(cardNumber);
            has_selection_made = true; // mark that first selection is made
        } else {
            second_sel(cardNumber);
            has_selection_made = false; // reset for next turn
        }
    });
});

//the clicking of the game over button
end_button.addEventListener("click", leave_page)

function first_sel(card_number) {
    // registering the card selected and has_selection_made is their to see if the player has cosent their first in the pair of cards
    Selected_1=card_number;
    has_selection_made=true;
    // the transformation of the card
    if(card_number==1){
        document.getElementById("card_1_img").src = "images/poker_images/heart.jpg";
    }if(card_number==2){
        document.getElementById("card_2_img").src = "images/poker_images/clubs.jpg";
    }if(card_number==3){
        document.getElementById("card_3_img").src = "images/poker_images/Spade.jpg";
    }if(card_number==4){
        document.getElementById("card_4_img").src = "images/poker_images/diamond.jpg";
    }if(card_number==5){
        document.getElementById("card_5_img").src = "images/poker_images/diamond.jpg";
    }if(card_number==6){
        document.getElementById("card_6_img").src = "images/poker_images/Spade.jpg";
    }if(card_number==7){
        document.getElementById("card_7_img").src = "images/poker_images/clubs.jpg";
    }if(card_number==8){
        document.getElementById("card_8_img").src = "images/poker_images/heart.jpg";
    }
}

function second_sel(card_number){
    Selected_2=card_number;
        // the "flipping" of the card
    if(card_number==1){
        document.getElementById("card_1_img").src = "images/poker_images/heart.jpg";
    }if(card_number==2){
        document.getElementById("card_2_img").src = "images/poker_images/clubs.jpg";
    }if(card_number==3){
        document.getElementById("card_3_img").src = "images/poker_images/Spade.jpg";
    }if(card_number==4){
        document.getElementById("card_4_img").src = "images/poker_images/diamond.jpg";
    }if(card_number==5){
        document.getElementById("card_5_img").src = "images/poker_images/diamond.jpg";
    }if(card_number==6){
        document.getElementById("card_6_img").src = "images/poker_images/Spade.jpg";
    }if(card_number==7){
        document.getElementById("card_7_img").src = "images/poker_images/clubs.jpg";
    }if(card_number==8){
        document.getElementById("card_8_img").src = "images/poker_images/heart.jpg";
    }
    //checking to see if the cards match, delayed by two seconds so the player can see the card "flip"
        setTimeout( () => {
        if([1,8].includes(Selected_1) && [1,8].includes(Selected_2) ){
            const img_gone = document.getElementById("card_1");
            img_gone.style.visibility = "hidden";
            const img_gone2 = document.getElementById("card_8");
            img_gone2.style.visibility = "hidden";
            pair_1=true;
        }if([2,7].includes(Selected_1) && [2,7].includes(Selected_2) ){
            const img_gone = document.getElementById("card_2");
            img_gone.style.visibility = "hidden";
            const img_gone2 = document.getElementById("card_7");
            img_gone2.style.visibility = "hidden";
            pair_2=true;
        }if([3,6].includes(Selected_1) && [3,6].includes(Selected_2) ){
            const img_gone = document.getElementById("card_3");
            img_gone.style.visibility = "hidden";
            const img_gone2 = document.getElementById("card_6");
            img_gone2.style.visibility = "hidden";
            pair_3=true;
        }if([4,5].includes(Selected_1) && [4,5].includes(Selected_2) ){
            const img_gone = document.getElementById("card_4");
            img_gone.style.visibility = "hidden";
            const img_gone2 = document.getElementById("card_5");
            img_gone2.style.visibility = "hidden";
            pair_4=true;
        }
        else{ //if the cards dont match they "flip over" again
            document.getElementById("card_1_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_2_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_3_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_4_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_5_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_6_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_7_img").src = "images/poker_images/Card_background.jpg";
            document.getElementById("card_8_img").src = "images/poker_images/Card_background.jpg";
        }
        game_won();
        },200);
    has_selection_made=false;
    
}
//making the button apear once all of the cards have matched
function game_won (){
    if(pair_1 && pair_2 && pair_3 && pair_4) {
        alert("the passcode is: 101");
    }
}

function leave_page (){
    const userInput = document.getElementById("passcode").value;
    if (userInput=="101"){
        window.location.href = "bar.html";
    }
}
