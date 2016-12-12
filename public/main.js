/*global fetch*/
var update = document.getElementById('update');
var del = document.getElementById('delete');


update.addEventListener('click', function () {
  fetch('logs', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Admin',
      'laps': 'Request entry to be altered.'
    })
  })
  .then(response => {
    if (response.ok) return response.json();
  })
  .then(data => {
    console.log(data);
  });
});

del.addEventListener('click', function () {
  fetch('logs', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  }).
  then(data => {
    console.log(data);
    window.location.reload();
  });
})