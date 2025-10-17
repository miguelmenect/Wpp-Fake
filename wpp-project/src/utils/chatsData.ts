export interface Message {
  id: string;
  sender: "user" | "contact";
  text: string;
  timestamp: Date;
  senderName?: string;
  senderAvatar?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  messages: Message[];
  isGroup?: boolean;
  lastMessage?: {
    text: string;
    timestamp: Date;
    sender: "user" | "contact";
  };
}

const now = new Date();

function getNextAvailableDate(): string {
  const future = new Date(now);
  future.setDate(future.getDate() + 2);

  const dayOfWeek = future.getDay(); // 0 = domingo, 6 = sábado

  // se cair no sábado (6), pula para segunda (+2)
  // se cair no domingo (0), pula para segunda (+1)
  if (dayOfWeek === 6) {
    future.setDate(future.getDate() + 2);
  } else if (dayOfWeek === 0) {
    future.setDate(future.getDate() + 1);
  }

  // formata como dia/mês
  const day = future.getDate().toString().padStart(2, "0");
  const month = (future.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

const nextDate = getNextAvailableDate();

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
      {
        id: "4",
        sender: "user",
        text: "Todas Finalizadas 👊🏼",
        timestamp: new Date(now.getTime() - 96 * 60 * 1000),
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
        sender: "contact",
        text: "Oi filho, vai levar pipoca no pet?",
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "user",
        text: "Claro, vou levar hoje no fim da tarde",
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "contact",
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
        text: "Perfeitamente Dr Thiago",
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
        text: "Boa tarde! Aqui é o Doutor Márcio",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "user",
        text: "Boa Tarde Doutor!",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "contact",
        text: `Temos hórario para uma consulta no próximo dia ${nextDate} as 09:30`,
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "4",
        sender: "contact",
        text: "Podemos agendar?",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      }
    ],
  },
  //chat de grupo abaixo:
  {
    id: "8",
    name: "Coffee Break da Empresa ☕",
    avatar: "/img/profile pics/8.jpg",
    isGroup: true, // validada como grupo
    messages: [
      {
        id: "1",
        sender: "contact",
        senderName: "Clara Gestora",
        senderAvatar: "/img/profile pics/3.jpg",
        text: "Boa tarde pessoal! Amanhã reunião com equipe de marketing e vendas",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "contact",
        senderName: "Dr. Thiago Tamagushi",
        senderAvatar: "/img/profile pics/5.jpg",
        text: "Boa tarde, Positivo!",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "4",
        sender: "contact",
        senderName: "Carlos Aarav",
        senderAvatar: "/img/profile pics/1.jpg",
        text: "Combinado!!!",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "5",
        sender: "contact",
        senderName: "Clara Gestora",
        senderAvatar: "/img/profile pics/3.jpg",
        text: "Pós reunião um cafézinho na sala de confraternização",
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      },
      {
        id: "6",
        sender: "user",
        text: "Perfeito! Nos vemos amanhã 👍",
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      },
      {
        id: "7",
        sender: "contact",
        senderName: "Daniel Youssef",
        senderAvatar: "/img/profile pics/2.jpg",
        text: "Show! Combinado",
        timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      }
    ],
  },
];