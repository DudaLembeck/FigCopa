import { ref } from "vue";

import {
  addUsuario,
  realizarLogin
} from "@/services/database";

export const usuarioLogado = ref<any | null>(null);

export function useAuth() {


async function login(email: string, senha: string) {
  try {
    const emailNormalizado = email.trim().toLowerCase()
    console.log('Tentando login com email:', emailNormalizado)

    const usuarios = await realizarLogin(emailNormalizado, senha)

    if (usuarios && usuarios.length > 0) {
      usuarioLogado.value = usuarios[0]
      console.log('Login bem-sucedido:', usuarioLogado.value)
      return {
        sucesso: true,
        mensagem: 'Login realizado com sucesso!'
      }
    } else {
      console.warn('Nenhum usuário encontrado para', emailNormalizado)
      return {
        sucesso: false,
        mensagem: 'E-mail ou senha inválidos'
      }
    }
  } catch (erro) {
    console.error('Erro no login:', erro)
    return {
      sucesso: false,
      mensagem: 'Erro ao tentar fazer login. Tente novamente mais tarde.'
    }
  }
}

  async function cadastrar(
    nome: string,
    email: string,
    senha: string
  ) {

    // Validação de senha simplificada para facilitar o uso, mas garantindo o mínimo
    if (senha.length < 6) {
      return {
        sucesso: false,
        mensagem: "A senha deve ter pelo menos 6 caracteres."
      };
    }

    try {
      console.log('Tentando cadastrar usuário:', email);
      await addUsuario(
        nome,
        email.trim().toLowerCase(),
        senha
      );

      return {
        sucesso: true,
        mensagem: "Cadastro realizado com sucesso!"
      };
    } catch (error: any) {
      console.error('Erro ao cadastrar usuário:', error);
      return {
        sucesso: false,
        mensagem: error.message || "Erro ao cadastrar. Tente novamente."
      };
    }

  }

  function logout() {

    usuarioLogado.value = null;

  }

  async function resetarSenha(
    email: string
  ) {

    return {
      sucesso: true,
      mensagem: "Link enviado para " + email
    };

  }

  return {

    usuarioLogado,

    login,

    cadastrar,

    logout,

    resetarSenha

  };

}