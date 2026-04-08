const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, '..', 'node_modules/highlight.js/styles/default.min.css')
const dest = path.join(__dirname, '..', 'client/highlight.css')

console.log(src, '->', dest)
// Ensure the directory exists
fs.mkdirSync(path.dirname(dest), { recursive: true })

// Copy the file
fs.copyFileSync(src, dest)
console.log('✅ File copied successfully!')
