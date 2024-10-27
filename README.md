# Analisador de frases com árvore de palavras

Este projeto é uma ferramenta de linha de comando (CLI) desenvolvida em TypeScript que permite analisar frases com base em uma árvore de palavras predefinida. A árvore de palavras é estruturada em níveis de profundidade, e o CLI permite contar a ocorrência de palavras em um nível específico da árvore em uma frase fornecida.

## Estrutura do projeto

- **`cli.ts`**: Arquivo principal do CLI contendo a lógica de análise.
- **Árvore de palavras**: Estrutura de dados em formato de árvore com categorias e subcategorias, como "Animais", "Mamíferos", "Aves", etc., organizada para facilitar a análise de palavras por nível de profundidade.

## Funcionalidades

- Carrega a árvore de palavras e mede o tempo de execução do carregamento.
- Define o nível de profundidade da árvore para a análise.
- Analisa uma frase e conta as ocorrências de palavras encontradas no nível de profundidade especificado.
- Exibe o tempo de execução da análise, com uma opção para visualização detalhada.

## Pré-requisitos

- [Bun](https://bun.sh/) - Runtime JavaScript/TypeScript. Para instalar o Bun, execute o seguinte comando:

  ```bash
  curl -fsSL https://bun.sh/install | bash

## Como Executar

1. Clonar o Repositório

  ```bash  
  git clone [<URL-do-repositorio>](https://github.com/flaviopavim/node-test.git)
  cd node-test
  ```

2. Rodar o CLI com Bun

Para executar o CLI, use o comando abaixo, substituindo <n> pelo nível desejado e "frase para analisar" pela frase que deseja verificar:

  ```bash
  bun run cli.ts analyze --depth <n> --verbose "frase para analisar"
  ```

## Exemplo:

  ```bash
  bun run cli.ts analyze --depth 2 --verbose "Eu tenho preferência por Pássaros"
  ```

## Opções

  ```bash
    --depth <n>: Define o nível de profundidade na árvore a ser analisado.
    --verbose (opcional): Exibe informações detalhadas sobre o tempo de execução.
  ```

## Exemplo Completo

  ```bash
  bun run cli.ts analyze --depth 2 --verbose "Eu gosto de Felinos como Leões e Tigres"
  ```