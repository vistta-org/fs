# **VISTTA Filesystem Library**

This library provides small life improvements and converging fs, path and url functions into one package.

## **Getting Started**

### **Install**

```sh
npm install @vistta/fs
```

### **Usage**

```javascript
import fs from "@vistta/fs";

// Asynchronous
fs.writeFile("myfile.txt", "hello world!");
fs.readFile("myfile.txt").then(console.log);

// Synchronous
fs.writeFileSync("myfile.txt", "hello world!");
console.log(fs.readFileSync("myfile.txt"));
```

## **API**

```typescript
/**
 * Checks if a file or directory exists.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} [mode] - The access mode.
 * @returns {Promise<void>}
 */
fs.access(path, mode);

/**
 * Checks if a file or directory exists synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} [mode] - The access mode.
 * @returns {void}
 */
fs.accessSync(path, mode);

/**
 * Appends data to a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {string | Uint8Array} data - The data to append.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
fs.appendFile(path, data, options);

/**
 * Appends data to a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {string | Uint8Array} data - The data to append.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
fs.appendFileSync(path, data, options);

/**
 * Returns the last component of a path.
 *
 * @param {string} path - The path.
 * @param {string} [suffix] - an extension to remove from the result.
 * @returns {string}
 */
fs.basename(path, suffix);

/**
 * Changes the file mode of a file or directory.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} mode - The new file mode.
 * @returns {Promise<void>}
 */
fs.chmod(path, mode);

/**
 * Changes the file mode of a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} mode - The new file mode.
 * @returns {void}
 */
fs.chmodSync(path, mode);

/**
 * Changes the ownership of a file or directory.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {Promise<void>}
 */
fs.chown(path, uid, gid);

/**
 * Changes the ownership of a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {void}
 */
fs.chownSync(path, uid, gid);

/**
 * Closes a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @returns {void}
 */
fs.closeSync(fd);

/**
 * Checks if a path contains a specific segment.
 *
 * @param {string} path - The path to check.
 * @param {string} segment - The segment to check for.
 * @returns {boolean} - Returns true if the path contains the segment, false otherwise.
 */
fs.contains(path, segment);

/**
 * Copies a file.
 *
 * @param {string | Buffer | URL} source - The path to the source file or directory.
 * @param {string | Buffer | URL} destination - The path to the destination file or directory.
 * @param {number} [mode] - Optional modifiers that specify the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE)
 * @returns {Promise<void>}
 */
fs.copyFile(source, destination, mode);

/**
 * Copies a file synchronously.
 *
 * @param {string | Buffer | URL} source - The path to the source file or directory.
 * @param {string | Buffer | URL} destination - The path to the destination file or directory.
 * @param {number} [mode] - modifiers for copy operation.
 * @returns {void}
 */
fs.copyFileSync(source, destination, mode);

/**
 * Copies a file or directory.
 *
 * @param {string | URL} source - The path to the source file or directory.
 * @param {string | URL} destination - The path to the destination file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
fs.cp(source, destination, options);

/**
 * Copies a file or directory synchronously.
 *
 * @param {string | URL} source - The path to the source file or directory.
 * @param {string | URL} destination - The path to the destination file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
fs.cpSync(source, destination, options);

/**
 * Provides constants used in the file system module.
 */
fs.constantsnodeFs?.constants;


/**
 * Ensures that a directory exists, creating it if it doesn't.
 *
 * @param {string} path - The path to the directory.
 * @returns {void}
 */
fs.ensureDir(path);

/**
 * Checks if a file or directory exists synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @returns {boolean}
 */
fs.existsSync(path);

/**
 * Returns the file extension.
 *
 * @param {string} path - The path to the file.
 * @returns {string}
 */
fs.extname(path);

/**
 * Changes the file mode of a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {number | string} mode - The new file mode.
 * @returns {void}
 */
fs.fchmodSync(fd, mode);

/**
 * Changes the ownership of a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {void}
 */
fs.fchownSync(fd, uid, gid);

/**
 * Fetches any pending data to the underlying file.
 *
 * @param {number} fd - The file descriptor.
 * @returns {void}
 */
fs.fdatasyncSync(fd);

/**
 * Returns the filename portion of a file path.
 *
 * @param {string | URL} url - The file URL.
 * @returns {string}
 */
fs.filename(url);

/**
 * Gets the file status of a file synchronously.
 *
 * @param {number} fd - The file descriptor.
 * @param {Object} [options] - Options for the operation..
 * @returns {Object}
 */
fs.fstatSync(fd, options);

/**
 * Flushes any pending data to the underlying file.
 *
 * @param {number} fd - The file descriptor.
 * @returns {void}
 */
fs.fsyncSync(fd);

/**
 * Truncates a file to a specified length.
 *
 * @param {number} fd - The file descriptor.
 * @param {number} [length] - The new file length.
 * @returns {void}
 */
fs.ftruncateSync(fd, length);

/**
 * Sets the file access and modification times.
 *
 * @param {number} fd - The file descriptor.
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {void}
 */
fs.futimesSync(fd, atime, mtime);

/**
 * Finds files based on a glob pattern.
 *
 * @param {string} pattern - The glob pattern.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string[]>}
 */
// @ts-ignore
fs.glob(pattern, options);

/**
 * Finds files based on a glob pattern.
 *
 * @param {string} pattern - The glob pattern.
 * @param {Object} [options] - Options for the operation.
 * @returns {string[]}
 */
// @ts-ignore
fs.globSync(pattern, options);

/**
 * Checks if a path is absolute.
 *
 * @param {string} path - The path to check.
 * @returns {boolean}
 */
fs.isAbsolute(path);

/**
 * Changes the ownership of a symbolic link.
 *
 * @param {string | Buffer | URL} path
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {Promise<void>}
 */
fs.lchown(path, uid, gid);

/**
 * Changes the ownership of a symbolic link.
 *
 * @param {string | Buffer | URL} path
 * @param {number} uid - The new user ID.
 * @param {number} gid - The new group ID.
 * @returns {void}
 */
fs.lchownSync(path, uid, gid);

/**
 * Change the file system timestamps of the symbolic link referenced by path.
 *
 * @param {string | Buffer | URL} path
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {Promise<void>}
 */
fs.lutimes(path, atime, mtime);

/**
 * Change the file system timestamps of the symbolic link referenced by path.
 *
 * @param {string | Buffer | URL} path
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {void}
 */
fs.lutimesSync(path, atime, mtime);

/**
 * Creates a symbolic link.
 *
 * @param {string | Buffer | URL} existingPath - The target path.
 * @param {string | Buffer | URL} newPath - The path to the symbolic link.
 * @returns {Promise<void>}
 */
fs.link(existingPath, newPath);

/**
 * Creates a symbolic link synchronously.
 *
 * @param {string | Buffer | URL} existingPath - The target path.
 * @param {string | Buffer | URL} newPath - The path to the symbolic link.
 * @returns {void}
 */
fs.linkSync(existingPath, newPath);

/**
 * Creates a directory.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>}
 */
fs.mkdir(path, options);

/**
 * Creates a directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {string}
 */
fs.mkdirSync(path, options);

/**
 * Creates an unique temporary directory.
 *
 * @param {string} prefix - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>}
 */
fs.mkdtemp(prefix, options);

/**
 * Creates an unique temporary directory synchronously.
 *
 * @param {string} prefix - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {string}
 */
fs.mkdtempSync(prefix, options);

/**
 * Moves a file or directory to a new location.
 *
 * @param {string | URL} source - The source path.
 * @param {string | URL} destination - The destination path.
 * @returns {Promise<void>}
 */
fs.move(source, destination):

/**
 * Synchronously moves a file or directory to a new location.
 *
 * @param {string | URL} source - The source path.
 * @param {string | URL} destination - The destination path.
 */
fs.moveSync(source, destination):

/**
 * Normalizes a path.
 *
 * @param {string} path - The path to normalize.
 * @returns {string}
 */
fs.normalize(path);

/**
 * Opens a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [flags] - The file flags.
 * @param {string | number} [mode] - Options for the operation.
 * @returns {Promise<Object>}
 */
fs.open(path, flags, mode);

/**
 * Opens a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [flags] - The file flags.
 * @param {string | number} [mode] - Options for the operation.
 * @returns {Object}
 */
fs.openSync(path, flags, mode);

/**
 * Opens a directory.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<Object>} Promise that resolves to a directory object.
 */
fs.opendir(path, options);

/**
 * Opens a directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Object} Promise that resolves to a directory object.
 */
fs.opendirSync(path, options);

/**
 * Reads the contents of a directory.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string[]>} Promise that resolves to an array of file names.
 */
fs.readdir(path, options);

/**
 * Reads the contents of a directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {string[]} Array of file names.
 */
fs.readdirSync(path, options);

/**
 * Reads the entire contents of a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object} options - Options for the operation, if options is a string, then it specifies the encoding.
 * @returns {Promise<Buffer>}
 */
fs.readFile(path, options);

/**
 * Reads the entire contents of a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object} options - Options for the operation, if options is a string, then it specifies the encoding.
 * @returns {Buffer}
 */
fs.readFileSync(path, options);

/**
 * Reads the target of a symbolic link.
 *
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>}
 */
fs.readlink(path, options);

/**
 * Reads the target of a symbolic link synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {Object} [options] - Options for the operation.
 * @returns {string}
 */
fs.readlinkSync(path, options);

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
fs.readSync(fd, buffer, offset, length, position);

/**
 * Reads a file asynchronously using the `uv_readv()` method.
 *
 * @param {number} fd - The file descriptor.
 * @param {Buffer[]} buffers - buffers.
 * @param {number} [position] - position.
 * @returns {number} The number of bytes read.
 */
fs.readvSync(fd, buffers, position);

/**
 * Resolves a path to an absolute path.
 *
 * @param {string | Buffer | URL} path - Path to resolve.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<string>} Promise that resolves to the resolved path.
 */
fs.realpath(path, options);

/**
 * Resolves a path to an absolute path synchronously.
 *
 * @param {string | Buffer | URL} path - Path to resolve.
 * @param {Object} [options] - Options for the operation.
 * @returns {string} Resolved path.
 */
fs.realpathSync(path, options);

/**
 * Resolves a path to an absolute path synchronously using the native `realpath()` function.
 *
 * @param {string | Buffer | URL} path - Path to resolve.
 * @param {Object} [options] - Options for the operation.
 * @returns {string} Resolved path.
 */
fs.realpathSync.native(path, options);

/**
 *  Renames a file or directory.
 *
 * @param {string | Buffer | URL} oldPath - The path to the source file or directory.
 * @param {string | Buffer | URL} newPath - The path to the destination file or directory.
 * @returns {Promise<void>}
 */
fs.rename(oldPath, newPath);

/**
 * Renames a file or directory synchronously.
 *
 * @param {string | Buffer | URL} oldPath - The path to the source file or directory.
 * @param {string | Buffer | URL} newPath - The path to the destination file or directory.
 * @returns {void}
 */
fs.renameSync(oldPath, newPath);

/**
 * Resolves a sequence of paths or path segments into an absolute path.
 *
 * @param {string[]} paths - A sequence of paths or path segments.
 * @returns {string}
 */
fs.resolve(...paths);

/**
 * Removes a directory.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>}
 */
fs.rmdir(path, options);

/**
 * Removes a directory synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
fs.rmdirSync(path, options);

/**
 * Removes a file or directory.
 *
 * @param {string | Buffer | URL} path - Path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {Promise<void>} Promise that resolves when the file or directory is removed.
 */
fs.rm(path, options);

/**
 * Removes a file or directory synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @returns {void}
 */
fs.rmSync(path, options);

/**
 * Gets the file status of a file.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object | Boolean} [options] - Options for the operation, if options is a true, then it specifies the follow Link.
 * @returns {Promise<Object>}
 */
fs.stat(path, options);

/**
 * Gets the file status of a file synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Object | Boolean} [options] - Options for the operation, if options is a true, then it specifies the follow Link.
 * @returns {Object}
 */
fs.statSync(path, options);

/**
 * Creates a symbolic link.
 *
 * @param {string | Buffer | URL} target - The target path.
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {"dir" | "file" | "junction"} type - Options for the operation.
 * @returns {Promise<void>}
 */
fs.symlink(target, path, type);

/**
 * Creates a symbolic link synchronously.
 *
 * @param {string | Buffer | URL} target - The target path.
 * @param {string | Buffer | URL} path - The path to the symbolic link.
 * @param {"dir" | "file" | "junction"} type - Options for the operation.
 * @returns {void}
 */
fs.symlinkSync(target, path, type);

/**
 * Truncates a file to a specified length.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [length] - The new file length.
 * @returns {Promise<void>}
 */
fs.truncate(path, length);

/**
 * Truncates a file to a specified length synchronously.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {number} [length] - The new file length.
 * @returns {void}
 */
fs.truncateSync(path, length);

/**
 * Removes a file.
 *
 * @param {string | Buffer | URL} path - Path to the file.
 * @returns {Promise<void>} Promise that resolves when the file is removed.
 */
fs.unlink(path);

/**
 * Removes a file synchronously.
 *
 * @param {string | Buffer | URL} path - Path to the file.
 */
fs.unlinkSync(path);

/**
 * Sets the file access and modification times.
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {string | number | Date} atime - The new access time.
 * @param {string | number | Date} mtime - The new modification time.
 * @returns {Promise<void>}
 */
fs.utimes(path, atime, mtime);

/**
 * Sets the file access and modification times.
 *
 * @param {string | Buffer | URL} path - The path to the file.
 * @param {Date} atime - The new access time.
 * @param {Date} mtime - The new modification time.
 * @returns {void}
 */
fs.utimesSync(path, atime, mtime);

/**
 * Stops watching a file or directory for changes.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {Function} listener - The listener function.
 * @returns {void}
 */
fs.unwatchFile(path, options, listener);

/**
 * Watches a file or directory for changes.
 *
 * @param {string | Buffer | URL} path - The path to the file or directory.
 * @param {Object} [options] - Options for the operation.
 * @param {Function} listener - The listener function.
 * @returns {void}
 */
fs.watchFile(path, options, listener);

/**
 * Writes data to a file.
 *
 * @param {string | Buffer | URL} path - Path to the file.
 * @param {string | Buffer} data - Data to write to the file.
 * @param {Object} options - Options for writing the file, if options is a string, then it specifies the encoding.
 * @returns {Promise<void>} Promise that resolves when the file is written.
 */
fs.writeFile(path, data, options);

/**
 * Writes data to a file synchronously.
 *
 * @param {string} path - Path to the file.
 * @param {string | Buffer} data - Data to write to the file.
 * @param {Object} options - Options for writing the file, if options is a string, then it specifies the encoding.
 */
fs.writeFileSync(path, data, options);

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
fs.writeSync(fd, buffer, offset, length, position);

/**
 * Writes data asynchronously using the `uv_writev()` method.
 *
 * @param {number} fd - The file descriptor.
 * @param {Buffer[]} buffers - buffers.
 * @param {number} [position] - position.
 * @returns {number} The number of bytes read.
 */
fs.writevSync(fd, buffers, position);

/**
 * Return the directory name of a path or url. Similar to the Unix dirname command.
 *
 * @param {string | URL} path the path or url to evaluate.
 * @return the directory name of a path or url. Similar to the Unix dirname command.
 */
fs.dirname(path);

/**
 * Checks if a path is a directory.
 *
 * @param {string | Buffer | URL} path - The path to check.
 * @returns {boolean} True if the path is a directory, false otherwise.
 */
fs.isDirectory(path);

/**
 * Checks if a path is a file.
 *
 * @param {string | Buffer | URL} path - The path to check.
 * @returns {boolean} True if the path is a file, false otherwise.
 */
fs.isFile(path);

/**
 * Returns a 32bit unique ID from the filepath provided.
 *
 * @param {string | Buffer | URL} path - The path of the file.
 * @returns {string | null} A 32bit unique ID or null if the file does not exist.
 */
fs.fileId(path);

/**
 * Watches a directory for changes.
 *
 * @param {string} path - The path to watch.
 * @param {Object} [options] - Optional options.
 * @param {RegExp} [options.ignore] - A regular expression to ignore certain files.
 * @param {number} [options.throttle] - The throttle in milliseconds between file checks.
 * @returns {any} An iterator that yields the paths of changed files.
 */
fs.watch(path, options);
```

## **License**

Attribution-NonCommercial-NoDerivatives 4.0 International

## **Contributing**

Thank you for your interest in contributing to this project! Please ensure that any contributions respect the licensing terms specified. If you encounter any issues or have suggestions, feel free to report them. All issues will be well received and addressed to the best of our ability. We appreciate your support and contributions!

### **Authors**

- [Tiago Terenas Almeida](https://github.com/tiagomta)
