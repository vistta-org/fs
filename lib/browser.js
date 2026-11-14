export { formatSize } from "./shared.js";

/** @param {string} operation */
function unsupported(operation) {
  return () => {
    throw Object.assign(new Error(`@vistta/fs: ${operation} is not supported in the browser.`), {
      code: "ERR_FS_BROWSER_UNSUPPORTED",
    });
  };
}

/** @param {unknown} path @returns {asserts path is string} */
function checkPath(path) {
  if (typeof path !== "string") throw new TypeError("Browser paths must be strings.");
  if (path.includes("\0")) throw new TypeError("Paths must not contain null bytes.");
}

/** @param {string} path */
export function isAbsolute(path) {
  checkPath(path);
  return path.startsWith("/");
}

/** @param {string} path */
export function normalize(path) {
  checkPath(path);
  const absolute = isAbsolute(path);
  const parts = [];
  for (const part of path.split("/")) {
    if (!part || part === ".") continue;
    if (part === ".." && parts.length && parts.at(-1) !== "..") parts.pop();
    else if (part !== ".." || !absolute) parts.push(part);
  }
  const result = (absolute ? "/" : "") + parts.join("/") || ".";
  return path.endsWith("/") && result !== "/" ? result + "/" : result;
}

/** @param {...string} paths */
export function resolve(...paths) {
  let result = "/";
  for (const path of paths) {
    checkPath(path);
    result = isAbsolute(path) ? path : result + "/" + path;
  }
  return normalize(result).replace(/\/+$/, "") || "/";
}

/** @param {string} path @param {string} [suffix] */
export function basename(path, suffix) {
  checkPath(path);
  if (suffix !== undefined && typeof suffix !== "string") throw new TypeError("Suffix must be a string.");
  const name = path.replace(/\/+$/, "").split("/").at(-1) || "";
  if (suffix && suffix.length <= path.length && !name) return path === suffix ? "" : path;
  if (name === suffix && path !== suffix) return name;
  return suffix && name.endsWith(suffix) ? name.slice(0, -suffix.length) : name;
}

/** @param {string} path */
export function dirname(path) {
  checkPath(path);
  const index = path.replace(/\/+$/, "").lastIndexOf("/");
  if (index < 0) return path.startsWith("/") ? "/" : ".";
  return index === 1 && path.startsWith("/") ? "//" : path.slice(0, index) || "/";
}

/** @param {string} path */
export function extname(path) {
  const name = basename(path);
  const index = name.lastIndexOf(".");
  return index > 0 && name !== ".." ? name.slice(index) : "";
}

/** @param {string} from @param {string} to */
export function relative(from, to) {
  const source = resolve(from).split("/").filter(Boolean);
  const target = resolve(to).split("/").filter(Boolean);
  let common = 0;
  while (common < source.length && source[common] === target[common]) common++;
  return [...source.slice(common).map(() => ".."), ...target.slice(common)].join("/");
}

/** @param {string} path @param {string} segment */
export function contains(path, segment) {
  checkPath(path);
  return path.split("/").includes(segment);
}

/** @param {unknown} options @param {string[]} keys */
function checkOptions(options, keys) {
  if (options === undefined || options === null) return;
  if (typeof options !== "object" || Array.isArray(options)) throw new TypeError("Options must be an object.");
  for (const [key, value] of Object.entries(options)) {
    if (!keys.includes(key)) unsupported(`option "${key}"`)();
    if (["recursive", "force", "withFileTypes", "followLink"].includes(key)) {
      if (value !== undefined && typeof value !== "boolean") {
        throw new TypeError(`Option "${key}" must be a boolean.`);
      }
    }
  }
}

async function root() {
  if (!globalThis.navigator?.storage?.getDirectory) unsupported("OPFS (requires a secure context and browser support)")();
  return navigator.storage.getDirectory();
}

/** @param {string} path */
async function parent(path) {
  const absolute = resolve(path);
  const directory = await directoryHandle(dirname(absolute));
  const name = basename(absolute);
  if (!name) throw new DOMException("The OPFS root cannot be used as a file or removed.", "InvalidModificationError");
  return { directory, name };
}

/** @param {string} path */
async function directoryHandle(path) {
  let directory = await root();
  for (const part of resolve(path).split("/").filter(Boolean)) directory = await directory.getDirectoryHandle(part);
  return directory;
}

/** @param {string} path @returns {Promise<FileSystemDirectoryHandle | FileSystemFileHandle>} */
async function handle(path) {
  if (resolve(path) === "/") return root();
  const { directory, name } = await parent(path);
  try {
    return await directory.getDirectoryHandle(name);
  } catch (error) {
    if (!(error instanceof DOMException) || error.name !== "TypeMismatchError") throw error;
    return directory.getFileHandle(name);
  }
}

