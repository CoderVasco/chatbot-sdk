# 🤖 Chatbot SDK

Este SDK injeta um chatbot completo, bonito e responsivo com **uma única linha de script**. Ideal para sites e aplicações que precisam de um assistente virtual leve e estiloso.

---

## 🚀 Como usar

1. **Adicione o container e o script na sua página HTML**:

```html
<!-- Container do Chatbot -->
<div id="chatbot-container"></div>

<!-- Script do Chatbot SDK -->
<script src="../src/chatbot.js"></script>


💬 O que ele faz?
Injeta automaticamente:

HTML do chatbot

Estilos personalizados (glassmorphism, neon, fontes)

Comportamentos (abrir, fechar, enviar mensagens, upload de arquivos)

Compatível com Tailwind (usa classes utilitárias embutidas)

Totalmente responsivo

Efeito ripple nos botões

Suporte a arquivos: PDF, PNG, JPG (máx. 5MB)

📁 Estrutura do projeto

chatbot-sdk/
├── src/
│   └── chatbot.js       # Arquivo principal com toda a lógica e estilos
├── index.html           # Exemplo básico de uso
└── README.md            # Este arquivo



<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Chatbot SDK Teste</title>
</head>
<body>
  <h1>Exemplo de Integração com o Chatbot</h1>

  <div id="chatbot-container"></div>

  <script src="src/chatbot.js"></script>
</body>
</html>


🛠️ Personalização

Quer mudar os textos, cores, tamanhos ou comportamento? É só editar diretamente o arquivo src/chatbot.js. Tudo está comentado e organizado!

Feito com 💖 por @CoderVasco