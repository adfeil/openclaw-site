document.addEventListener('DOMContentLoaded', initDashboard);

let manifest = { files: [] };
let currentFile = null;

async function initDashboard() {
  try {
    // Load manifest.json (relative to /site/)
    const response = await fetch('manifest.json');
    manifest = await response.json();

    updateBadge();
    populateFileList();
  } catch (error) {
    console.error('Error loading manifest:', error);
    showError('Failed to load file manifest.json. Make sure you opened /site/ via http://localhost:8000/site/');
  }
}

function updateBadge() {
  const badge = document.getElementById('badge');
  const count = manifest?.files?.length ?? 0;
  badge.textContent = `Files: ${count}`;
}

function populateFileList() {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = '';

  if (!manifest.files || manifest.files.length === 0) {
    fileList.innerHTML = '<li class="loading">No scout files found</li>';
    return;
  }

  // Build list items
  manifest.files.forEach((fileObj) => {
    const li = document.createElement('li');

    const displayName =
      fileObj.name ||
      (fileObj.path ? fileObj.path.split('/').pop() : 'unknown-file.md');

    li.textContent = displayName;
    li.dataset.path = fileObj.path;

    li.addEventListener('click', () => loadFile(fileObj.path, li));
    fileList.appendChild(li);
  });

  // Auto-load first file (after list items exist)
  const firstItem = fileList.querySelector('li');
  if (firstItem) {
    firstItem.classList.add('active');
    loadFile(firstItem.dataset.path, firstItem);
  }
}

async function loadFile(filePath, listItem) {
  try {
    // Mark active in sidebar
    document.querySelectorAll('.file-list li').forEach((li) => li.classList.remove('active'));
    listItem.classList.add('active');

    // Fetch markdown file (relative path, e.g. "data/daily-scout-....md")
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} while fetching ${filePath}`);
    }

    const content = await response.text();
    renderMarkdown(content);
    currentFile = filePath;
  } catch (error) {
    console.error('Error loading file:', error);
    showError(`Failed to load file: ${filePath}`);
  }
}

function renderMarkdown(markdown) {
  const contentArea = document.getElementById('contentArea');

  // Escape HTML first
  let html = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (``` ... ```)
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<pre><code>${code}</code></pre>`;
  });

  // Headings
  html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');

  // Links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Bold / Italic (basic)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline code `...`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Lists: lines starting with "- " or "* " or "+ "
  // Convert list items
  html = html.replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>');
  // Wrap consecutive <li>...</li> in <ul>...</ul>
  html = html.replace(/(?:<li>.*<\/li>\s*)+/g, (block) => `<ul>${block}</ul>`);

  // Paragraphs / line breaks:
  // Split by blank lines into paragraphs, but keep headings/lists/pre blocks intact.
  const parts = html.split(/\n{2,}/);

  html = parts
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return '';

      // If already a block element, keep it
      const isBlock =
        trimmed.startsWith('<h1') ||
        trimmed.startsWith('<h2') ||
        trimmed.startsWith('<h3') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<pre');

      if (isBlock) return trimmed;

      // Otherwise, convert single newlines to <br> inside a paragraph
      const withBreaks = trimmed.replace(/\n/g, '<br>');
      return `<p>${withBreaks}</p>`;
    })
    .join('\n');

  contentArea.innerHTML = `<div class="md-content">${html}</div>`;
}

function showError(message) {
  const contentArea = document.getElementById('contentArea');
  contentArea.innerHTML = `<div class="placeholder" style="color:#d32f2f;">${message}</div>`;
}