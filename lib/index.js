import _fs from "node:fs";
import _path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Checks if a file or directory exists.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} [mode] - The access mode.
 * @returns {Promise<void>}
 */
export const access = (path, mode) => _fs.promises.access(path, mode);

/**
 * Checks if a file or directory exists synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} [mode] - The access mode.
 * @returns {void}
 */
export const accessSync = (path, mode) => _fs.accessSync(path, mode);

/**
 * Appends data to a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {string | Uint8Array} data - The data to append.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
export const appendFile = (path, data, options) => _fs.promises.appendFile(path, data, options);

/**
 * Appends data to a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {string | Uint8Array} data - The data to append.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
export const appendFileSync = (path, data, options) => _fs.appendFileSync(path, data, options);

/**
 * Returns the last component of a path.
 *
 * @param {string} path - The path.
 * @param {string} [suffix] - an extension to remove from the result.
 * @returns {string}
 */
export const basename = (path, suffix) => _path?.basename(path, suffix);

/**
 * Changes the file mode of a file or directory.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} mode - The new file mode.
 * @returns {Promise<void>}
 */
export const chmod = (path, mode) => _fs.promises.chmod(path, mode);

/**
 * Changes the file mode of a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} mode - The new file mode.
 * @returns {void}
 */
export const chmodSync = (path, mode) => _fs.chmodSync(path, mode);

/**
 * Changes the ownership of a file or directory.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {Promise<void>}
 */
export const chown = (path, uid, gid) => _fs.promises.chown(path, uid, gid);

/**
 * Changes the ownership of a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {void}
 */
export const chownSync = (path, uid, gid) => _fs.chownSync(path, uid, gid);

/**
 * Closes a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @returns {void}
 */
export const closeSync = (fd) => _fs.closeSync(fd);

/**
 * Checks if a path contains a specific segment.
 *
 * @param {string} path - The path to check.
 * @param {string} segment - The segment to check for.
 * @returns {boolean} - Returns true if the path contains the segment, false otherwise.
 */
export const contains = (path, segment) => {
  const segments = path.split(_path.sep);
  for (let i = 0, len = segments.length; i < len; i++) {
    if (segments[i] === segment) return true;
  }
  return false;
};

/**
 * Copies a file.
 *
 * @param {string | Buffer | URL} source - The path to the source file or directory.
 * @param {string | Buffer | URL} destination - The path to the destination file or directory.
 * @param {number} [mode] - Optional modifiers that specify the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. export const constants.COPYFILE_EXCL | export const constants.COPYFILE_FICLONE)
 * @returns {Promise<void>}
 */
export const copyFile = (source, destination, mode) => _fs.promises.copyFile(source, destination, mode);

/**
 * Copies a file synchronously.
 *
 * @param {string | Buffer | URL} source - The path to the source file or directory.
 * @param {string | Buffer | URL} destination - The path to the destination file or directory.
 * @param {number} [mode] - modifiers for copy operation.
 * @returns {void}
 */
export const copyFileSync = (source, destination, mode) => _fs.copyFileSync(source, destination, mode);

/**
 * Copies a file or directory.
 *
 * @param {string | URL} source - The path to the source file or directory.
 * @param {string | URL} destination - The path to the destination file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
export const cp = (source, destination, options) => _fs.promises.cp(source, destination, options);

/**
 * Copies a file or directory.
 *
 * @param {string | URL} source - The path to the source file or directory.
 * @param {string | URL} destination - The path to the destination file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
export const copy = (source, destination, options) => _fs.promises.cp(source, destination, options);

/**
 * Copies a file or directory synchronously.
 *
 * @param {string | URL} source - The path to the source file or directory.
 * @param {string | URL} destination - The path to the destination file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
export const cpSync = (source, destination, options) => _fs.cpSync(source, destination, options);

/**
 * Copies a file or directory synchronously.
 *
 * @param {string | URL} source - The path to the source file or directory.
 * @param {string | URL} destination - The path to the destination file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
export const copySync = (source, destination, options) => _fs.cpSync(source, destination, options);

/**
 * Creates a readable stream for a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object} [options] - Options for the stream.
 * @returns {any} A readable stream for the file.
 */
export const createReadStream = (path, options) => _fs.createReadStream(path, options);

/**
 * Creates a writable stream for a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object} [options] - Options for the stream.
 * @returns {any} A writable stream for the file.
 */
export const createWriteStream = (path, options) => _fs.createWriteStream(path, options);

/**
 * Provides constants used in the file system module.
 */
export const constants = _fs.constants;

