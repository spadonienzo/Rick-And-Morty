import Card from './Card';

export default function Cards({characters}){
   return(

      characters.map(({id,name,status,species,gender,image,origin}) => {
         
         return(
            <div>
            <Card          
            key = {id}
            id = {id}
            name = {name}
            status = {status}
            species = {species}
            gender = {gender}
            origin = {origin.name}
            image = {image}
            onClose={() => alert('Emulamos que se cierra la card')}
            />
            </div>
         )
      })
   )
}
