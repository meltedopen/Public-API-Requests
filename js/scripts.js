const randomUsers = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const btn = document.querySelector('button');

//Fetch employee data
async function getEmployees(url) {
  const employeeResponse = await fetch(url);
  //Parse JSON object
  const employeeJSON = await employeeResponse.json();
  return Promise.all(employeeJSON.results);
}

//Creates a card for each employee using JSON object
function createCard(data) {
  data.map(person => {
    const employeeCard = document.createElement('div');
    const employeeImg = document.createElement('div');
    const employeeInfo = document.createElement('div');
    gallery.appendChild(employeeCard);
    employeeCard.appendChild(employeeImg);
    employeeCard.appendChild(employeeInfo);
    employeeCard.classList.add('card');
    employeeImg.classList.add('card-img-container');
    employeeInfo.classList.add('card-info-container');

    employeeImg.innerHTML = `<img class='card-img' src=${person.picture.large} alt='profile picture'>`;

    employeeInfo.innerHTML = `<h3 id='name' class='card-name cap'>${person.name.first} ${person.name.last}</h3>
      <p class='card-text'>${person.email}</p>
      <p class='card-text cap'>${person.location.city}, ${person.location.state}</p>`;
  });
  return data;
}

//Close modal
function closeModal() {
  $('#modal-close-btn').click(() => {
    $('.modal-container').remove();
  });
}

//Formats birthday
function formattedBday(date) {
  const birthDay = new Date(date);
  const formattedBday = `${birthDay.getMonth() +
    1}/${birthDay.getDate()}/${birthDay.getFullYear()}`;
  return formattedBday;
}

//Creates Modal
function viewCard(data) {
  const employeeModal = document.querySelectorAll('.card');
  for (let i = 0; i < data.length; i++) {
    employeeModal[i].addEventListener('click', () => {
      $('body').append(
        `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${
                          data[i].picture.large
                        }" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${
                          data[i].name.first
                        } ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}, ${
          data[i].location.state
        }</p>
                        <hr>
                        <p class="modal-text">${data[i].cell}</p>
                        <p class="modal-text cap">${data[i].location.street}, ${
          data[i].location.city
        }, ${data[i].location.state} ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedBday(
                          data[i].dob.date
                        )}</p>
                    </div>
                </div>`
      );
      closeModal();
    });
  }
  return data;
}

//Promises
getEmployees(randomUsers)
  .then(createCard)
  .then(viewCard)
  .catch(err => console.log(err));
