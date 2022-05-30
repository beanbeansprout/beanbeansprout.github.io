var cropX = [0, 0, 12, 24, 32, 36, 52, 56, 0, 0, 28, 44, 0, 48];
var cropY = [0, 16, 16, 0, 8, 16, 16, 20, 32, 48, 48, 48, 52, 52];
var cropW = [8, 4, 8, 40, 32, 8, 12, 8, 64, 20, 8, 20, 16, 16];
var cropH = [8, 4, 4, 8, 8, 4, 4, 12, 16, 4, 4, 4, 12, 12];

var frontCropX = [0, 12, 0, 12];
var frontCropY = [0, 0, 20, 20];
var frontCropW = [4, 16, 4, 4];
var frontCropH = [8, 8, 12, 12];

var frontPartX = [4, 4, 0, 12, 4, 8];
var frontPartY = [0, 8, 8, 8, 20, 20];
var frontPartW = [8, 8, 4, 4, 4, 4];
var frontPartH = [8, 12, 12, 12, 12, 12];

var wholePartX = [8, 20, 44, 36, 4, 20];
var wholePartY = [8, 20, 20, 52, 20, 52];

var canvas = document.getElementById("cropCanvas");
var ctx = canvas.getContext("2d");

var frontCanvas = document.getElementById("frontCanvas");
var frontCtx = frontCanvas.getContext("2d");

var imageInput = document.getElementById("imageInput");
var notOption = document.getElementById("notOption");

var image;
var section;

function makeSkin() {
  if (imageInput.files[0] == null) {
    notOption.innerHTML = "No image selected.";
  } else {
    notOption.innerHTML = "​";
    image = new Image();
    image.src = URL.createObjectURL(imageInput.files[0]);
    image.onload = function() {
      cropImage(ctx, 64, 64, 14, cropX, cropY, cropW, cropH);
      cropImage(frontCtx, 16, 32, 4, frontCropX, frontCropY, frontCropW, frontCropH);
      
      for (let i = 0; i < 6; i++) {
        section = frontCtx.getImageData(frontPartX[i], frontPartY[i], frontPartW[i], frontPartH[i]);
        ctx.putImageData(section, wholePartX[i], wholePartY[i]);
      }
    };
  }
}

function cropImage(ctxParam, w, h, imageAmount, listX, listY, listW, listH) {
    ctxParam.drawImage(image, 0, 0, w, h);
    
    for (let i = 0; i < imageAmount; i++) {
      section = ctxParam.getImageData(listX[i], listY[i], listW[i], listH[i]);
      
      for (let j = 0; j < section.data.length; j++) {
        section.data[j] = 0;
      }
      
      ctxParam.putImageData(section, listX[i], listY[i]);
    }
}