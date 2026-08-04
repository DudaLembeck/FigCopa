import { ref } from 'vue';

export interface Tarefa{
    id: number
    nome: string
    descricao: string
}

export const Tarefas = ref<Tarefa[]>([
    {
    id: 1,
    nome: "Estudar TypeScript",
    descricao: "Revisar interfaces, tipos e funções."
  },
  {
    id: 2,
    nome: "Fazer exercícios de lógica",
    descricao: "Resolver 10 exercícios de programação."
  },
  {
    id: 3,
    nome: "Projeto pessoal",
    descricao: "Adicionar sistema de login no projeto."
  },
  {
    id: 4,
    nome: "Estudar japonês",
    descricao: "Praticar hiragana e vocabulário básico."
  },
  {
    id: 5,
    nome: "Organizar arquivos",
    descricao: "Separar documentos e códigos por pasta."
  }
])
