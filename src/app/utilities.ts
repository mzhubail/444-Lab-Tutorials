export function filterList<T>(
  originalList: T[],
  searchTerm: string,
  extractor: (elem: T) => string[],
): T[] {
  if (searchTerm === '') {
    return originalList;
  }

  return originalList.filter(elem => {
    const strings = extractor(elem);
    for (let i = 0; i < strings.length; i++) {
      // Some attributes may be null, due to invalid data
      if (!strings[i]) {
        console.warn('Encountered undefined/null', strings[i], 'in', strings);
        continue;
      }

      if (match(strings[i], searchTerm))
        return true;
    }
    return false;
  });
}


/** Seach for a specific word inside the given term. */
function match(word: string, searchTerm: string) {
  return word.toLowerCase().includes(
    searchTerm.toLowerCase()
  );
}
