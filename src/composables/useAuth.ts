import { ref } from 'vue'

interface Usuario{
    nome:string
    email:string
    senha:string
}

const usuarios = ref<Usuario[]>([])

export function useAuth(){

    function cadastrar(nome:string,email:string,senha:string){
        usuarios.value.push({
            nome,
            email,
            senha
        })
    }

    function login(email:string,senha:string){

        return usuarios.value.find(
            usuario =>
            usuario.email === email &&
            usuario.senha === senha
        )
    }

    function resetarSenha(email:string){

        return usuarios.value.find(
            usuario => usuario.email === email
        )
    }

    return{
        cadastrar,
        login,
        resetarSenha
    }

}