function validarNome(input) {
    if (input.value.length < 3) {
        console.log('Nome inválido!');
        input.classList.add('is-invalid'); // opcional: visual feedback
    } else {
        input.classList.remove('is-invalid');
    }
    
}


//Biclioteca para validar o telefone
document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector("#contacto");
  
    const iti = window.intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: function (callback) {
        fetch('https://ipapi.co/json')
          .then(response => response.json())
          .then(data => callback(data.country_code))
          .catch(() => callback('PT')); // fallback
      },
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
    });
  
    // Validação ao digitar no campo
    input.addEventListener("input", function () {
      const valor = input.value;
  
      // Se o valor tiver letras (A-Z, a-z), é inválido
      if (/[a-zA-Z]/.test(valor)) {
        input.classList.add("is-invalid");
        
 
        // Abrir a dropdown de países
        const dropdownButton = input.parentElement.querySelector(".iti__flag-container");
        if (dropdownButton) {
          dropdownButton.click();
        }
      } else {
        input.classList.remove("is-invalid");
      }
    });
  
    // Validação no envio do formulário
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
      if (!iti.isValidNumber()) {
        e.preventDefault();
        input.classList.add("is-invalid");
        alert("Número de telefone inválido!");
      } else {
        input.classList.remove("is-invalid");
      }
    });
  });
  
