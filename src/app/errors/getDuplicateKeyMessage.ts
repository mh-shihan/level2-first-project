function getDuplicateKeyMessage(err: string): string {
  const dupKeyMatch = err.match(/dup key: ({[^}]+})/);
  const dupKey = dupKeyMatch ? dupKeyMatch[1] : null;

  if (dupKey) {
    const parsedDupKey = JSON.parse(
      dupKey.replace(/([a-zA-Z0-9_]+):/g, '"$1":'), // Ensure keys are quoted
    );

    const key = Object.keys(parsedDupKey);
    if (key.length > 0) {
      return `Duplicate ${key[0]}: This "${parsedDupKey[key[0]]}" ${key[0]} already exists!`;
    }
  }

  // Fallback message if no specific key is found
  return '';
}

export default getDuplicateKeyMessage;
