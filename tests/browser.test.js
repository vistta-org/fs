import resolved from "@vistta/fs";
import fs, { readFile } from "@vistta/fs/browser";

/** @param {(directory: string) => Promise<void>} callback */
async function temporaryDirectory(callback) {
  const directory = "vistta-fs-test-" + crypto.randomUUID();
  await fs.mkdir(directory);
  try {
    await callback(directory);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}

/** @param {() => unknown | Promise<unknown>} callback @param {string} name */
async function rejects(callback, name) {
  try {
    await callback();
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    expect(error.name).toEqual(name);
    return;
  }
  throw new Error(`Expected ${name}, but the operation succeeded.`);
}

/** @param {string | Uint8Array} data */
function byteString(data) {
  if (!(data instanceof Uint8Array)) throw new TypeError("Expected Uint8Array file contents.");
  return Array.from(data).join(",");
}

suite("Filesystem (browser OPFS)", () => {
  test("selects the browser entry and throws for Node-only operations", () => {
    expect(fs.readFile === readFile).toEqual(true);
    expect(resolved.readFile === readFile).toEqual(true);
    const unsupported = {
      readFileSync: fs.readFileSync,
      existsSync: fs.existsSync,
      isFile: fs.isFile,
      fileId: fs.fileId,
      watch: fs.watch,
      symlink: fs.symlink,
      chmod: fs.chmod,
      rename: fs.rename,
      open: fs.open,
    };
    for (const [name, operation] of Object.entries(unsupported)) {
      let thrown = false;
      try {
        operation();
      } catch (error) {
        if (!(error instanceof Error) || !("code" in error)) throw error;
        expect(error.code).toEqual("ERR_FS_BROWSER_UNSUPPORTED");
        expect(error.message.includes(name)).toEqual(true);
        thrown = true;
      }
      expect(thrown).toEqual(true);
    }
  });

  test("reads and writes text and binary data in real OPFS", async () => {
    await temporaryDirectory(async (directory) => {
      const path = `${directory}/hello.txt`;
      await fs.writeFile(path, "hello \u00e9", "utf8");
      expect(await fs.readFile(path, { encoding: "utf-8" })).toEqual("hello \u00e9");
      const bytes = await fs.readFile(path);
      expect(bytes instanceof Uint8Array).toEqual(true);
      expect(byteString(bytes)).toEqual("104,101,108,108,111,32,195,169");
      const nativeFile = await (
        await (await navigator.storage.getDirectory()).getDirectoryHandle(directory)
      ).getFileHandle("hello.txt");
      expect(await (await nativeFile.getFile()).text()).toEqual("hello \u00e9");
      await fs.writeFile(path, "\uFEFFtext");
      expect(await fs.readFile(path, "utf8")).toEqual("\uFEFFtext");
      await fs.writeFile(path, new Uint8Array([0, 255, 42]));
      expect(byteString(await fs.readFile(path))).toEqual("0,255,42");
    });
  });

  test("appends, replaces, copies and truncates without losing bytes", async () => {
    await temporaryDirectory(async (directory) => {
      const path = `${directory}/source`;
      const copy = `${directory}/copy`;
      await fs.appendFile(path, "hello");
      await fs.appendFile(path, " world");
      await fs.writeFile(path, "!", { flag: "a" });
      expect(await fs.readFile(path, "utf8")).toEqual("hello world!");
      await fs.copyFile(path, copy);
      await fs.truncate(copy, 5);
      expect(await fs.readFile(copy, "utf8")).toEqual("hello");
      expect(await fs.readFile(path, "utf8")).toEqual("hello world!");
      await fs.writeFile(copy, "x");
      expect(await fs.readFile(copy, "utf8")).toEqual("x");
      await fs.truncate(copy, 3);
      expect(byteString(await fs.readFile(copy))).toEqual("120,0,0");
    });
  });

  test("creates nested directories, normalizes paths and returns directory names", async () => {
    await temporaryDirectory(async (directory) => {
      const nested = `${directory}/a/b`;
      expect(await fs.mkdir(nested, { recursive: true })).toEqual(`/${directory}/a`);
      expect(await fs.mkdir(nested, { recursive: true })).toEqual(undefined);
      await fs.ensureDir(nested);
      await fs.writeFile(`${nested}/../b/file.txt`, "content");
      expect((await fs.readdir(nested, { withFileTypes: true })).join(",")).toEqual("file.txt");
      expect(await fs.realpath(`/${nested}/../b/file.txt`)).toEqual(`/${nested}/file.txt`);
      await rejects(() => fs.mkdir(nested), "InvalidModificationError");
      await rejects(() => fs.mkdir(`${directory}/missing/child`), "NotFoundError");
      await rejects(() => fs.ensureDir(`${nested}/file.txt`), "TypeMismatchError");
    });
  });

  test("reports file metadata and distinguishes missing paths from invalid paths", async () => {
    await temporaryDirectory(async (directory) => {
      const path = `${directory}/file`;
      await fs.writeFile(path, "hello");
      const info = await fs.stat(path);
      expect(info.isFile()).toEqual(true);
      expect(info.isDirectory()).toEqual(false);
      expect(info.isSymbolicLink()).toEqual(false);
      expect(info.size).toEqual(5);
      expect(Number(info.mtimeMs) > 0).toEqual(true);
      expect((await fs.stat(directory)).isDirectory()).toEqual(true);
      expect((await fs.stat("/")).isDirectory()).toEqual(true);
      await fs.access(path);
      expect(await fs.exists(path)).toEqual(true);
      expect(await fs.exists(`${directory}/missing`)).toEqual(false);
      await rejects(() => fs.exists("invalid\0path"), "TypeError");
      await rejects(() => fs.exists(`${path}/child`), "TypeMismatchError");
      await rejects(() => fs.readFile(`${directory}/missing`), "NotFoundError");
    });
  });

  test("removes only the requested entries and enforces file/directory distinctions", async () => {
    await temporaryDirectory(async (directory) => {
      const nested = `${directory}/nested`;
      const path = `${nested}/file`;
      await fs.ensureDir(nested);
      await fs.writeFile(path, "keep");
      await rejects(() => fs.rm(nested), "InvalidModificationError");
      await rejects(() => fs.unlink(nested), "TypeMismatchError");
      await rejects(() => fs.rmdir(path), "TypeMismatchError");
      expect(await fs.readFile(path, "utf8")).toEqual("keep");
      await fs.unlink(path);
      await fs.rmdir(nested);
      expect(await fs.exists(nested)).toEqual(false);
      await fs.rm(`${directory}/missing/child`, { force: true });
      await rejects(() => fs.rm(`${directory}/missing`), "NotFoundError");
      await rejects(() => fs.rm("/", { recursive: true, force: true }), "InvalidModificationError");
      expect(await fs.exists(directory)).toEqual(true);
    });
  });

  test("rejects unsupported options before modifying files", async () => {
    await temporaryDirectory(async (directory) => {
      const path = `${directory}/file`;
      await fs.writeFile(path, "original");
      for (const options of [{ flag: "wx" }, { encoding: "hex" }]) {
        await rejects(() => fs.writeFile(path, "changed", options), "Error");
      }
      await rejects(() => Reflect.apply(fs.writeFile, undefined, [path, "changed", { mode: 0o600 }]), "Error");
      await rejects(() => Reflect.apply(fs.writeFile, undefined, [path, "changed", false]), "TypeError");
      await rejects(() => Reflect.apply(fs.rm, undefined, [path, { force: "true" }]), "TypeError");
      await rejects(() => fs.readFile(path, { flag: "r+" }), "Error");
      await rejects(() => fs.access(path, fs.constants.X_OK), "Error");
      await rejects(() => fs.copyFile(path, `${directory}/copy`, 1), "Error");
      await rejects(() => fs.truncate(path, -1), "RangeError");
      await rejects(() => fs.truncate(path, 1.5), "RangeError");
      expect(await fs.readFile(path, "utf8")).toEqual("original");
      expect(await fs.exists(`${directory}/copy`)).toEqual(false);
    });
  });
});
