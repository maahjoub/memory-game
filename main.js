let duration = 1000
let memoryGameBlocks = document.querySelector(".memory-game-blocks")
let blocks = Array.from(memoryGameBlocks.children)
let orderRang = [...Array(blocks.length).keys()]
var timer = document.querySelector(".timer"), countDownInterval
var splash = document.querySelector('.splash-btn span')

if (splash!= null) {
    splash.onclick = function () {
        yourName = prompt("الرجاء كتابة اسمك")
        if (yourName == null || yourName == "") {
            alert(" عليك كتابة اسمك لبدء اللعب")
        } else {
            document.getElementById('game-audio').play()
            document.querySelector(".name span").innerHTML = yourName
            localStorage.setItem("name", yourName)
            countDown(900)
            document.querySelector('.splash-btn').remove()
        }
    }
}else {
    document.getElementById('game-audio').play()
    document.querySelector(".name span").innerHTML = localStorage.getItem("name")
    countDown(900)
}

shuffle(orderRang)
blocks.forEach((block, index) => {
    block.style.order = orderRang[index]
    block.addEventListener('click', function () {
        flipBlock(block)
    })
})
function flipBlock (selectedBlock) 
{
    selectedBlock.classList.add('is-flipped')
    let allFlippedBlock = blocks.filter(selectedBlock => selectedBlock.classList.contains('is-flipped'))
    if (allFlippedBlock.length === 2) {
        stopClicking()
        checkMatchedBlock(allFlippedBlock[0], allFlippedBlock[1])
    }
   
}

function stopClicking() {
    memoryGameBlocks.classList.add('no-click')
    setTimeout(() => {
        memoryGameBlocks.classList.remove('no-click')
    }, duration)
}

function checkMatchedBlock (firstBlock, secondBlock) {
    let tryElement = document.querySelector(".tryes span")
    if (firstBlock.dataset.frot === secondBlock.dataset.frot) {
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
        firstBlock.classList.add('has-match')
        secondBlock.classList.add('has-match')
        document.getElementById('success').play()
        finesh ()
    } else {
        tryElement.innerHTML = parseInt(tryElement.innerHTML) + 1
        document.getElementById('fail').play()
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration)
    }
    if (parseInt(tryElement.innerHTML) === 100 ) {
        setTimeout(() => {
            document.getElementById('game-audio').currentTime = 0
            document.getElementById('game-over').play()
            let splash = document.createElement("div")
            splash.className = "btn1"
            document.querySelector('body').appendChild(splash)
            let gameOver = document.createElement("span")
            gameOver.className = "game-over"
            let gameOverTxt = document.createTextNode("GAME OVER")
            gameOver.appendChild(gameOverTxt)
            splash.appendChild(gameOver)
        }, duration + duration)
       setTimeout(() => {
           location.reload();
       }, duration + 3500)

    }
}
function shuffle(array) {
    let current = array.length, temp, random
    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--
        temp = array[current]
        array[current] = array[random]
        array[random] = [temp]
    }
    return array
}

function countDown (duration) {
    
        var minutes, seconds
        countDownInterval = setInterval( () =>{
            minutes = parseInt (duration / 60 )
            seconds = parseInt (duration % 60 )
            minutes = minutes < 10 ? `0${minutes}` : minutes
            seconds = seconds < 10 ? `0${seconds}` : seconds
            timer.innerHTML =`${minutes}:${seconds}`
            if (--duration < 0) {
            clearInterval(countDownInterval)  
                setTimeout(() => {
            document.getElementById('game-audio').currentTime = 0
            document.getElementById('game-over').play()
            let splash = document.createElement("div")
            splash.className = "btn1"
            document.querySelector('body').appendChild(splash)
            let gameOver = document.createElement("span")
            gameOver.className = "game-over"
            let gameOverTxt = document.createTextNode("GAME OVER")
            gameOver.appendChild(gameOverTxt)
            splash.appendChild(gameOver)
        }, duration + duration)
       setTimeout(() => {
           location.reload();
       }, duration + 3500)
            }
        }, 1000)
    
}
function finesh () {
    let allFlippedBlockMatch = document.getElementsByClassName("has-match")
    if (allFlippedBlockMatch.length == 20) {
        next = document.getElementById("next-stage")
        next.className = "show"
    }
    
}