const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const logo = document.querySelector('.logo')
const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./assets/audio/audio_theme.mp3')
audioGameOver = new Audio('./assets/audio/audio_gameover.mp3')
audioJump = new Audio('./assets/audio/jump.mp3')
const menuplay = document.querySelector('#fundo_menu')
menuplay.play()

const startGame = () => {
  pipe.classList.add('pipe-animation')
  start.style.display = 'none'
  logo.style.display = 'none'
  // audio
  audioStart.play()
  menuplay.pause()
}

const restartGame = () => {
  gameOver.style.display = 'none'
  pipe.style.left = ''
  pipe.style.right = '0'
  mario.src = './assets/img/mario.gif'
  mario.style.width = '150px'
  mario.style.bottom = '0'

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;

}

const jump = () => {
  mario.classList.add('jump')
  audioJump.play()
  setTimeout(() => {
    mario.classList.remove('jump')
  }, 800)
}

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace('px', ' ')

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove('.pipe-animation')
      pipe.style.left = `${pipePosition}px`

      mario.classList.remove('.jump')
      mario.style.bottom = `${marioPosition}px`

      mario.src = './assets/img/game-over.png'
      mario.style.width = '80px'
      mario.style.marginLeft = '50px'
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'
      
      clearInterval(loop)
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})