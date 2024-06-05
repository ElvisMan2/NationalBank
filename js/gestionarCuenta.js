function getUserLocalData() { //obtiene el usuario local
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

async function updateUserLocalData() {
  userId=getUserLocalData().id;
  const url = 'http://167.71.97.221:8080/api/user/'+userId;

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
      }

      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));

  } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
  }
}


document.getElementById('aperturarCuenta').addEventListener('click',()=>{
  function getUserLocalData() {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
  }

  htmlAjax('nueva-cuenta.html', 'info');
  
  const user = getUserLocalData();
  
  // Añadir un pequeño retraso para asegurarse de que el DOM ha sido actualizado completamente
  setTimeout(() => {
      document.getElementById('numero-documento').value = user.numIdentification;
      document.getElementById('nombres').value = user.firstName;
      document.getElementById('apellidos').value = user.lastName;
      document.getElementById('celular').value = user.phone;
      document.getElementById('fecha-nacimiento').value = user.birthDate;
  }, 500); // Puedes ajustar este tiempo según sea necesario
});

document.getElementById('suspenderCuenta').addEventListener('click', ()=>{
    function populateAccountSelect() {
        const user = getUserLocalData();
        
        if (user && user.bankAccounts) {
          const accountSelect = document.getElementById('accountSelect');
          
          user.bankAccounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = `Cuenta: ${account.accountNumber} - Saldo: ${account.balance} - Estado: ${account.status}`;
            if (account.status === 'ACTIVE') {
              accountSelect.appendChild(option);
            }
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

document.getElementById('reactivarCuenta').addEventListener('click', ()=>{
  function populateAccountSelect() {
      const user = getUserLocalData();
      
      if (user && user.bankAccounts) {
        const accountSelect = document.getElementById('accountSelect');
        
        user.bankAccounts.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = `Cuenta: ${account.accountNumber} - Saldo: ${account.balance} - Estado: ${account.status}`;
            if (account.status === 'SUSPENDIDA') {
              accountSelect.appendChild(option);
            }
            

        });
      } else {
        console.error('No se encontraron cuentas bancarias para el usuario.');
      }
    }

  htmlAjax('reactivar-cuenta.html', 'info');
  
  setTimeout(() => {
      populateAccountSelect();
  }, 500); // Puedes ajustar este tiempo según sea necesario
  
});