/**
 * Ensures that a directory exists, creating it if it doesn't.
 *
 * @param {string} path - The path to the directory.
 * @returns {void}
 */
export const ensureDir = async (path) => {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
};

/**
 * Ensures that a directory exists, creating it if it doesn't.
 *
 * @param {string} path - The path to the directory.
 * @returns {void}
 */
export const ensureDirSync = (path) => {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
};
/**
 * Checks if a file or directory exists synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @returns {boolean}
 */
export const existsSync = (path) => _fs.existsSync(path);

/**
 * Returns the file extension.
 *
 * @param {string} path - The path to the file.
 * @returns {string}
 */
export const extname = (path) => _path?.extname(path);

/**
 * Changes the file mode of a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {number | string} mode - The new file mode.
 * @returns {void}
 */
export const fchmodSync = (fd, mode) => _fs.fchmodSync(fd, mode);

/**
 * Changes the ownership of a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {void}
 */
export const fchownSync = (fd, uid, gid) => _fs.fchownSync(fd, uid, gid);

/**
 * Fetches any pending data to the underlying file.
 *
 * @param {number} fd - The file descriptor.
 * @returns {void}
 */
export const fdatasyncSync = (fd) => _fs.fdatasyncSync(fd);

/**
 * Returns the filename portion of a file path.
 *
 * @param {string | URL} url - The file URL.
 * @returns {string}
 */
export const filename = (url) => fileURLToPath(url);

/**
 * Gets the file status of a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {Object} [options] - Options for the operation..
 * @returns {Object}
 */
export const fstatSync = (fd, options) => _fs.fstatSync(fd, options);

/**
 * Flushes any pending data to the underlying file.
 *
 * @param {number} fd - The file descriptor.
 * @returns {void}
 */
export const fsyncSync = (fd) => _fs.fsyncSync(fd);

/**
 * Truncates a file to a specified length.
 *
 * @param {number} fd - The file descriptor.
 * @param {number} [length] - The new file length.
 * @returns {void}
 */
export const ftruncateSync = (fd, length) => _fs.ftruncateSync(fd, length);

/**
 * Sets the file access and modification times.
 *
 * @param {number} fd - The file descriptor.
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {void}
 */
export const futimesSync = (fd, atime, mtime) => _fs.futimesSync(fd, atime, mtime);

/**
 * Finds files based on a glob pattern.
 *
 * @param {string} pattern - The glob pattern.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string[]>}
 */
// @ts-ignore
export const glob = (pattern, options) => _fs.promises.glob(pattern, options);

/**
 * Finds files based on a glob pattern.
 *
 * @param {string} pattern - The glob pattern.
 * @param {Object} [options] - Options for the operation.
 * @returns {string[]}
 */
// @ts-ignore
export const globSync = (pattern, options) => _fs.globSync(pattern, options);

/**
 * Checks if a path is absolute.
 *
 * @param {string} path - The path to check.
 * @returns {boolean}
 */
export const isAbsolute = (path) => _path?.isAbsolute(path);

/**
 * Changes the ownership of a symbolic link.
 *
 * @param {string | Buffer | URL} path
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {Promise<void>}
 */
export const lchown = (path, uid, gid) => _fs.promises.lchown(path, uid, gid);

/**
 * Changes the ownership of a symbolic link.
 *
 * @param {string | Buffer | URL} path
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {void}
 */
export const lchownSync = (path, uid, gid) => _fs.lchownSync(path, uid, gid);

/**
 * Change the file system timestamps of the symbolic link referenced by path.
 *
 * @param {string | Buffer | URL} path
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {Promise<void>}
 */
export const lutimes = (path, atime, mtime) => _fs.promises.lutimes(path, atime, mtime);

/**
 * Change the file system timestamps of the symbolic link referenced by path.
 *
 * @param {string | Buffer | URL} path
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {void}
 */
export const lutimesSync = (path, atime, mtime) => _fs.lutimesSync(path, atime, mtime);

/**
 * Creates a symbolic link.
 *
 * @param {string | Buffer | URL} existingPath - The target path.
 * @param {string | Buffer | URL} newPath - The path to the symbolic link.
 * @returns {Promise<void>}
 */
export const link = (existingPath, newPath) => _fs.promises.link(existingPath, newPath);

/**
 * Creates a symbolic link synchronously.
 *
 * @param {string | Buffer | URL} existingPath - The target path.
 * @param {string | Buffer | URL} newPath - The path to the symbolic link.
 * @returns {void}
 */
export const linkSync = (existingPath, newPath) => _fs.linkSync(existingPath, newPath);

/**
 * Creates a directory.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>}
 */
