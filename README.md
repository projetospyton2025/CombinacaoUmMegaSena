﻿# Calculadora de CombinaÃ§Ãµes para Loterias

Este projeto implementa uma calculadora de combinaÃ§Ãµes com interface web para auxiliar
na geraÃ§Ã£o de combinaÃ§Ãµes de nÃºmeros para jogos de loteria.

## Estrutura do Projeto

```
Combinacao-I/
â”‚
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ static/
â”‚   â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â”œâ”€â”€ js/
â”‚   â”‚   â””â”€â”€ img/
â”‚   â”‚
â”‚   â”œâ”€â”€ templates/
â”‚   â”‚   â””â”€â”€ index.html
â”‚   â”‚
â”‚   â””â”€â”€ app.py
â”‚
â”œâ”€â”€ logs/
â”œâ”€â”€ tests/
â”œâ”€â”€ venv/
â”œâ”€â”€ .env
â””â”€â”€ requirements.txt
```

## Funcionalidades

- Interface web responsiva
- CÃ¡lculo de combinaÃ§Ãµes com qualquer quantidade de nÃºmeros
- VisualizaÃ§Ã£o clara dos resultados
- Suporte a scrolling para muitas combinaÃ§Ãµes
- Sistema de logs para rastreamento de erros

## Como usar

1. Ative o ambiente virtual:
   ```
   .\venv\Scripts\Activate
   ```

2. Execute o programa:
   ```
   flask run
   ```

3. Abra o navegador em `http://localhost:5000`
4. Digite os nÃºmeros desejados separados por vÃ­rgula
5. Especifique o tamanho do agrupamento
6. Clique em "Calcular CombinaÃ§Ãµes"

## Requisitos

- Python 3.x
- Flask
- python-dotenv
- Werkzeug
