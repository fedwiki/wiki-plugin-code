/*
 * Federated Wiki : Code Plugin
 *
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-code/blob/master/LICENSE.txt
 */

import hljs from 'highlight.js'

async function emit($item, item) {
  if (!$("link[href='/plugins/code/highlight.css']").length) {
    $('<link rel="stylesheet" href="/plugins/code/highlight.css">').appendTo('head')
  }
  if (!$("link[href='/plugins/code/code.css']").length) {
    $('<link rel="stylesheet" href="/plugins/code/code.css">').appendTo('head')
  }

  $item.html(
    `<pre class='hljs'><code class='hljs'>${
      item.language ? hljs.highlight(item.text, { language: item.language }).value : hljs.highlightAuto(item.text).value
    }</code></pre>`,
  )
}

function bind($item, item) {
  $item.on('dblclick', () => wiki.textEditor($item, item))
}

if (typeof window !== 'undefined' && window !== null) {
  window.plugins.code = {
    emit: emit,
    bind: bind,
  }
}
