let field = document.createElement('div')
document.body.appendChild(field)
field.classList.add('field')

for (let i = 1; i< 101; i++) { 
  let excel = document.createElement('div')
  field.appendChild(excel)
  excel.classList.add('excel')
}

let excel = document.getElementsByClassName('excel')
let x = 1, 
    y = 10

for ( i = 0; i < excel.length; i ++ ) { 
  if (x == 11) { 
    x = 1 
    y --
  }
  excel[i].setAttribute('posX', x)
  excel[i].setAttribute('posY', y)
  x ++ 
  
}

function generateSnake () { 
  let posX = 6
  let posY = 5
  return [posX, posY]
}

let coordinates = generateSnake()
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]')] //выбор элемент по атрибуту
console.log("🚀 ~ file: script.js:34 ~ snakeBody", snakeBody)

for (let i = 0; i < snakeBody.length; i++) { 
  snakeBody[i].classList.add('snakeBody')
}

snakeBody[0].classList.add('head')

let mouse;
let per = false



function createMouse () { 
  function generateMouse() { 
    let posX = Math.round(Math.random() * (10 - 3) + 1)
    let posY = Math.round(Math.random() * (10 - 1) + 1)
    return [posX, posY]
  }

  let mouseCoordinates = generateMouse()
  
  mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
  
  while (mouse.classList.contains('snakeBody')) { 
    let mouseCoordinates = generateMouse()
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
  }
  
  mouse.classList.add('mouse')
}

createMouse()

let direction = 'right'

let steps = false

let input = document.createElement('input')

let speed = 200

document.body.prepend(input)
input.style.cssText = `
  margin: auto;
  margin-bottom:40px;
  margin-top:10px;
  font-size:20px;
  display: block;
  text-align: center;
  width: 50%
  
  `


  let score = 0
  input.value = `Ваши очки ${score}`

  let bestScoreResult = [localStorage.getItem('score', `${score}`)]
  console.log(bestScoreResult);

  

function move () { 
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')]
 ;
  snakeBody[0].classList.remove('head')
  
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody')
  snakeBody.pop() //очистка последнего элемента в массиве
  
  if(direction == 'right' ) { 
    if (snakeCoordinates[0] < 10) { 
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+ 1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
  
    } 
    else { 
      snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'))
    }
  }

  else if(direction == 'left' ) { 
    if (snakeCoordinates[0] > 1) { 
      snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]- 1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
  
    } 
    else { 
      snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'))
    }
  }
  else if(direction == 'up' ) { 
    if (snakeCoordinates[1] < 10) { 
      snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] +1) + '"]'))
  
    } 
    else { 
      snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0] + '"][posY = "1"]'))
    }
  }
  else if(direction == 'down' ) { 
    if (snakeCoordinates[1] > 1) { 
      snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] -1) + '"]'))
  
    } 
    else { 
      snakeBody.unshift(document.querySelector('[posX = "' +snakeCoordinates[0] + '"][posY = "10"]'))
    }
  }

  

  if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == (mouse.getAttribute('posY'))) { 
    mouse.classList.remove('mouse');
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'))
    score ++
    input.value = `Ваши очки ${score}`
    createMouse()
    
    speed -= 5
    clearInterval(interval)
    interval = setInterval(move, speed)
    console.log(speed);
  }

  
  function gameOver () { 
    
  }
  if (snakeBody[0].classList.contains('snakeBody')) {
    alert(`Игра окончена.Ваши очки ${score}`)
    clearInterval(interval)
    per = false
    console.log(per);
    let restart = document.createElement('button')
    restart.innerText = 'Перезапустить'
    document.body.prepend(restart)
    restart.addEventListener('click', function () {
      location.reload()
    })
    localStorage.setItem('score', `${score}`)
    let r = localStorage.getItem('score', `${score}`)
    
    bestScoreResult.push(r)
    arr = bestScoreResult.sort(function (a, b) { 
      return a - b
    })
    localStorage.setItem('BestScore', `${arr[arr.length - 1]}`)
    console.log(arr);
    
     
    
    
    
  
  }


  snakeBody[0].classList.add('head')

  for (let i = 0; i < snakeBody.length; i++) { 
    snakeBody[i].classList.add('snakeBody')
  }

  steps = true
  
}

let arr

// function restart ()  { 
//   perTrue ()
// }

let interval

function perTrue() {
  per = true
  start()
}

function start () { 
  
  if (per == true) { 
    console.log(per);
    interval = setInterval(move, speed)
    
  }
  field.removeEventListener('click', perTrue)
}


field.addEventListener('click', perTrue)







window.addEventListener('keydown', function(e) { 
  if(steps == true) { 
    if (e.keyCode == 37 && direction != 'right') { 
      direction = 'left'
      steps = false
    }
    else if (e.keyCode == 38 && direction != 'down') { 
      direction = 'up'
      steps = false
      
    }
    else if (e.keyCode == 39 && direction != 'left') { 
      direction = 'right'
      steps = false
    }
    else if (e.keyCode == 40 && direction != 'up') { 
      direction = 'down'
      steps = false
    }
  }
  
  
})

function bestScore () { 
  if(localStorage.getItem('BestScore') != null) { 
    console.log(localStorage.getItem('score'));
    let record = document.createElement('div')
    document.body.appendChild(record)
    record.innerText = `Лучший счет: ${localStorage.getItem('BestScore')}`
    record.classList.add('record')
    
  }
}

bestScore ()






