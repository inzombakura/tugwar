const canvas = document.querySelector('.drawing-canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 70;
let curX = 0;
let curY = 0;

var socket = io('http://localhost:3000', { transports : ['websocket'] });
socket.on("connect", () => {
  // or with emit() and custom event names
  socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
});

// handle the event sent with socket.send()
socket.on("message", data => {
  console.log(data);
});

// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => {
  console.log(elem1, elem2, elem3);
});

socket.on("position", (pos) => {
  el = document.getElementById('position')
  el.innerHTML = 'x: ' + pos[0] + "<br />" + "y: " + pos[1];
  curX = pos[0];
  curY = pos[1];
});

document.querySelector
$(document).ready(function() {
  $(":button").click(function(){
    socket.emit($(this).attr('id'));
  });
});

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
      socket.emit("down");
      break;
    case "Up": // IE/Edge specific value
    case "ArrowUp":
      socket.emit("up");
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      socket.emit("left");
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      socket.emit("right");
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

function drawOnCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Save the default state
  ctx.beginPath();
  ctx.arc(centerX + curX, centerY + curY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
}

function update() {
	requestAnimationFrame(update);
	drawOnCanvas();
}
update();