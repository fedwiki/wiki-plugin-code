/*
 * Federated Wiki : Code Plugin
 *
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-code/blob/master/LICENSE.txt
 */

import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js'

async function emit($item, item) {
  if (!$("link[href='https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css']").length) {
    $('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css">').appendTo("head")
  }
  if (!$("link[href='/plugins/code/code.css']").length) {
    $('<link rel="stylesheet" href="/plugins/code/code.css">').appendTo("head")
  }

  $item.html(`<pre class='hljs'><code class='hljs'>${hljs.highlightAuto(item.text).value}</code></pre>`)


}

function bind($item, item) {
  $item.on('dblclick', () => wiki.textEditor($item, item))
}

if (typeof window !== "undefined" && window !== null) {
  window.plugins.code = {
    emit: emit,
    bind: bind
  }
}