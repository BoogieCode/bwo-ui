#!/usr/bin/env node
import('../dist/index.js').then(({ run }) => run(process.argv.slice(2)));
