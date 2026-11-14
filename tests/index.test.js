import packaged from "@vistta/fs";
import assert from "node:assert/strict";
import native from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import browser, * as browserNamed from "../browser.js";
import fs, * as named from "../index.js";

/** @param {(directory: string) => unknown | Promise<unknown>} callback */
async function temporaryDirectory(callback) {
  const directory = await native.promises.mkdtemp(path.join(tmpdir(), "vistta-fs-"));
  try {
    await callback(directory);
  } finally {
    await native.promises.rm(directory, { recursive: true, force: true });
  }
}

/** @param {object} value */
function stats(value) {
  assert.ok(value instanceof native.Stats);
  return value;
}

suite("Filesystem (Node)", () => {
  test("preserves default/named exports and the browser API surface", () => {
    assert.equal(packaged.readFile, fs.readFile);
    assert.equal(fs.readFile, named.readFile);
    assert.equal(browser.readFile, browserNamed.readFile);
    assert.deepEqual(Object.keys(browser), Object.keys(fs));
  });

  test("reads, appends, copies and truncates binary and text files", async () => {
    await temporaryDirectory(async (directory) => {
      const source = path.join(directory, "source.txt");
      const destination = path.join(directory, "copy.txt");
      await fs.writeFile(source, "hello");
      await fs.appendFile(source, " world");
      assert.equal(await fs.readFile(source, "utf8"), "hello world");
      assert.ok(Buffer.isBuffer(await fs.readFile(source)));
      await fs.copyFile(source, destination);
      await fs.truncate(destination, 5);
      assert.equal(await fs.readFile(destination, "utf8"), "hello");
      await fs.unlink(destination);
      assert.equal(await fs.exists(destination), false);
      await assert.rejects(fs.readFile(destination), { code: "ENOENT" });
    });
  });

  test("creates nested directories, lists names and moves directories", async () => {
    await temporaryDirectory(async (directory) => {
      const source = path.join(directory, "nested", "source");
      const destination = path.join(directory, "destination");
      await fs.ensureDir(source);
      await fs.ensureDir(source);
      await fs.writeFile(path.join(source, "file"), "data");
      assert.deepEqual(await fs.readdir(source, { withFileTypes: true }), ["file"]);
      await fs.move(source, destination);
      assert.equal(await fs.exists(source), false);
      assert.equal(await fs.readFile(path.join(destination, "file"), "utf8"), "data");
      assert.equal(stats(await fs.stat(destination)).isDirectory(), true);
      assert.equal(fs.isDirectory(destination), true);
      assert.equal(fs.isFile(path.join(destination, "file")), true);
    });
  });

  test("supports synchronous operations and temporary files", async () => {
    await temporaryDirectory((directory) => {
      const nested = path.join(directory, "nested");
      fs.ensureDirSync(nested);
      fs.ensureDirSync(nested);
      const source = fs.mktempFileSync(path.join(nested, "temp-"));
      fs.writeFileSync(source, "abc");
      fs.appendFileSync(source, "def");
      assert.equal(fs.readFileSync(source, "utf8"), "abcdef");
      const destination = path.join(directory, "moved");
      fs.moveSync(source, destination);
      assert.equal(fs.existsSync(source), false);
      assert.equal(stats(fs.statSync(destination)).size, 6);
      fs.removeSync(destination);
      assert.equal(fs.existsSync(destination), false);
    });
  });

  test("creates asynchronous temporary files and reports missing paths", async () => {
    await temporaryDirectory(async (directory) => {
      const file = await fs.mktempFile(path.join(directory, "temp-"));
      assert.equal(stats(await fs.stat(file)).isFile(), true);
      assert.equal(await fs.readFile(file, "utf8"), "");
      const missing = path.join(directory, "missing");
      assert.equal(await fs.exists(missing), false);
      assert.equal(fs.isFile(missing), false);
      assert.equal(fs.isDirectory(missing), false);
      assert.equal(fs.fileId(missing), null);
      await assert.rejects(fs.move(missing, path.join(directory, "target")), { code: "ENOENT" });
      assert.throws(() => fs.moveSync(missing, path.join(directory, "target")), { code: "ENOENT" });
    });
  });

  test("distinguishes symlinks from their targets", async () => {
    await temporaryDirectory(async (directory) => {
      const target = path.join(directory, "target");
      const link = path.join(directory, "link");
      await fs.mkdir(target);
      await fs.symlink(target, link, process.platform === "win32" ? "junction" : "dir");
      assert.equal(fs.isSymlink(link), true);
      assert.equal(stats(await fs.stat(link)).isSymbolicLink(), true);
      assert.equal(stats(await fs.stat(link, { followLink: true })).isDirectory(), true);
      assert.equal(stats(fs.statSync(link)).isSymbolicLink(), true);
      assert.equal(stats(fs.statSync(link, { followLink: true })).isDirectory(), true);
      assert.equal(fs.resolveSymlink(link), fs.readlinkSync(link));
      assert.equal(fs.resolveSymlink(target), null);
      assert.equal(fs.realpathSync.native(link), native.realpathSync.native(link));
    });
  });

  test("derives file IDs from path and file metadata", async () => {
    await temporaryDirectory(async (directory) => {
      const file = path.join(directory, "file");
      await fs.writeFile(file, "a");
      const id = fs.fileId(file);
      assert.ok(id);
      assert.match(id, /^[\w-]{12}$/);
      assert.equal(fs.fileId(file), id);
      assert.equal(fs.fileId(file, 6), id.slice(0, 6));
      await fs.appendFile(file, "longer");
      assert.notEqual(fs.fileId(file), id);
    });
  });

  test("handles path segments, file URLs and size boundaries", () => {
    const file = path.resolve("folder", "example.txt");
    const url = pathToFileURL(file);
    assert.equal(fs.filename(url), file);
    assert.equal(fs.dirname(url), path.dirname(file));
    assert.equal(fs.dirname(url.href), path.dirname(file));
    assert.equal(fs.basename(file), "example.txt");
    assert.equal(fs.extname(file), ".txt");
    assert.equal(fs.contains(file, "folder"), true);
    assert.equal(fs.contains(file, "fold"), false);
    assert.equal(fs.formatSize(0), "0 B");
    assert.equal(fs.formatSize(1023), "1023 B");
    assert.equal(fs.formatSize(1024), "1.00 KB");
    assert.equal(fs.formatSize(1024 ** 2), "1.00 MB");
    assert.equal(fs.formatSize(1024 ** 4), "1.00 TB");
    assert.equal(browser.formatSize(1536), fs.formatSize(1536));
  });

  test("browser unsupported functions throw instead of returning fallback values", () => {
    const supported = new Set([
      "access",
      "appendFile",
      "basename",
      "constants",
      "contains",
      "copyFile",
      "dirname",
      "ensureDir",
      "exists",
      "extname",
      "formatSize",
      "isAbsolute",
      "mkdir",
      "normalize",
      "readFile",
      "readdir",
      "realpath",
      "relative",
      "remove",
      "resolve",
      "rm",
      "rmdir",
      "stat",
      "truncate",
      "unlink",
      "writeFile",
    ]);
    for (const [name, value] of Object.entries(browser)) {
      if (!supported.has(name)) {
        assert.equal(typeof value, "function");
        if (typeof value !== "function") throw new TypeError(`Expected ${name} to be a function.`);
        assert.throws(() => Reflect.apply(value, undefined, []), { code: "ERR_FS_BROWSER_UNSUPPORTED" }, name);
      }
    }
    assert.throws(() => browser.realpathSync.native(), { code: "ERR_FS_BROWSER_UNSUPPORTED" });
  });

  test("browser path utilities match POSIX paths without an OS working directory", () => {
    for (const value of [
      "",
      "/",
      "//a",
      "/a//b",
      "/a/../b/",
      "a//b/./c",
      "../../a",
      ".profile",
      "..",
      "...",
      "/a/file.txt",
    ]) {
      assert.equal(browser.normalize(value), path.posix.normalize(value), value);
      assert.equal(browser.basename(value), path.posix.basename(value), value);
      assert.equal(browser.dirname(value), path.posix.dirname(value), value);
      assert.equal(browser.extname(value), path.posix.extname(value), value);
      for (const suffix of ["a", ".txt"]) {
        assert.equal(browser.basename(value, suffix), path.posix.basename(value, suffix), `${value}, ${suffix}`);
      }
    }
    assert.equal(browser.resolve("a", "../b"), "/b");
    assert.equal(browser.resolve("/a", "/b", "c"), "/b/c");
    assert.equal(browser.relative("/a/b", "/a/c"), "../c");
    assert.equal(browser.basename("/file.txt", ".txt"), "file");
    assert.equal(browser.contains("/folder/file", "fold"), false);
    assert.throws(() => browser.resolve("bad\0path"), TypeError);
  });

  test("browser capability errors are not hidden by exists or force removal", async () => {
    await assert.rejects(browser.exists("missing"), { code: "ERR_FS_BROWSER_UNSUPPORTED" });
    await assert.rejects(browser.rm("missing", { force: true }), { code: "ERR_FS_BROWSER_UNSUPPORTED" });
  });
});
