# Landing Page Otimizada para Eventos

Uma landing page moderna e otimizada para captura de leads, integrada com Hotmart Send.

## Características

- Design moderno e responsivo
- Formulário de captura otimizado
- Integração com Hotmart Send
- Animações suaves de scroll
- Seções de benefícios e depoimentos
- Alta taxa de conversão

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env.local`
   - Adicione sua URL do webhook do Hotmart Send

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Para produção:
```bash
npm run build
npm start
```

## Integração com Hotmart Send

1. No Hotmart Send, crie uma nova automação
2. Crie um webhook para receber os leads
3. Copie a URL do webhook e adicione no arquivo `.env.local`

## Deploy

Esta aplicação pode ser facilmente deployada em plataformas como:
- Vercel
- Netlify
- DigitalOcean

## Tecnologias Utilizadas

- Next.js 14
- React
- TailwindCSS
- React Hook Form
- Zod para validação