export const mkdir = (path, options) => _fs.promises.mkdir(path, options);

/**
 * Creates a directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {string}
 */
export const mkdirSync = (path, options) => _fs.mkdirSync(path, options);

/**
 * Creates an unique temporary directory.
 *
 * @param {string} prefix - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>}
 */
export const mkdtemp = (prefix, options) => _fs.promises.mkdtemp(prefix, options);

/**
 * Creates an unique temporary directory synchronously.
 *
 * @param {string} prefix - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {string}
 */
export const mkdtempSync = (prefix, options) => _fs.mkdtempSync(prefix, options);

/**
 * Moves a file or directory to a new location.
 *
 * @param {string | URL} source - The source path.
 * @param {string | URL} destination - The destination path.
 * @returns {Promise<void>}
 */
export const move = async (source, destination) => {
  try {
    await _fs.promises.rename(source, destination);
  } catch (err) {
    if (err.code === "EXDEV") {
      await _fs.promises.cp(source, destination, { recursive: true });
      await _fs.promises.rm(source, { recursive: true, force: true });
    } else {
      throw err;
    }
  }
};

/**
 * Synchronously moves a file or directory to a new location.
 *
 * @param {string | URL} source - The source path.
 * @param {string | URL} destination - The destination path.
 */
export const moveSync = (source, destination) => {
  try {
    _fs.renameSync(source, destination);
  } catch (err) {
    if (err.code === "EXDEV") {
      _fs.cpSync(source, destination, { recursive: true });
      _fs.rmSync(source, { recursive: true, force: true });
    } else {
      throw err;
    }
  }
};

/**
 * Normalizes a path.
 *
 * @param {string} path - The path to normalize.
 * @returns {string}
 */
export const normalize = (path) => _path?.normalize(path);

/**
 * Opens a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [flags] - The file flags.
 * @param {string | number} [mode] - Options for the operation.
 * @returns {Promise<Object>}
 */
export const open = (path, flags, mode) => _fs.promises.open(path, flags, mode);

/**
 * Opens a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [flags] - The file flags.
 * @param {string | number} [mode] - Options for the operation.
 * @returns {Object}
 */
export const openSync = (path, flags, mode) => _fs.openSync(path, flags, mode);

/**
 * Opens a directory.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<Object>} Promise that resolves to a directory object.
 */
export const opendir = (path, options) => _fs.promises.opendir(path, options);

/**
 * Opens a directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Object} Promise that resolves to a directory object.
 */
export const opendirSync = (path, options) => _fs.opendirSync(path, options);

/**
 * Reads the contents of a directory.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string[]>} Promise that resolves to an array of file names.
 */
export const readdir = (path, options) => _fs.promises.readdir(path, options);

/**
 * Reads the contents of a directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {string[]} Array of file names.
 */
export const readdirSync = (path, options) => _fs.readdirSync(path, options);

/**
 * Reads the entire contents of a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object} options - Options for the operation, if options is a string, then it specifies the encoding.
 * @returns {Promise<string>}
 */
export const readFile = (path, options) => _fs.promises.readFile(path, options);

/**
 * Reads the entire contents of a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object} options - Options for the operation, if options is a string, then it specifies the encoding.
 * @returns {string}
 */
export const readFileSync = (path, options) => _fs.readFileSync(path, options);

/**
 * Reads the target of a symbolic link.
 *
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>}
 */
export const readlink = (path, options) => _fs.promises.readlink(path, options);

/**
 * Reads the target of a symbolic link synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {Object} [options] - Options for the operation.
 * @returns {string}
 */
export const readlinkSync = (path, options) => _fs.readlinkSync(path, options);

/**
 * Returns the number of `bytesRead`.
 *
 * @param {number} fd - The file descriptor.
 * @param {Buffer} buffer - buffer.
 * @param {number} offset - offset.
 * @param {number} length - length.
 * @param {number} position - position.
 * @returns {number} Buffer containing the file data.
 */
export const readSync = (fd, buffer, offset, length, position) => _fs.readSync(fd, buffer, offset, length, position);

/**
 * Reads a file asynchronously using the `uv_readv()` method.
 *
 * @param {number} fd - The file descriptor.
 * @param {Buffer[]} buffers - buffers.
 * @param {number} [position] - position.
 * @returns {number} The number of bytes read.
 */
export const readvSync = (fd, buffers, position) => _fs.readvSync(fd, buffers, position);

/**
 * Resolves a path to an absolute path.
 *
 * @param {string | Buffer | URL} path - Path to resolve.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>} Promise that resolves to the resolved path.
 */
