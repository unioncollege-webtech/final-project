/* globals fetch */
var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function () {
  fetch('books', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Russel Hobban',
      'book': 'Best Friends of Frances'
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
  fetch('books', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Best Friends of Frances'
    })
  }).then(function (response) {
    window.location.reload();
  });
})