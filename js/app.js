// empployee info
fetch('https://randomuser.me/api/?results=12&nat=US')
  //json
  .then(response => response.json())

  .then(function(users) {
    //user results
    data = users.results;
    //iterate through employee
    data.forEach(employees => {
      //var for employee
      const image = employees.picture.large;
      const firstName = employees.name.first;
      const lastName = employees.name.last;
      const email = employees.email;
      const city = employees.location.city;
      const state = employees.location.state;

      //var for profile
      const profile = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${image}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
            </div>`;
      // append profile to gallery id
      $('#gallery').append(profile);
    });
  });

function display(i) {
  //global var
  const image = data[i].picture.large;
  const firstName = data[i].name.first;
  const lastName = data[i].name.last;
  const email = data[i].email;
  const city = data[i].location.city.toUpperCase();
  const state = data[i].location.state.toUpperCase();

  const phone = data[i].phone;
  const street = data[i].location.street.toUpperCase();
  const birthMonth = data[i].dob.date.slice(5, 7);
  const birthDate = data[i].dob.date.slice(8, 10);
  const birthYear = data[i].dob.date.slice(0, 4);

  //html
  const modal = `
        <div class="modal-container">
            <div class="modal">
            <button type="button" id ="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class ="modal-img" src="${image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3> 
                <p class="modal-text">${email}</p> 
                <p class="modal-text cap">${city}</p> 
                <hr>
                <p class="modal-text">${phone}</p> 
                <p class="modal-text">${street}, ${city}, ${state} 97204</p> 
                <p class="modal-text">Birthday: ${birthMonth}/${birthDate}/${birthYear}</p> 
            </div> 
        </div>`;

  $('body').append(modal);

  $('#modal-close-btn').on('click', function() {
    $('.modal-container').remove();
  });
}

//modal
$('#gallery').on('click', '.card', function() {
  i = $(this).index();
  display(i);
});