// cli.ts
import { performance } from 'perf_hooks';

// Estrutura para a árvore de palavras
type WordTree = {
  [key: string]: WordTree | null;
};

// Exemplo de árvore de palavras
const wordTree: WordTree = {
  Animais: {
    Mamíferos: {
      Carnívoros: {
        Felinos: {
          Leões: null,
          Tigres: null,
          Jaguars: null,
          Leopardos: null,
        },
      },
      Herbívoros: {
        Equídeos: {
          Cavalos: null,
          Zebras: null,
          Asnos: null,
        },
        Bovídeos: {
          Bois: null,
          Búfalos: null,
          Antílopes: null,
          Cabras: null,
        },
        Primatas: {
          Gorilas: null,
          Chimpanzés: null,
          Orangotangos: null,
        },
      },
    },
    Aves: {
      Rapinas: {
        Águias: null,
        Falcões: null,
        Corujas: null,
        Milhafres: null,
      },
      Pássaros: {
        Canários: null,
      },
    },
  },
};

// Função para carregar a árvore e calcular o tempo de execução
function loadTree(): [WordTree, number] {
  const start = performance.now();
  const tree = wordTree;
  const end = performance.now();
  return [tree, end - start];
}

// Função para buscar palavras em uma profundidade específica
function getWordsAtDepth(tree: WordTree, depth: number, currentDepth = 0): string[] {
  if (depth === currentDepth) {
    return Object.keys(tree);
  }

  let words: string[] = [];
  for (const key in tree) {
    const subtree = tree[key];
    if (subtree) {
      words = words.concat(getWordsAtDepth(subtree, depth, currentDepth + 1));
    }
  }
  return words;
}

function analyzePhrase(tree: WordTree, phrase: string, depth: number): { [key: string]: number } {
    const wordsAtDepth = getWordsAtDepth(tree, depth);
    const wordCounts: { [key: string]: number } = {};
    
    // Normaliza as palavras na árvore para minúsculas
    wordsAtDepth.forEach(word => {
      wordCounts[word.toLowerCase()] = 0;
    });
  
    // Divide a frase em palavras e normaliza para minúsculas
    const phraseWords = phrase.toLowerCase().split(/\s+/);
    phraseWords.forEach(word => {
      if (word in wordCounts) {
        wordCounts[word]++;
      }
    });
  
    return wordCounts;
  }

// Função principal para executar o CLI
async function main() {
  const args = process.argv.slice(2);
  const depthIndex = args.indexOf('--depth');
  const verbose = args.includes('--verbose');
  const phrase = args.filter(arg => !arg.startsWith('--')).join(' ');

  if (depthIndex === -1 || !phrase) {
    console.error('Uso correto com Bun: bun run cli.ts analyze --depth <n> --verbose (opcional) "frase para analisar"');
    console.error('Uso correto com NPX: npx ts-node cli.ts analyze --depth <n> --verbose (opcional) "frase para analisar"');
    process.exit(1);
  }

  const depth = parseInt(args[depthIndex + 1]);

  const [tree, loadTime] = loadTree();
  const startAnalysis = performance.now();
  const wordCounts = analyzePhrase(tree, phrase, depth);
  const endAnalysis = performance.now();

  console.table(wordCounts);

  if (verbose) {
    console.table({
      'Tempo de Carregamento dos Parâmetros (ms)': loadTime.toFixed(2),
      'Tempo de Verificação da Frase (ms)': (endAnalysis - startAnalysis).toFixed(2),
    });
  }
}

main().catch(error => console.error('Erro:', error));