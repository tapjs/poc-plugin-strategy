#!/usr/bin/env node --loader=ts-node/esm --no-warnings
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
if (typeof process.argv[4] !== 'string') {
    console.error('usage: build.ts <test template> <plugins dir>');
    process.exit(1);
}
let template = (0, node_fs_1.readFileSync)((0, node_path_1.resolve)(process.argv[2]), 'utf8');
const out = (0, node_path_1.resolve)(process.argv[4]);
const pluginsDir = (0, node_path_1.resolve)(process.argv[3]);
const plugins = (0, node_fs_1.readdirSync)(pluginsDir).map(p => './' +
    (0, node_path_1.relative)((0, node_path_1.dirname)(out), (0, node_path_1.resolve)(pluginsDir, p).replace(/\.ts/, '.js')));
const pluginImport = plugins
    .map((p, i) => `import plugin${i} from ${JSON.stringify(p)}\n`)
    .join('');
const pluginsCode = `const plugins: PI[] = [
${plugins.map((_, i) => `  plugin${i},\n`).join('')}]
type Plug =
  | TestBase
${plugins
    .map((_, i) => `  | ReturnType<typeof plugin${i}>\n`)
    .join('')}
type PlugKeys =
  | keyof TestBase
${plugins
    .map((_, i) => `  | keyof ReturnType<typeof plugin${i}>\n`)
    .join('')}`;
const opts = `${plugins
    .map((_, i) => `type Plugin${i}Opts = SecondParam<
  Parameters<typeof plugin${i}>,
  TestBaseOpts
>\n`)
    .join('')}
type TestOpts = TestBaseOpts${plugins
    .map((_, i) => `\n  & Plugin${i}Opts`)
    .join('')}
`;
const testInterface = `type TTest = TestBase
${plugins
    .map((_, i) => `  & ReturnType<typeof plugin${i}>\n`)
    .join('')}
`;
const swapTag = (src, tag, code) => {
    const st = '//{{' + tag + ' START}}\n';
    const et = '//{{' + tag + ' END}}\n';
    const start = src.indexOf(st);
    const end = src.indexOf(et);
    return (src.substring(0, start) + code + src.substring(end + et.length));
};
const swapTags = (src, tags) => {
    let res = src;
    for (const [tag, code] of Object.entries(tags)) {
        res = swapTag(res, tag, code);
    }
    return res;
};
(0, node_fs_1.writeFileSync)(out, swapTags(template, {
    'HEADER COMMENT': `// This file is automatically generated, please do not edit\n`,
    'PLUGIN IMPORT': pluginImport,
    'PLUGINS CODE': pluginsCode,
    OPTS: opts,
    'TEST INTERFACE': testInterface,
}));
//# sourceMappingURL=build.js.map