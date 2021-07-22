# tugwar

Currently a ball game where a ball can be moved across a canvas. 
All that works is that basic position handling and movement through socket.io. No animations or canvas drawing added yet.

Server: nodeJS socket.io socket handler for all clients. Keeps track of position and calculates new position and velocity
Client: completely disconnected from nodejs and server. Folder can be run seperately as a static html/js/css package.
