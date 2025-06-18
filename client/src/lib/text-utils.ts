export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

export function sortAlphabetically(text: string, order: 'asc' | 'desc' = 'asc'): string {
  const items = text.split(/[,\n]/).map(item => item.trim()).filter(item => item);
  
  items.sort((a, b) => {
    if (order === 'asc') {
      return a.localeCompare(b, 'pt', { sensitivity: 'base' });
    } else {
      return b.localeCompare(a, 'pt', { sensitivity: 'base' });
    }
  });
  
  return items.join('\n');
}

export function countOccurrences(text: string, word: string): number {
  if (!word) return 0;
  
  const regex = new RegExp(word, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

export function convertCase(text: string, type: 'upper' | 'lower' | 'title' | 'sentence'): string {
  switch(type) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case 'sentence':
      return text.toLowerCase().replace(/(^\w{1}|\.\s*\w{1})/gi, (letter) => letter.toUpperCase());
    default:
      return text;
  }
}

export function getTextStats(text: string) {
  return {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length
  };
}
