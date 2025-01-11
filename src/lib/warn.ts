export const ignoreWarn = () => {
  const originalConsoleError = console.warn;

  console.warn = function (message, ...args) {
    if (
      typeof message === 'string' &&
      message.includes('Mixing shorthand and longhand properties within the same style object')
    ) {
      return; // Ignore the error
    }
    originalConsoleError(message, ...args); // Log other errors
  };
};
