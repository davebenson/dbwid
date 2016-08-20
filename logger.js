
export class Logger {
  static warn(msg) { console.log(`WARNING: ${msg}`); }
  static error(msg) { console.log(`ERROR: ${msg}`); process.exit(1); }
}
