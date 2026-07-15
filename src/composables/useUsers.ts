import { ref } from "vue"

interface Usuario {
  nome: string
  email: string
  senha: string
}

export const Usuarios = ref<Usuario[]>([])

// ====================
// Validação de Senha
// ====================

export const validarSenha = (senha: string): { valida: boolean; mensagem: string } => {
  if (senha.length < 6) {
    return { valida: false, mensagem: "A senha deve ter pelo menos 6 caracteres" }
  }
  if (!/[A-Z]/.test(senha)) {
    return { valida: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula" }
  }
  if (!/[0-9]/.test(senha)) {
    return { valida: false, mensagem: "A senha deve conter pelo menos um número" }
  }
  return { valida: true, mensagem: "Senha forte" }
}

// ====================
// Cadastro
// ====================

export const Cadastrar = (
  CampoNome: string,
  CampoEmail: string,
  CampoSenha: string
): { sucesso: boolean; mensagem: string } => {

  // Validar campos obrigatórios
  if (!CampoNome.trim()) {
    return { sucesso: false, mensagem: "Nome é obrigatório" }
  }
  if (!CampoEmail.trim()) {
    return { sucesso: false, mensagem: "E-mail é obrigatório" }
  }
  if (!CampoSenha.trim()) {
    return { sucesso: false, mensagem: "Senha é obrigatória" }
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(CampoEmail)) {
    return { sucesso: false, mensagem: "E-mail inválido" }
  }

  // Validar senha
  const validacao = validarSenha(CampoSenha)
  if (!validacao.valida) {
    return { sucesso: false, mensagem: validacao.mensagem }
  }

  // Verificar se email já existe
  if (Usuarios.value.some(u => u.email === CampoEmail)) {
    return { sucesso: false, mensagem: "Este e-mail já está cadastrado" }
  }

  Usuarios.value.push({
    nome: CampoNome,
    email: CampoEmail,
    senha: CampoSenha
  })

  console.log("Usuário cadastrado:", CampoNome)
  return { sucesso: true, mensagem: "Cadastro realizado com sucesso!" }
}


// ====================
// Login
// ====================

export const usuarioLogado = ref<Usuario | null>(null)

export const Logar = (
  CampoEmail: string,
  CampoSenha: string
): { sucesso: boolean; mensagem: string } => {

  if (!CampoEmail.trim() || !CampoSenha.trim()) {
    return { sucesso: false, mensagem: "E-mail e senha são obrigatórios" }
  }

  const usuarioEncontrado = Usuarios.value.find(
    usuario =>
      usuario.email === CampoEmail &&
      usuario.senha === CampoSenha
  )

  if (usuarioEncontrado) {
    usuarioLogado.value = usuarioEncontrado
    console.log("Usuário encontrado:", usuarioEncontrado.nome)
    return { sucesso: true, mensagem: "Login realizado com sucesso!" }
  } else {
    console.log("Usuário não encontrado")
    return { sucesso: false, mensagem: "E-mail ou senha incorretos" }
  }
}

// ====================
// Logout
// ====================

export const Logout = () => {
  usuarioLogado.value = null
  console.log("Usuário desconectado")
}

// ====================
// Recuperação de Senha
// ====================

export const recuperarSenha = (email: string): { sucesso: boolean; mensagem: string } => {
  if (!email.trim()) {
    return { sucesso: false, mensagem: "E-mail é obrigatório" }
  }

  const usuarioEncontrado = Usuarios.value.find(u => u.email === email)

  if (!usuarioEncontrado) {
    return { sucesso: false, mensagem: "E-mail não encontrado" }
  }

  // Simular envio de email
  console.log(`E-mail de recuperação enviado para: ${email}`)
  return { sucesso: true, mensagem: "E-mail de recuperação enviado com sucesso!" }
}