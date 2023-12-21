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
