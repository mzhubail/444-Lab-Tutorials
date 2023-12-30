import { ValidationErrors } from "@angular/forms";


/**
 * Filter a list.
 *
 * @param originalList  List of items to be filtered
 * @param searchTerm    The term to look for in the items attributes
 * @param extractor     A function returning what attributes of the item to
 * match against.
 * @returns A subset of the items filtered by matching the attributes returend
 * by `extractor` against `searchTerm`
 */
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


/** Converts angular provided validation errors to error message */
export function convertErrorsToMessage(name: string, errors: ValidationErrors | null): string | undefined {
  // console.log({name, errors: errors})
  if (errors == null)
    return;
  var entries = Object.entries(errors);
  if (entries.length == 0)
    return;
  var [errorName, errorContent] = entries[0];
  // console.log(errorName, errorContent);

  switch (errorName) {
    case 'required':
      return `${name} is required`;
    case 'min':
      return `${name} has to be greater than or equal to ${errorContent.min}`;
    case 'max':
      return `${name} has to be less than or equal to ${errorContent.max}`;
    case 'minlength':
      return `${name} has to be at least ${errorContent.requiredLength} characters`;
    case 'maxlength':
      return `${name} has to be at least ${errorContent.requiredLength} characters`;
    case 'email':
      return (name.toLowerCase() != 'email')
        ? `${name} is not a valid email`
        : `${name} is not valid`;
    case 'pattern':
      return `${name} is not valid`;

    default:
      console.log(errors);
      console.warn(`The error '${errorName}' was not catched`, errorContent);
      return `${name} is not valid`;
  }
}
