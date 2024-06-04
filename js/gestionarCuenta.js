document.getElementById('aperturarCuenta').addEventListener('click', async function() {
    function getUserData() {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    await htmlAjax('nueva-cuenta.html', 'info');
    
    const user = getUserData();
    
    // Añadir un pequeño retraso para asegurarse de que el DOM ha sido actualizado completamente
    setTimeout(() => {
        document.getElementById('numero-documento').value = user.numIdentification;
        document.getElementById('nombres').value = user.firstName;
        document.getElementById('apellidos').value = user.lastName;
        document.getElementById('celular').value = user.phone;
        document.getElementById('fecha-nacimiento').value = user.birthDate
        ;
        

    }, 500); // Puedes ajustar este tiempo según sea necesario
});


