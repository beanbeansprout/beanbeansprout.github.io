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
    canvas.width = Math.round(this.width / pixelSize.value) * pixelSize.value;
    canvas.height = Math.round(this.height / pixelSize.value) * pixelSize.value;
    ctx.drawImage(this, 0,0, canvas.width, canvas.height);
    
    for (let i = 0; i < canvas.width - pixelSize.value; i++) {
      for (let j = 0; j < canvas.height - pixelSize.value; j++) {
        section = ctx.getImageData(i, j, pixelSize.value, pixelSize.value);
        
        for (let k = 0; k < 4; k++) {
          for (let l = k; l < pixelSize.value * pixelSize.value * 4; l += 4) {
            averageColor[k] += section.data[l];
          }
          
          averageColor[k] /= pixelSize.value * pixelSize.value;
        }
        
        ctx.fillStyle = `rgba(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]}, ${averageColor[3]})`;
        ctx.fillRect(i, j, pixelSize.value, pixelSize.value);
        
        averageColor = [0, 0, 0, 0];
      }
    }
  };
}