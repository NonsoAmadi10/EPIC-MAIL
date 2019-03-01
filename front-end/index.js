const modal = document.getElementById('msg-modal-id');

// Get the button that opens the modal
const btn = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal

function openModal() {
  modal.style.display = "block";
};

btn.addEventListener('click', openModal);

// When the user clicks on <span> (x), close the modal
function closeModal() {
  modal.style.display = "none";
};

span.addEventListener('click', closeModal);

