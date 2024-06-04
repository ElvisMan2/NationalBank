document.getElementById('suspenderCuenta').addEventListener('click', ()=>{
    function getUserData() {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    function populateAccountSelect() {
        const user = getUserData();
        
        if (user && user.bankAccounts) {
          const accountSelect = document.getElementById('accountSelect');
          
          user.bankAccounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = `Cuenta: ${account.accountNumber} - Saldo: ${account.balance} - Estado: ${account.status}`;
            accountSelect.appendChild(option);
          });
        } else {
          console.error('No se encontraron cuentas bancarias para el usuario.');
        }
      }

    htmlAjax('suspender-cuenta.html', 'info');
    
    setTimeout(() => {
        populateAccountSelect();
    }, 500); // Puedes ajustar este tiempo según sea necesario
    
});

document.getElementById('aperturarCuenta').addEventListener('click',()=>{
    function getUserData() {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    }

    htmlAjax('nueva-cuenta.html', 'info');
    
    const user = getUserData();
    
    // Añadir un pequeño retraso para asegurarse de que el DOM ha sido actualizado completamente
    setTimeout(() => {
        document.getElementById('numero-documento').value = user.numIdentification;
        document.getElementById('nombres').value = user.firstName;
        document.getElementById('apellidos').value = user.lastName;
        document.getElementById('celular').value = user.phone;
        document.getElementById('fecha-nacimiento').value = user.birthDate;
    }, 500); // Puedes ajustar este tiempo según sea necesario
});






