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
});

$(document).ready(function() {
  $(":button").click(function(){
    socket.emit($(this).attr('id'));
  }); 
});