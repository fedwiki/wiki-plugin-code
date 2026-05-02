/*
 * Federated Wiki : Code Plugin
 *
 * Licensed under the MIT license.
 * https://github.com/fedwiki/wiki-plugin-code/blob/master/LICENSE.txt
 */

import hljs from 'highlight.js'

const emit = async ($item, item) => {
  if (!$("link[href='/plugins/code/highlight.css']").length) {
    $('<link rel="stylesheet" href="/plugins/code/highlight.css">').appendTo('head')
  }
  if (!$("link[href='/plugins/code/code.css']").length) {
    $('<link rel="stylesheet" href="/plugins/code/code.css">').appendTo('head')
  }

  let autoLanguage
  const extractLanguage = text => {
    const { language: autoLanguage, value } = hljs.highlightAuto(text)
    console.log('using detacted language:', autoLanguage)
    return value
  }

  const highlight = () => {
    let value
    let output
    try {
      output = hljs.highlight(item.text, { language: item.language })
      value = output.value
    } catch (error) {
      output = hljs.highlightAuto(item.text)
      value = output.value
      console.log('Hightlight Error:', error.message, 'using detected language:', output.language)
    }
    return value
  }

  $item.html(
    `<pre class='hljs'><code class='hljs'>${item.language ? highlight() : extractLanguage(item.text)}</code></pre>`,
  )
}

const bind = ($item, item) => {
  // $item.on('dblclick', () => wiki.textEditor($item, item))
  $item.on('dblclick', () => editor($item, item))
}

const editor = async ($item, item) => {
  if (!$('.editEnable').is(':visible')) return

  if ($item.hasClass('textEditing')) return

  const keydownHandler = e => {
    // esc, or ctrl-s, or meta-s for save
    if (e.which === 27 || ((e.ctrlKey || e.metaKey) && e.which === 83)) {
      e.preventDefault()
      $item.trigger('focusout')
      return false
    }
    // ctrl-i, or meta-i, for information
    if ((e.ctrlKey || e.metaKey) && e.which === 73) {
      e.preventDefault()
      const page = e.shiftKey ? undefined : $(e.target).parents('.page')
      wiki.doInternalLink('about code plugin', page)
      return false
    }
  }

  const mousedownHandler = event => {
    const isStillInside = $item[0].contains(event.target)
    if (!isStillInside) {
      $(document).off('mousedown', mousedownHandler)
      $item.removeClass('textEditing')
      $codeEditor.off()
      const $page = $item.parents('.page:first')
      if ($item.find('textarea').val().length > 0) {
        const languageChanged = item.language !== $item.find('#code-language').val()
        const codeChanged = item.text !== $item.find('textarea').val()
        item.text = $item.find('textarea').val()
        item.language = $item.find('#code-language').val()
        console.log({ languageChanged, language: item.language, codeChanged, code: item.code })

        wiki.doPlugin($item.empty(), item)
        if (item.language === original.language && item.text === original.text) return
        wiki.pageHandler.put($page, { type: 'edit', id: item.id, item: item })
      } else {
        wiki.pageHandler.put($page, { type: 'remove', id: item.id })
        const index = $('.item').index($item)
        $item.remove()
        wiki.renderFrom(index)
      }
    }
    return
  }

  $item.addClass('textEditing')
  $item.off()
  const original = {
    text: item.text || '',
    language: item.language || '',
  }

  const $codeEditor = $(`
    <textarea>${item.text}</textarea>`)

  $item.html($codeEditor)
  $item.append(`<div id='code-options'></div>`)
  $('#code-options').append(`
    <div>
      <label>Language:</label>
      <input list="languages" id="code-language" name="language-choice" ${item.language ? `value="${item.language}"` : `placeholder="Code Language"`}>
    </div>`)

  $item.on('keydown', keydownHandler)
  $(document).on('mousedown', mousedownHandler)
}

if (typeof window !== 'undefined' && window !== null) {
  window.plugins.code = { emit, bind, editor }
}
