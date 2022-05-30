import {
    redColors,
    orangeColors,
    yellowColors,
    greenColors,
    blueColors,
    purpleColors,
    defaultColors,
    whiteColors,
    grayColors,
    brownColors,
    pinkColors,
    cyanColors,
    allColors
} from "./colors.js";
import {textures} from "./textures.js";
import {poetry} from "./poetry.js";
import {fonts} from "./fonts.js";
import {randImages} from "./images.js";
import {gifs} from "./gifs.js";

var scrollBarWidth = 17;
var canvasWidth = window.innerWidth - scrollBarWidth;
var canvasHeight = window.innerHeight * 10;

var bgCanvas = document.getElementById("bgImage");
var bgCtx = bgCanvas.getContext("2d");

bgCanvas.width = canvasWidth;
bgCanvas.height = canvasHeight;

var texCanvas = document.getElementById("textures");
var texCtx = texCanvas.getContext("2d");

texCanvas.width = canvasWidth;
texCanvas.height = canvasHeight;

var imgCanvas = document.getElementById("img");
var imgCtx = imgCanvas.getContext("2d");

imgCanvas.width = canvasWidth;
imgCanvas.height = canvasHeight;

var linesCanvas = document.getElementById("lines");
var linesCtx = linesCanvas.getContext("2d");

linesCanvas.width = canvasWidth;
linesCanvas.height = canvasHeight;

addBgImage();
addGifs();
draw();
addText((linesCanvas.width + 250) * -1, linesCanvas.width - 250, (linesCanvas.height + 250) * -1, linesCanvas.height - 50, 12, 64);

function draw() {
  let texImages = [], imgs = [], gifImages = [];
  
  drawImages(texImages, textures, texCanvas.height / 15, 128, 512, texCanvas.width, texCanvas.height, texCtx);
  drawImages(imgs, randImages, imgCanvas.height / 20, 64, 512, imgCanvas.width, imgCanvas.height, imgCtx);
}

function addBgImage() {
  let bgImage = new Image();
  bgImage.src = textures[Math.floor(Math.random() * textures.length)];
  bgImage.onload = () => {
    bgCtx.drawImage(bgImage, 0, 0, bgCanvas.width, bgCanvas.height);
  };
}

function addGifs() {
  let maxGifs = 115;
  let gifAmount = 115;
  
  for (let i = 0; i < gifAmount; i++) {
    let loadGifs = [];
    loadGifs[i] = document.getElementById("gif" + i);
    loadGifs[i].src = gifs[Math.floor(Math.random() * gifs.length)];
  }
}

function drawImages(images, source, amount, minwh, maxwh, w, h, context) {
  for (let i = 0; i < amount; i++) {
    images[i] = new Image();
    images[i].src = source[Math.floor(Math.random() * source.length)];
    images[i].onload = () => {
      context.drawImage(
        images[i],
        Math.floor(Math.random() * (w - w * -1) + w * -1),
        Math.floor(Math.random() * (h - h * -1) + h * -1),
        Math.floor(Math.random() * (maxwh - minwh) + minwh),
        Math.floor(Math.random() * (maxwh - minwh) + minwh)
      );
    };
  }
}

function addText(minX, maxX, minY, maxY, minSize, maxSize) {
  let linesAmount = linesCanvas.height / 10;
  
  for (let i = 0; i < linesAmount; i++) {
    linesCtx.font = Math.floor(Math.random() * (maxSize - minSize) + minSize).toString() + "px " + fonts[Math.floor(Math.random() * fonts.length)];
    linesCtx.fillStyle = allColors[Math.floor(Math.random() * allColors.length)];
    linesCtx.fillText(poetry[Math.floor(Math.random() * poetry.length)], Math.floor(Math.random() * (maxX - minX) + minX), Math.floor(Math.random() * (maxY - minY) + minY)); 
  }
}
  