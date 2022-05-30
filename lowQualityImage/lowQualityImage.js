var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var imageInput = document.getElementById("imageInput");
var pixelSize = document.getElementById("pixelSize");
var averageColor = [0, 0, 0, 0];
var section;

function resizeImage() {
  var image = new Image();
  image.src = URL.createObjectURL(imageInput.files[0]);
  image.onload = function() {
    canvas.width = Math.round(this.width / parseInt(pixelSize.value)) * parseInt(pixelSize.value);
    canvas.height = Math.round(this.height / parseInt(pixelSize.value)) * parseInt(pixelSize.value);
    ctx.drawImage(this, 0,0, canvas.width, canvas.height);
    
    for (let i = 0; i < canvas.width; i += parseInt(pixelSize.value)) {
      for (let j = 0; j < canvas.height; j += parseInt(pixelSize.value)) {
        section = ctx.getImageData(i, j, parseInt(pixelSize.value), parseInt(pixelSize.value));
        
        for (let k = 0; k < 4; k++) {
          for (let l = k; l < parseInt(pixelSize.value) * parseInt(pixelSize.value) * 4; l += 4) {
            averageColor[k] += section.data[l];
          }
          
          averageColor[k] /= parseInt(pixelSize.value) * parseInt(pixelSize.value);
        }
        
        ctx.fillStyle = `rgba(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]}, ${averageColor[3]})`;
        ctx.fillRect(i, j, parseInt(pixelSize.value), parseInt(pixelSize.value));
        
        averageColor = [0, 0, 0, 0];
      }
    }
  };
}