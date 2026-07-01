# Site — Dra. Rafaela Simões (Dentista)

Site institucional (one-page) para captação de pacientes do consultório da
**Dra. Rafaela Simões** — clínica geral e especialista em Prótese Dentária e DTM,
em Araraquara-SP.

Feito com HTML, CSS e JavaScript puros (sem dependências, sem build). Basta abrir
no navegador ou publicar em qualquer hospedagem estática.

## Estrutura

```
index.html        # conteúdo e estrutura de todas as seções
css/style.css     # estilos, paleta e layout responsivo (mobile-first)
js/main.js        # menu mobile, rolagem suave, formulário -> WhatsApp
assets/           # favicon e imagens
```

## Como visualizar localmente

- **Modo simples:** dê duplo clique em `index.html`.
- **Com servidor local** (recomendado para testar o mapa e o WhatsApp):
  ```bash
  python -m http.server
  ```
  Depois acesse http://localhost:8000

## Como editar as informações

Todos os dados reais estão no `index.html`. Os principais pontos para trocar:

| O que | Onde |
|-------|------|
| Nome, CRO, textos | `index.html` (seções `hero`, `sobre`, rodapé) |
| Número do WhatsApp | `index.html` (links `wa.me/5516997864686`) **e** `js/main.js` (`WHATSAPP_NUMBER`) |
| Instagram | links `instagram.com/drarafaelasimoes` |
| Endereço / mapa | seção `#localizacao` (texto e `iframe` do Google Maps) |
| Horário | seção `#localizacao` e rodapé |
| Serviços | seção `#servicos` (cards) |

### Adicionar a foto da Dra.

1. Coloque a imagem em `assets/` (ex.: `assets/rafaela.jpg`).
2. No `index.html`, substitua os blocos `hero__photo` e `about__photo` por:
   ```html
   <img src="assets/rafaela.jpg" alt="Dra. Rafaela Simões" />
   ```

## Dados atuais

- **Nome:** Dra. Rafaela Simões — CRO-SP 136979
- **Especialidades:** Clínica geral · Prótese Dentária · DTM
- **WhatsApp:** (16) 99786-4686
- **Instagram:** [@drarafaelasimoes](https://www.instagram.com/drarafaelasimoes/)
- **Endereço:** R. Domingos Barbieri, 345 — Vila Harmonia, Araraquara - SP, 14802-510
- **Horário:** Seg. a sex., 8h às 20h

## Como publicar (grátis)

- **GitHub Pages:** suba o repositório e ative o Pages nas configurações (branch `main`).
- **Netlify / Vercel:** arraste a pasta do projeto ou conecte o repositório.
