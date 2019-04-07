//set up timer and functions 

var timer = new easytimer.Timer()

function timerReset() {
    timer.reset()
}

function timerStop() {
    timer.stop()
}

timer.addEventListener('secondsUpdated', function (e) {
    $('.values').html(timer.getTimeValues().toString())
});
timer.addEventListener('started', function (e) {
    $('.values').html(timer.getTimeValues().toString())
});
timer.addEventListener('reset', function (e) {
    $('.values').html(timer.getTimeValues().toString())
});

window.onload = function () {
    timer.start()
}


/*
 * Create a list that holds all of your cards
 */

 let cardArrays = Array.from(document.querySelectorAll('.card'))

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffle the index of cardArrays

let cardIndexArray = []
for (let i = 0; i < 16; i++) {
    cardIndexArray[i] = i
}

function shuffleCards() {

    cardIndexArray = shuffle(cardIndexArray)

    let iconsBeforeShuffle = Array.from(document.querySelectorAll("li.card > i"))
    let classesBeforeShuffle = []

    for (let i = 0; i < iconsBeforeShuffle.length; i++) {
        classesBeforeShuffle.push(iconsBeforeShuffle[i].className)
    }

    let iconsAfterShuffle = Array.from(document.querySelectorAll("li.card > i"))
    for (let i = 0; i < iconsAfterShuffle.length; i++) {
        iconsAfterShuffle[i].setAttribute("class", classesBeforeShuffle[cardIndexArray[i]])
    }
}

// loop to add event listeners to each card

for (const card of cardArrays){
    card.addEventListener("click", onClickEvents)
}

function onClickEvents() {
    if (openedCards.length >= 2) {
        return
    }
    
    displayCard(this)
    addToOpenedCards(this)
    checkOpenedCards()
    moveAdd()
    checkSuccess()
}

 function displayCard(card) {
    card.classList.toggle("show")
    card.classList.toggle("open")
    card.classList.toggle("disabled")
}

let openedCards = []


function addToOpenedCards(card) {

    if (openedCards.length === 0 || card != openedCards[0]) {
        openedCards.push(card)
    } else {
        openedCards[0].classList.remove("open","show")
        openedCards = []
    }
}


function checkOpenedCards() {
    if (openedCards.length === 2) {
        let symbol1 = openedCards[0].getElementsByTagName('i')[0].classList
        let symbol2 = openedCards[1].getElementsByTagName('i')[0].classList

        if (symbol1[1] === symbol2[1]) {
            lockMatchedCards()
            matchedCards()
        } else {
            unmatched()
            setTimeout(removeFromOpenedCards, 750)
        }
    }
}

function lockMatchedCards() {
    openedCards[0].classList = "card match disabled"
    openedCards[1].classList = "card match disabled"
    openedCards = []

}

function unmatched(){
    openedCards[0].classList.toggle("disabled" )
    openedCards[0].classList.add("unmatched")
    openedCards[1].classList.toggle("disabled");
    openedCards[1].classList.add("unmatched");
}

function removeFromOpenedCards(){
    openedCards[0].classList.remove("open","show","unmatched")
    openedCards[1].classList.remove("open","show","unmatched")
    openedCards = []
}



// count the moves

const flipMove = document.querySelector('.moves')

let clickCount = 0
function moveAdd(){
    clickCount += 1
    flipMove.textContent = clickCount
    countStars()
}

let matchedCount = 0
function matchedCards(){
    matchedCount += 2
}

// check whether all cards has been flipped matched

function checkSuccess(){
    if (matchedCount === 16){
    setTimeout(congratulate, 500)
    } 
}



// count stars

function countStars(){
    let c = flipMove.textContent
    if (c <= 5 ){
        return
    } else if ( c> 5 && c<= 15 ) {
        starSoilcToVoid(2)
    } else {
        starSoilcToVoid(1)
    }
}

function starSoilcToVoid(i){
    let starsList = document.querySelector('.stars')
    let starIcon = starsList.querySelectorAll("li > i")
    starIcon[i].classList = "far fa-star"
}

function starVoidToSolid(){
    let stars = document.querySelector(".stars").getElementsByTagName('i')
    for (let star of stars){
        star.classList= "fa fa-star"
    }
}



// congratulation condition


function congratulate(){
    const mainBody = document.querySelector('.container')
    mainBody.classList = 'container-hide'

    let complete = document.querySelector('.congratulate')
    complete.classList = 'congrat-show'

    
    let i = flipMove.textContent

    let starLeft = document.getElementsByClassName("fa fa-star")
    let c = starLeft.length

    let t = document.querySelector('.values').textContent

    const insertCongratSentence = document.querySelector('.insertcongratSentence')
    insertCongratSentence.textContent = `In ${t}, with ${i} moves and ${c} stars.`

    let m = 0

    timerStop()
}



// reset stuff

function resetCards(){
    for (const card of cardArrays) {
        card.classList = "card"
    }
}

function resetCounters(){
    openedCards = []
    matchedCount = 0
    clickCount = 0
    flipMove.textContent = '0'
}

let restartButton= document.querySelector('.restart')
restartButton.addEventListener("click", restart)

function restart (){
    resetCards()
    starVoidToSolid()

    resetCounters()

    shuffleCards()

    timerReset()
}



// click 'play again button' to play again

let playAgain = document.querySelector('.again')
playAgain.addEventListener("click", startOver)



// click ' start over' button to re-start

function startOver(){

    let startGame = document.querySelector('.congrat-show')
    startGame.classList = 'congratulate'

    const newContainer = document.querySelector('.container-hide')
    newContainer.classList = 'container'

    resetCards()
    starVoidToSolid()

    resetCounters()

    shuffleCards()
    timerReset()
}