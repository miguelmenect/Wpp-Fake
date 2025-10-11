export interface Message {
  id: string;
  sender: "user" | "contact";
  text: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
}

const now = new Date();

export const chatsData: Chat[] = [
  {
    id: "1",
    name: "Carlos Aarav",
    avatar: "/img/profile pics/1.jpg",
    messages: [
      {
        id: "1",
        sender: "contact",
        text: "Oi, tudo bem?",
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "user",
        text: "Tudo ótimo! E você?",
        timestamp: new Date(now.getTime() - 90 * 60 * 1000),
      },
      {
        id: "3",
        sender: "contact",
        text: "Tudo bem! Como andam as demandas do mês?",
        timestamp: new Date(now.getTime() - 93 * 60 * 1000),
      },
    ],
  },
  {
    id: "2",
    name: "Clara Gestora",
    avatar: "/img/profile pics/3.jpg",
    messages: [
      {
        id: "1",
        sender: "contact",
        text: "Acabei de verificar a entrega do projeto",
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "user",
        text: "Maravilha, e o que achou?",
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "contact",
        text: "Ficou ótimo! Obrigada",
        timestamp: new Date(now.getTime() - 122 * 60 * 1000),
      },
    ],
  },
  {
    id: "3",
    name: "Daniel Youssef",
    avatar: "/img/profile pics/2.jpg",
    messages: [
      {
        id: "1",
        sender: "user",
        text: "Manda a planilha atualizada por favor",
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "contact",
        text: "Claro, já encaminhado para seu E-mail",
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "user",
        text: "Valeu!",
        timestamp: new Date(now.getTime() - 256 * 60 * 1000),
      },
    ],
  },
  {
    id: "4",
    name: "Mãe",
    avatar: "/img/profile pics/4.jpg",
    messages: [
      {
        id: "1",
        sender: "user",
        text: "Oi filho, vai levar pipoca no pet?",
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "contact",
        text: "Claro, vou levar hoje no fim da tarde",
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "user",
        text: "Obrigada Filho!",
        timestamp: new Date(now.getTime() - 198 * 60 * 1000),
      },
    ],
  },
  {
    id: "5",
    name: "Dr. Thiago Tamagushi",
    avatar: "/img/profile pics/5.jpg",
    messages: [
      {
        id: "1",
        sender: "contact",
        text: "Boa tarde, entrarei de férias no fim do mês, tudo que precisar peça para a Clara",
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "user",
        text: "Perfeitamente DR Thiago",
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "contact",
        text: "Obrigado!",
        timestamp: new Date(now.getTime() - 210 * 60 * 1000),
      },
    ],
  },
  {
    id: "6",
    name: "Rafael Viagem",
    avatar: "/img/profile pics/6.jpg",
    messages: [
      {
        id: "1",
        sender: "contact",
        text: "Fala irmão, beleza?!",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "contact",
        text: "Tudo certo para esse próximo fim de semana?",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "7",
    name: "Doutor Márcio",
    avatar: "/img/profile pics/7.jpg",
    messages: [
      {
        id: "1",
        sender: "contact",
        text: "Fala irmão, beleza?!",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "contact",
        text: "Tudo certo para esse próximo fim de semana?",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
    ],
  },
];