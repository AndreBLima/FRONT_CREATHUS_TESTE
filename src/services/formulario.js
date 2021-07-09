import { http } from './config'

export default {

   listar: () => {
       return http.get('formulario')
   },

   salvar: (pessoa) => {
       return http.post('formulario', pessoa)
   },

   atualizar: (pessoa) => {
    return http.put('formulario', pessoa)
},
    apagar: (pessoa) =>{
        return http.delete('formulario',{data:pessoa})
    }

}
