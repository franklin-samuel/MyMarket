# 🛒 MyMarket

**MyMarket** é um aplicativo mobile desenvolvido em **React Native (Expo)** com foco em otimizar a experiência de compra e organização de pedidos no dia a dia. Ideal para pequenos comércios, usuários domésticos e empreendedores, o app oferece uma experiência fluida, intuitiva e moderna — com recursos de gerenciamento de carrinho, histórico de pedidos, animações interativas e persistência de dados local.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna e escalável:

- React Native (Expo) — desenvolvimento mobile multiplataforma  
- React Navigation — navegação entre telas  
- React Context API — gerenciamento de estado global (carrinho, pedidos, endereço)  
- AsyncStorage — persistência local de dados (histórico de pedidos, endereços salvos)  
- Lottie — animações fluidas para transições e confirmações de ações  
- Styled Components — estilização com CSS-in-JS  
- ESLint + Prettier — padronização e qualidade de código  

---

## 📱 Funcionalidades

- ✅ Adicionar e remover produtos do carrinho  
- ✅ Seleção de endereço e opção de salvar para futuras compras  
- ✅ Confirmação de pedido com animação de sucesso via Lottie  
- ✅ Histórico de pedidos com dados persistentes localmente  
- ✅ Integração fluida com React Context para compartilhamento de dados entre telas  
- ✅ Layout limpo, profissional e responsivo  
- ✅ Controle de quantidade com UI intuitiva e acessível  

---

## 🧠 Arquitetura e Boas Práticas

- Componentização: Separação clara entre componentes reutilizáveis e páginas  
- Contextos separados: Organização por responsabilidade (Carrinho, Pedido, Endereço)  
- Persistência assíncrona: Utilização de AsyncStorage com serialização/deserialização segura  
- Experiência do usuário: Feedback visual com animações, botões de ação claros e fluxo simplificado  
- Extensível: Fácil adaptação para integrar com back-end ou banco de dados remoto futuramente  

---

## 📂 Estrutura de Pastas (resumida)

```
📁 startapp
├── 📁 .expo
├── 📁 app
│   ├── 📁 (tabs)
│   │   ├── _layout.tsx
│   │   ├── carrinho.tsx
│   │   ├── historico.tsx
│   │   └── index.tsx
│   ├── 📁 contexts
│   │   ├── adressContext.tsx
│   │   ├── cartContext.tsx
│   │   ├── historyContext.tsx
│   │   └── orderContext.tsx
│   ├── 📁 product
│   ├── _layout.tsx
│   ├── address.tsx
│   ├── confirmation.tsx
│   └── selectPayment.tsx
├── 📁 assets
├── 📁 components
├── 📁 node_modules
├── 📁 src
│   └── 📁 data
│       └── products.ts
├── .gitignore
├── app.json
├── app.config.js
├── expo-env.d.ts
├── package.json
├── package-lock.json
└── tsconfig.json

```

---

## ⚙️ Como rodar o projeto localmente

> Este projeto utiliza **Expo** para facilitar o desenvolvimento e testes em dispositivos físicos ou emuladores.

### Pré-requisitos

- Node.js instalado  
- Expo CLI instalado globalmente:

```
npm install -g expo-cli
```

- Um emulador Android/iOS ou o app **Expo Go** instalado no seu celular (disponível na App Store e Google Play)

### Passo a passo

1. Clone o repositório:

```
git clone https://github.com/franklin-samuel/MyMarket.git
```

2. Acesse o diretório do projeto:

```
cd mymarket
```

3. Instale as dependências:

```
npm install
```

4. Inicie o servidor de desenvolvimento Expo:

```
npx expo start
```

5. Execute no seu dispositivo:  
   - No celular: escaneie o QR code com o app Expo Go  
   - No emulador Android/iOS: pressione `a` (Android) ou `i` (iOS) no terminal do Expo

---

## 🧪 Futuras implementações

- [ ] Autenticação de usuários  
- [ ] Push notifications  
- [ ] Compartilhamento de pedidos via WhatsApp  
- [ ] Temas personalizados e modo escuro  

---

## 🤝 Contato

Caso você represente uma empresa, startup ou núcleo de tecnologia interessado no projeto, sinta-se à vontade para entrar em contato:

- 📧 Email: seuemail@exemplo.com  
- 💼 Telefone: 55+ (84) 9 9921-6842  
- 🧠 Desenvolvedor: Samuel Franklin

---

