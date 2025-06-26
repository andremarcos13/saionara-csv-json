# 🚀 Saionara Helper - CSV to JSON Converter

Uma aplicação web simples e eficiente para converter arquivos CSV com estrutura de porcentagens para JSON com valores decimais.

## ✨ Funcionalidades

- **Upload de arquivo CSV** via interface web
- **Conversão automática** de porcentagens para decimais
- **Preview do JSON** gerado
- **Download automático** com nome do arquivo original
- **Detecção automática** de delimitadores (; ou ,)
- **Interface responsiva** e fácil de usar
- **Deploy na Vercel** - pronto para produção

## 🎯 Como Usar

### 1. Acesse a aplicação
- URL: [https://saionara-csv-json-prje.vercel.app/]
- Ou rode localmente: `npm run dev`

### 2. Faça upload do CSV
- Clique em "Escolher arquivo"
- O arquivo deve ter a estrutura especificada abaixo

### 3. Converta e baixe
- Clique em "Converter"
- Visualize o JSON gerado
- Clique em "Baixar JSON" para salvar

## 📋 Estrutura do CSV Necessária

Seu arquivo CSV deve ter exatamente esta estrutura:

```csv
mb;fee
0,00%;0,00%
0,10%;0,00%
0,20%;0,00%
0,30%;0,00%
0,40%;0,00%
0,50%;0,00%
```

### Requisitos:
- **Cabeçalho obrigatório**: `mb;fee`
- **Valores em porcentagem**: usando vírgula como separador decimal
- **Delimitador**: `;` (ponto e vírgula) ou `,` (vírgula)
- **Codificação**: UTF-8

## 📤 JSON Gerado

O arquivo JSON terá esta estrutura:

```json
[
  {
    "mb": 0.0,
    "fee": 0.0
  },
  {
    "mb": 0.001,
    "fee": 0.0
  },
  {
    "mb": 0.002,
    "fee": 0.0
  }
]
```

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: Next.js API Routes
- **Deploy**: Vercel
- **Estilização**: CSS inline (simples e eficiente)

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_SEU_REPO]
   cd csv-to-json-web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
csv-to-json-web/
├── src/
│   └── app/
│       ├── api/
│       │   └── csv-to-json/
│       │       └── route.ts          # API de conversão
│       │       └── page.tsx                  # Página principal
│       │       └── layout.tsx                # Layout da aplicação
│       │       └── globals.css               # Estilos globais
├── public/                           # Arquivos estáticos
├── package.json                      # Dependências
├── next.config.ts                    # Configuração Next.js
└── README.md                         # Este arquivo
```

## 🔧 API Endpoints

### POST `/api/csv-to-json`
Converte arquivo CSV para JSON

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (arquivo CSV)

**Response:**
```json
[
  {
    "mb": 0.001,
    "fee": 0.0
  }
]
```

## 🐛 Solução de Problemas

### Erro: "Cabeçalho do CSV deve ser: mb;fee"
- Verifique se a primeira linha do CSV é exatamente `mb;fee`
- Certifique-se de que não há espaços extras

### Erro: "Arquivo não enviado"
- Verifique se selecionou um arquivo antes de converter
- Certifique-se de que o arquivo tem extensão `.csv`

### Erro de conversão
- Verifique se os valores estão no formato correto (ex: `0,10%`)
- Certifique-se de que o delimitador está correto

## 📈 Melhorias Futuras

- [ ] Suporte a mais formatos de entrada
- [ ] Preview do CSV antes da conversão
- [ ] Validação em tempo real
- [ ] Histórico de conversões
- [ ] Temas claro/escuro
- [ ] Suporte a múltiplos arquivos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver sugestões:

1. Abra uma issue no GitHub
2. Entre em contato através do email: [andre@nexusconsultoriams.com.br]

---
