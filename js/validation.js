document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    loginForm.addEventListener('submit', validateForm);
});

function validateForm(event) {
    event.preventDefault();
    const documentType = document.getElementById('document-type').value;
    const dni = document.getElementById('dni').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = ''; 

    let valid = true;

    if (!dni) {
        errorMessage.textContent = 'El número de documento es obligatorio.';
        valid = false;
    } else if (documentType === 'DNI' && !/^\d{8}$/.test(dni)) {
        errorMessage.textContent = 'El DNI debe tener 8 dígitos.';
        valid = false;
    } else if (documentType === 'Carnet de Extranjeria' && !/^[a-zA-Z0-9]{9}$/.test(dni)) {
        errorMessage.textContent = 'El Carnet de Extranjería debe tener 9 caracteres.';
        valid = false;
    }

    if (!password) {
        errorMessage.textContent = 'La clave web es obligatoria.';
        valid = false;
    }

    if (valid) {
        // Redirect to menu.html
        window.location.href = 'menu.html';
    }

    return false;
}
