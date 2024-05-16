import path from "node:path";
import nodeFs, { promises } from "node:fs";

export const fs: typeof nodeFs &
  typeof promises & {
    resolve: typeof path.resolve;
    extname: typeof path.extname;
    basename: typeof path.basename;
    isAbsolute: typeof path.isAbsolute;
    filename: (input: string) => string;
    dirname: (input) => string;
    isDirectory: (path: string) => boolean;
    isFile: (path: string) => boolean;
    fileId: (path: string) => string;
    watch: (
      path: string,
      options: { ignore: RegExp; throttle: number },
    ) => AsyncIterator<string>;
  };
