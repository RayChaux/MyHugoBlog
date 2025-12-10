(() => {
  const addCopyBtn = (box) => {
    if (box.querySelector('.cc-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'cc-btn';
    btn.textContent = 'Copy';
    btn.onclick = () => {
      const code = box.querySelector('code');
      navigator.clipboard.writeText(code.innerText);
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1200);
    };
    box.appendChild(btn);
  };
  const addLangLabel = (box) => {
    if (box.querySelector('.cc-lang')) return;
    const code = box.querySelector('code');
    const lang = (code.className.match(/language-(\w+)/) || [,])[1];
    if (!lang) return;
    const tag = document.createElement('span');
    tag.className = 'cc-lang';
    tag.textContent = lang;
    box.appendChild(tag);
  };
  /* 关键：不再找 pre，而是找 .highlight */
  document.querySelectorAll('.highlight').forEach(box => {
    addCopyBtn(box);
    addLangLabel(box);
  });
})();