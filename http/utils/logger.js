import morgan from "morgan";
import chalk from "chalk";

// Define log symbols for console methods
const logSymbols = {
  info: chalk.blue("ℹ️"),   // Blue for Info (console.info)
  warn: chalk.yellow("⚠️"), // Yellow for Warning (console.warn)
  error: chalk.red("❌"),   // Red for Error (console.error)
};

// Override console methods to include symbols
const originalConsoleInfo = console.info;
console.info = (...args) => originalConsoleInfo(logSymbols.info, ...args);

const originalConsoleWarn = console.warn;
console.warn = (...args) => originalConsoleWarn(logSymbols.warn, ...args);

const originalConsoleError = console.error;
console.error = (...args) => originalConsoleError(logSymbols.error, ...args);

// Custom Morgan format (No symbols for regular requests)
const customFormat = morgan((tokens, req, res) => {
  return `${chalk.cyan(tokens.method(req, res))} ${tokens.url(req, res)} - ${chalk.green(
    tokens.status(req, res)
  )} ${chalk.magenta(tokens["response-time"](req, res))}ms`;
});

export default customFormat;
