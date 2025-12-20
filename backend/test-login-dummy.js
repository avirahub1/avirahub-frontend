
const fetch = require('node-fetch'); // backend has it or not? Node 18+ has global fetch.
// Avira backend type is module, so we can use import or global fetch if node is recent.
// package.json says type: module.

// Let's use a curl command instead of a js file to avoid issues.
// But wait, run_command for curl.
console.log("Use curl");
