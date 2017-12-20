"use strict"

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png'
  //
  const getRand = (min, max) => {
    return Math.floor(Math.random() * max + min)
  }
  this.row = getRand(config.nbWaterRows, config.nbStoneRows)
  this.speed = getRand(1, 2)
  this.x = -1 * config.cellWidth * getRand(0, config.numCols())
  this.y = this.row * (config.cellHeight) - 20
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x > (config.numCols() * config.cellWidth)) {
    this.x = -config.cellWidth
  }
  this.x += this.speed * config.cellWidth * dt
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.isInCell = function(row, col) {
  if (row !== this.row)
    return false
  const xCenter = this.x + config.cellWidth / 2
  const thisCol = Math.floor(xCenter / config.cellWidth)
  return col === thisCol
}

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
const Player = function() {
  this.sprite = 'images/char-boy.png';
  this.score = 0
  this.reset()
}

Player.prototype.update = function() {
  this.x = this.col * config.cellWidth
  this.y = this.row * config.cellHeight - 10
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
  this.col = parseInt(config.numCols() / 2)
  this.row = config.numRows() - 1
}

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "up":
      if (this.row > 0)
        --this.row
      break;
    case "down":
      if (this.row < (config.numRows() - 1))
        ++this.row
      break;
    case "left":
      if (this.col > 0)
        --this.col
      break;
    case "right":
      if (this.col < (config.numCols() - 1))
        ++this.col
      break;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = []
for (let i = 0; i < config.nbEnemies; ++i) {
  allEnemies.push(new Enemy())
}
const player = new Player()

// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

