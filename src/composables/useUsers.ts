import { ref } from "vue";

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

const usuarios = ref<Usuario[]>([]);

export const cadastrar = (
  campoNome: string,
  campoSenha: string,
  campoEmail: string
) => {
  usuarios.value.push({
    nome: campoNome,
    senha: campoSenha,
    email: campoEmail,
  });

  console.log("Usuário cadastrado: " + campoNome);
};