/** @param {string} path @param {number} [mode] */
export async function access(path, mode = 0) {
  if (mode !== 0) unsupported("access modes other than F_OK")();
  await handle(path);
}

/** @param {string} path */
export async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotFoundError") return false;
    throw error;
  }
}

/** @param {string} path @param {{recursive?: boolean}} [options] */
export async function mkdir(path, options) {
  checkOptions(options, ["recursive"]);
  const absolute = resolve(path);
  if (!options?.recursive) {
    if (await exists(absolute)) throw new DOMException(`Path already exists: ${path}`, "InvalidModificationError");
    const { directory, name } = await parent(absolute);
    await directory.getDirectoryHandle(name, { create: true });
    return;
  }
  let directory = await root();
  /** @type {string | undefined} */
  let first;
  let current = "";
  for (const part of absolute.split("/").filter(Boolean)) {
    current += "/" + part;
    try {
      directory = await directory.getDirectoryHandle(part);
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== "NotFoundError") throw error;
      directory = await directory.getDirectoryHandle(part, { create: true });
      first ??= current;
    }
  }
  return first;
}

/** @param {string} path */
export async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

/** @param {string} path @param {{withFileTypes?: boolean}} [options] */
export async function readdir(path, options) {
  checkOptions(options, ["withFileTypes"]);
  const directory = await directoryHandle(path);
  // The Node async wrapper returns names even with withFileTypes enabled.
  const names = [];
  for await (const name of directory.keys()) names.push(name);
  return names.sort();
}

/** @param {string | {encoding?: string, flag?: string} | null | undefined} options */
function ioOptions(options) {
  const result = typeof options === "string" ? { encoding: options } : (options ?? {});
  checkOptions(result, ["encoding", "flag"]);
  if (result.encoding != null && !["utf8", "utf-8"].includes(result.encoding.toLowerCase())) {
    unsupported(`encoding "${result.encoding}"`)();
  }
  return result;
}

/** @param {string} path @param {string | {encoding?: string, flag?: string}} [options] */
export async function readFile(path, options) {
  const { encoding, flag = "r" } = ioOptions(options);
  if (flag !== "r") unsupported(`readFile flag "${flag}"`)();
  const { directory, name } = await parent(path);
  const file = await (await directory.getFileHandle(name)).getFile();
  const data = new Uint8Array(await file.arrayBuffer());
  return encoding ? new TextDecoder("utf-8", { ignoreBOM: true }).decode(data) : data;
}

/** @param {string} path @param {string | Uint8Array} data @param {string | {encoding?: string, flag?: string}} [options] */
export async function writeFile(path, data, options) {
  const { flag = "w" } = ioOptions(options);
  if (!["w", "a"].includes(flag)) unsupported(`writeFile flag "${flag}"`)();
  if (typeof data !== "string" && !(data instanceof Uint8Array)) throw new TypeError("Data must be a string or Uint8Array.");
  const { directory, name } = await parent(path);
  const file = await directory.getFileHandle(name, { create: true });
  const stream = await file.createWritable({ keepExistingData: flag === "a" });
  try {
    if (flag === "a") await stream.seek((await file.getFile()).size);
    // Copy typed arrays so SharedArrayBuffer-backed inputs are valid Blob parts.
    await stream.write(typeof data === "string" ? data : new Uint8Array(data));
  } catch (error) {
    await stream.abort();
    throw error;
  }
  await stream.close();
}

/** @param {string} path @param {string | Uint8Array} data @param {string | {encoding?: string, flag?: string}} [options] */
export async function appendFile(path, data, options) {
  await writeFile(path, data, { flag: "a", ...ioOptions(options) });
}

/** @param {string} path @param {number} [length] */
export async function truncate(path, length = 0) {
  if (!Number.isSafeInteger(length) || length < 0) throw new RangeError("Length must be a non-negative safe integer.");
  const { directory, name } = await parent(path);
  const file = await directory.getFileHandle(name);
  const stream = await file.createWritable({ keepExistingData: true });
  try {
    await stream.truncate(length);
  } catch (error) {
    await stream.abort();
    throw error;
  }
  await stream.close();
}

/** @param {string} source @param {string} destination @param {number} [mode] */
export async function copyFile(source, destination, mode = 0) {
  if (mode !== 0) unsupported("copyFile modes other than 0")();
  const data = await readFile(source);
  // No encoding was supplied, so readFile returns bytes.
  if (!(data instanceof Uint8Array)) throw new TypeError("Expected file bytes.");
  await writeFile(destination, data);
}

/** @param {string} path @param {{recursive?: boolean, force?: boolean}} [options] */
export async function rm(path, options) {
  checkOptions(options, ["recursive", "force"]);
  // Resolve the parent inside the try so force also covers missing ancestors.
  try {
    const { directory, name } = await parent(path);
    await directory.removeEntry(name, { recursive: options?.recursive ?? false });
  } catch (error) {
    if (options?.force && error instanceof DOMException && error.name === "NotFoundError") return;
    throw error;
  }
}

