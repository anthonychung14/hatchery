/**
 * Takes in a string and count. If count is not one, it appends an `s` to the string.
 */

export const simplePluralize = (string: string, count: number) => {
  const VOWELS = 'aeiou';
  // Don't do anything if count is one.
  if (count === 1) return string;
  // Replace ...y with ...ies if the preceding character is not a vowel.
  if (
    string.endsWith('y') &&
    !VOWELS.includes(string.charAt(string.length - 2))
  ) {
    return `${string.substring(0, string.length - 1)}ies`;
  }
  // Otherwise just tack on an s.
  return `${string}s`;
};