export const realpath = (path, options) => _fs.promises.realpath(path, options);

/**
 * Resolves a path to an absolute path synchronously.
 *
 * @param {string | Buffer | URL} path - Path to resolve.
 * @param {Object} [options] - Options for the operation.
 * @returns {string} Resolved path.
 */
const realpathSync = (path, options) => _fs.realpathSync(path, options);

/**
 * Resolves a path to an absolute path synchronously using the native `realpath()` function.
 *
 * @param {string | Buffer | URL} path - Path to resolve.
 * @param {Object} [options] - Options for the operation.
 * @returns {string} Resolved path.
 */
realpathSync.native = (path, options) => _fs.realpathSync?.native(path, options);

export { realpathSync };

/**
 *  Renames a file or directory.
 *
 * @param {string | Buffer | URL} oldPath - The path to the source file or directory.
 * @param {string | Buffer | URL} newPath - The path to the destination file or directory.
 * @returns {Promise<void>}
 */
export const rename = (oldPath, newPath) => _fs.promises.rename(oldPath, newPath);

/**
 * Renames a file or directory synchronously.
 *
 * @param {string | Buffer | URL} oldPath - The path to the source file or directory.
 * @param {string | Buffer | URL} newPath - The path to the destination file or directory.
 * @returns {void}
 */
export const renameSync = (oldPath, newPath) => _fs.renameSync(oldPath, newPath);

/**
 * Resolves a sequence of paths or path segments into an absolute path.
 *
 * @param {string[]} paths - A sequence of paths or path segments.
 * @returns {string}
 */
export const resolve = (...paths) => _path?.resolve(...paths);

/**
 * Removes a directory.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
export const rmdir = (path, options) => _fs.promises.rmdir(path, options);

/**
 * Removes a directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
export const rmdirSync = (path, options) => _fs.rmdirSync(path, options);

/**
 * Removes a file or directory.
 *
 * @param {string | Buffer | URL} path - Path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>} Promise that resolves when the file or directory is removed.
 */
export const rm = (path, options) => _fs.promises.rm(path, options);

/**
 * Removes a file or directory.
 *
 * @param {string | Buffer | URL} path - Path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>} Promise that resolves when the file or directory is removed.
 */
export const remove = (path, options) => _fs.promises.rm(path, options);

/**
 * Removes a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
export const rmSync = (path, options) => _fs.rmSync(path, options);

/**
 * Removes a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
export const removeSync = (path, options) => _fs.rmSync(path, options);

/**
 * Gets the file status of a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object | Boolean} [options] - Options for the operation, if options is a true, then it specifies the follow Link.
 * @returns {Promise<Object>}
 */
export const stat = (path, options) => {
  if (options === true || options?.followLink) return _fs.promises.stat(path, options);
  return _fs.promises.lstat(path, options);
};

/**
 * Gets the file status of a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object | Boolean} [options] - Options for the operation, if options is a true, then it specifies the follow Link.
 * @returns {Object}
 */
export const statSync = (path, options) => {
  if (options === true || options?.followLink) return _fs.statSync(path, options);
  return _fs.lstatSync(path, options);
};

/**
 * Creates a symbolic link.
 *
 * @param {string | Buffer | URL} target - The target path.
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {"dir" | "file" | "junction"} type - Options for the operation.
 * @returns {Promise<void>}
 */
export const symlink = (target, path, type) => _fs.promises.symlink(target, path, type);

/**
 * Creates a symbolic link synchronously.
 *
 * @param {string | Buffer | URL} target - The target path.
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {"dir" | "file" | "junction"} type - Options for the operation.
 * @returns {void}
 */
export const symlinkSync = (target, path, type) => _fs.symlinkSync(target, path, type);

/**
 * Truncates a file to a specified length.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [length] - The new file length.
 * @returns {Promise<void>}
 */
export const truncate = (path, length) => _fs.promises.truncate(path, length);

/**
 * Truncates a file to a specified length synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [length] - The new file length.
 * @returns {void}
 */
export const truncateSync = (path, length) => _fs.truncateSync(path, length);

/**
 * Removes a file.
 *
 * @param {string | Buffer | URL} path - Path to the file.
 * @returns {Promise<void>} Promise that resolves when the file is removed.
 */
export const unlink = (path) => _fs.promises.unlink(path);

/**
 * Removes a file synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the file.
 */
export const unlinkSync = (path) => _fs.unlinkSync(path);

/**
 * Sets the file access and modification times.
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {Promise<void>}
 */
export const utimes = (path, atime, mtime) => _fs.promises.utimes(path, atime, mtime);