export const remove = rm;

/** @param {string} path */
export async function unlink(path) {
  const { directory, name } = await parent(path);
  await directory.getFileHandle(name);
  await directory.removeEntry(name);
}

/** @param {string} path @param {{recursive?: boolean, force?: boolean}} [options] */
export async function rmdir(path, options) {
  if (options) return rm(path, options);
  await directoryHandle(path);
  await rm(path);
}

/** @param {string} path @param {{followLink?: boolean} | boolean} [options] */
export async function stat(path, options) {
  if (typeof options !== "boolean") checkOptions(options, ["followLink"]);
  const entry = await handle(path);
  if (entry.kind === "directory") {
    return { isFile: () => false, isDirectory: () => true, isSymbolicLink: () => false };
  }
  const file = await entry.getFile();
  return {
    size: file.size,
    mtimeMs: file.lastModified,
    mtime: new Date(file.lastModified),
    isFile: () => true,
    isDirectory: () => false,
    isSymbolicLink: () => false,
  };
}

/** @param {string} path */
export async function realpath(path) {
  await access(path);
  return resolve(path);
}

export const constants = Object.freeze({ F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1 });

export const accessSync = unsupported("accessSync");
export const appendFileSync = unsupported("appendFileSync");
export const chmod = unsupported("chmod");
export const chmodSync = unsupported("chmodSync");
export const chown = unsupported("chown");
export const chownSync = unsupported("chownSync");
export const closeSync = unsupported("closeSync");
export const copyFileSync = unsupported("copyFileSync");
export const cp = unsupported("cp");
export const copy = unsupported("copy");
export const cpSync = unsupported("cpSync");
export const copySync = unsupported("copySync");
export const createReadStream = unsupported("createReadStream");
export const createWriteStream = unsupported("createWriteStream");
export const ensureDirSync = unsupported("ensureDirSync");
export const existsSync = unsupported("existsSync");
export const fchmodSync = unsupported("fchmodSync");
export const fchownSync = unsupported("fchownSync");
export const fdatasyncSync = unsupported("fdatasyncSync");
export const filename = unsupported("filename");
export const fstatSync = unsupported("fstatSync");
export const fsyncSync = unsupported("fsyncSync");
export const ftruncateSync = unsupported("ftruncateSync");
export const futimesSync = unsupported("futimesSync");
export const glob = unsupported("glob");
export const globSync = unsupported("globSync");
export const isSymlink = unsupported("isSymlink");
export const lchown = unsupported("lchown");
export const lchownSync = unsupported("lchownSync");
export const lutimes = unsupported("lutimes");
export const lutimesSync = unsupported("lutimesSync");
export const link = unsupported("link");
export const linkSync = unsupported("linkSync");
export const mkdirSync = unsupported("mkdirSync");
export const mkdtemp = unsupported("mkdtemp");
export const mkdtempSync = unsupported("mkdtempSync");
export const mktempFile = unsupported("mktempFile");
export const mktempFileSync = unsupported("mktempFileSync");
export const move = unsupported("move");
export const moveSync = unsupported("moveSync");
export const open = unsupported("open");
export const openSync = unsupported("openSync");
export const opendir = unsupported("opendir");
export const opendirSync = unsupported("opendirSync");
export const readdirSync = unsupported("readdirSync");
export const readFileSync = unsupported("readFileSync");
export const readlink = unsupported("readlink");
export const readlinkSync = unsupported("readlinkSync");
export const readSync = unsupported("readSync");
export const readvSync = unsupported("readvSync");
export const realpathSync = Object.assign(unsupported("realpathSync"), { native: unsupported("realpathSync.native") });
export const rename = unsupported("rename");
export const renameSync = unsupported("renameSync");
export const rmdirSync = unsupported("rmdirSync");
export const rmSync = unsupported("rmSync");
export const removeSync = unsupported("removeSync");
export const resolveSymlink = unsupported("resolveSymlink");
export const statSync = unsupported("statSync");
export const symlink = unsupported("symlink");
export const symlinkSync = unsupported("symlinkSync");
export const truncateSync = unsupported("truncateSync");
export const unlinkSync = unsupported("unlinkSync");
export const utimes = unsupported("utimes");
export const utimesSync = unsupported("utimesSync");
export const unwatchFile = unsupported("unwatchFile");
export const watchFile = unsupported("watchFile");
export const writeFileSync = unsupported("writeFileSync");
export const writeSync = unsupported("writeSync");
export const writevSync = unsupported("writevSync");
export const isDirectory = unsupported("isDirectory (use await stat(path))");
export const isFile = unsupported("isFile (use await stat(path))");
export const fileId = unsupported("fileId");
export const watch = unsupported("watch");
export const watchNative = unsupported("watchNative");
