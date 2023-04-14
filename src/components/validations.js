const validation = (userData) => {
  let errors={}

  if(!/\S+@\S+\.\S+/.test(userData.email)){
    errors.email = 'Ingrese un email valido'
  }
  if(!userData.email){
    errors.email = 'Este campo debe estar completo'
  }
  if(userData.email.length>35){
    errors.email = 'El email no puede tener mas de 35 caracteres'
  }

  if(!userData.password.match(/\d/)){
    errors.password = 'La password debe tener un numero'
  }
  if(userData.password.length<6 || userData.password.length>10){
    errors.password = 'La password debe tener como minimo 6 caracteres y como maximo 10'
  }

  return errors
}

export default validation