function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function init() {
  const inputs = document.querySelectorAll('input, textarea');
  const submitButton = document.querySelector('.submit_button');
  const formData = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  function clearModal() {
    inputs.forEach((input) => {
      input.value = '';
    });
  }

  inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
      const key = e.target.name;
      formData[key] = e.target.value;
    });
  });

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(formData);
    clearModal();
    closeModal();
  });
}

init();
