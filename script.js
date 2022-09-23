import Bumba from "./Bumba.js";
import Paddle from "./Paddle.js"

const bumba = new Bumba(document.getElementById("bumba"))
const speletajaPaddle = new Paddle(document.getElementById("speletaja-paddle"))
const datoraPaddle = new Paddle(document.getElementById("datora-paddle"))
const speletajaPunktElem = document.getElementById("speletaja-rezultats")
const datoraPunktElem = document.getElementById("datora-rezultats")

let lastTime
function update(time) {
    if (lastTime != null){
      const delta = time - lastTime
      //console.log(delta) 
      bumba.update(delta, [speletajaPaddle.rect(), datoraPaddle.rect()])
      datoraPaddle.update(delta, bumba.y)
    
if (isLose()) handleLose()
//console.log("lose")
}
    lastTime = time
    //console.log(time)
    window.requestAnimationFrame(update)   
}


function isLose(){
    const rect = bumba.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose(){
    const rect = bumba.rect()
    if (rect.right >= window.innerWidth) {
        speletajaPunktElem.textContent = parseInt(speletajaPunktElem.textContent) + 1
      } else {
        datoraPunktElem.textContent = parseInt(datoraPunktElem.textContent) + 1
      }
    bumba.reset()
    datoraPaddle.reset()
}

document.addEventListener("mousemove", e => {
    speletajaPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)   