/**
 * Sets the file access and modification times.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Date} atime - The new access time.
 * @param {Date} mtime - The new modification time.
 * @returns {void}
 */
export const utimesSync = (path, atime, mtime) => _fs.utimesSync(path, atime, mtime);

/**
 * Stops watching a file or directory for changes.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {Function} listener - The listener function.
 * @returns {void}
 */
export const unwatchFile = (path, options, listener) => _fs.unwatchFile(path, options, listener);

/**
 * Watches a file or directory for changes.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @param {Function} listener - The listener function.
 * @returns {void}
 */
export const watchFile = (path, options, listener) => _fs.watchFile(path, options, listener);

/**
 * Writes data to a file.
 *
 * @param {string | Buffer | URL} path - Path to the file.
 * @param {string | Buffer} data - Data to write to the file.
 * @param {Object} options - Options for writing the file, if options is a string, then it specifies the encoding.
 * @returns {Promise<void>} Promise that resolves when the file is written.
 */
export const writeFile = (path, data, options) => _fs.promises.writeFile(path, data, options);

/**
 * Writes data to a file synchronously.
 *
 * @param {string} path - Path to the file.
 * @param {string | Buffer} data - Data to write to the file.
 * @param {Object} options - Options for writing the file, if options is a string, then it specifies the encoding.
 */
export const writeFileSync = (path, data, options) => _fs.writeFileSync(path, data, options);

/**
 * Writes data to a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {Buffer} buffer - buffer.
 * @param {number} offset - offset.
 * @param {number} length - length.
 * @param {number} position - position.
 * @returns {number} Buffer containing the file data.
 */
export const writeSync = (fd, buffer, offset, length, position) => _fs.writeSync(fd, buffer, offset, length, position);

/**
 * Writes data asynchronously using the `uv_writev()` method.
 *
 * @param {number} fd - The file descriptor.
 * @param {Buffer[]} buffers - buffers.
 * @param {number} [position] - position.
 * @returns {number} The number of bytes read.
 */
export const writevSync = (fd, buffers, position) => _fs.writevSync(fd, buffers, position);

/**
 * Return the directory name of a path or url. Similar to the Unix dirname command.
 *
 * @param {string | URL} path the path or url to evaluate.
 * @return the directory name of a path or url. Similar to the Unix dirname command.
 */
export const dirname = (path) => _path?.dirname(path instanceof URL || new RegExp("[^:]*://").test(path) ? fileURLToPath(path) : path);

/**
 * Checks if a path is a directory.
 *
 * @param {string | Buffer | URL} path - The path to check.
 * @returns {boolean} True if the path is a directory, false otherwise.
 */
export const isDirectory = (path) => existsSync(path) && statSync(path).isDirectory();

/**
 * Checks if a path is a file.
 *
 * @param {string | Buffer | URL} path - The path to check.
 * @returns {boolean} True if the path is a file, false otherwise.
 */
export const isFile = (path) => existsSync(path) && statSync(path).isFile();

/**
 * Returns a 32bit unique ID from the filepath provided.
 *
 * @param {string | Buffer | URL} path - The path of the file.
 * @returns {string | null} A 32bit unique ID or null if the file does not exist.
 */
export const fileId = (path) => {
  if (!existsSync(path)) return null;
  const { dev, ino } = statSync(path);
  return `${ino.toString(16)}${dev.toString(16)}`;
};

/**
 * Watches a directory for changes.
 *
 * @param {string} path - The path to watch.
 * @param {Object} [options] - Optional options.
 * @param {RegExp} [options.ignore] - A regular expression to ignore certain files.
 * @param {number} [options.throttle] - The throttle in milliseconds between file checks.
 * @returns {any} An iterator that yields the paths of changed files.
 */
export const watch = (path, options = {}) => {
  let { ignore, throttle = 0 } = options;
  if (!(ignore instanceof RegExp)) ((ignore = null), console.warn("Watch ignore needs to be a valid Regex"));
  const watch = async (p, cb) => {
    if (ignore?.test(p)) return;
    if (isFile(p)) return watchFile(p, (n, o) => cb(p, n, o));
    const dir = isDirectory(p) && (await readdir(p));
    for (let i = 0, len = dir?.length || 0; i < len; i++) watch(resolve(p, dir[i]), cb);
  };
  return {
    [Symbol.asyncIterator]() {
      return {
        next: async () =>
          new Promise((resolve) => setTimeout(() => watch(resolve(path), (filepath) => resolve({ value: filepath, done: false })), throttle)),
      };
    },
  };
};
