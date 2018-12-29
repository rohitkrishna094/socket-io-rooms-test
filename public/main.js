let socket = io.connect('http://localhost:8080');

// on connection to server, ask for users name
socket.on('connect', () => {
  socket.emit('adduser', prompt("What's your name?"));
});

socket.on('updatechat', (username, data) => {
  $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
});

socket.on('updaterooms', (rooms, current_room) => {
  $('#rooms').empty();
  $.each(rooms, function(key, value) {
    if (value == current_room) {
      $('#rooms').append('<div>' + value + '</div>');
    } else {
      $('#rooms').append('<div><a href="#" onclick="switchRoom(\'' + value + '\')">' + value + '</a></div>');
    }
  });
});

switchRoom = room => {
  socket.emit('switchRoom', room);
};

$(function() {
  $('#datasend').click(function() {
    let message = $('#data').val();
    $('#data').val('');
    socket.emit('sendchat', message);
  });

  // when the client hits ENTER on their keyboard
  $('#data').keypress(function(e) {
    if (e.which == 13) {
      $(this).blur();
      $('#datasend')
        .focus()
        .click();
    }
  });
});
