<script>
let inputTextArea = document.getElementById('inputText');
  let wordCountDisplay = document.getElementById('wordCount');
  let searchResultDisplay = document.getElementById('searchResult');
  let searchTermInput = document.getElementById('searchTerm');
  let countTermInput = document.getElementById('countTerm');
  let replaceOldInput = document.getElementById('replaceOld');
  let replaceNewInput = document.getElementById('replaceNew');
  let textPreview = document.getElementById('custom-textPreview');

  let history = [];
  let currentHistoryIndex = -1;

  function updateWordCount() {
    const text = inputTextArea.value;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    wordCountDisplay.innerText = wordCount;
  }

  function saveToHistory() {
    history.push(inputTextArea.value);
    currentHistoryIndex++;
  }

  function undo() {
    if (currentHistoryIndex > 0) {
      currentHistoryIndex--;
      inputTextArea.value = history[currentHistoryIndex];
      updateWordCount();
      updateTextPreview();
    }
  }

  function redo() {
    if (currentHistoryIndex < history.length - 1) {
      currentHistoryIndex++;
      inputTextArea.value = history[currentHistoryIndex];
      updateWordCount();
      updateTextPreview();
    }
  }

  function clearText() {
    inputTextArea.value = '';
    updateWordCount();
    history = [];
    currentHistoryIndex = -1;
    updateTextPreview();
  }

  function searchText() {
    let searchTerm = searchTermInput.value.trim();
    let regex = new RegExp(searchTerm, 'gi');
    let text = inputTextArea.value;
    let resultText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    updateTextPreview(resultText);

    let count = (text.match(regex) || []).length;
    searchResultDisplay.innerText = `Found "${searchTerm}" ${count} time(s).`;
  }

  function countKeyword() {
    let keyword = countTermInput.value.trim();
    let regex = new RegExp(keyword, 'gi');
    let text = inputTextArea.value;
    let count = (text.match(regex) || []).length;
    alert(`The word "${keyword}" appears ${count} time(s).`);

    let resultText = text.replace(regex, match => `<span class="highlight">${match}</span>`);
    updateTextPreview(resultText);
  }

  function replaceText() {
    let oldText = replaceOldInput.value.trim();
    let newText = replaceNewInput.value.trim();
    if (oldText && newText) {
      let regex = new RegExp(oldText, 'gi');
      let text = inputTextArea.value;
      let resultText = text.replace(regex, newText);
      inputTextArea.value = resultText;
      updateWordCount();
      updateTextPreview(resultText);
    }
  }

  function updateTextPreview(highlightedText = inputTextArea.value) {
    textPreview.innerHTML = highlightedText;
  }

  inputTextArea.addEventListener('input', function () {
    saveToHistory();
    updateWordCount();
    updateTextPreview();
  });

  updateWordCount();
  updateTextPreview();
</script>
