const Game = require('./Game.js');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let game = new Game ();
game.createEnemyMissiles(ctx);