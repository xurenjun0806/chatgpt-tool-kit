const getChatgptCardInnerHtml = (data) => {
  return `<div class="chatgpt-card-header">
    <button id="close-chatgpt-card">閉じる</button>
  </div>
  <div class="chatgpt-card-body">
    ${data.content}
  </div>
  <div class='chatgpt-card-footer'>
    ${data.totalTokens} トークン使用
  </div>
`;
}

function ChatgptCard() {
  this.enabled = false;
  this.cursorX = 0;
  this.cursorY = 0;
  this.displayData = {
    content: '',
    totalTokens: 0,
  };

  this.el = document.createElement('div');
  this.el.id = 'chatgpt-card';
  this.el.style.display = 'none';
  this.el.innerHTML = getChatgptCardInnerHtml(this.displayData);

  this.updateCursor(this.cursorX, this.cursorY);
  this.disable();

  document.body.appendChild(this.el);
}

ChatgptCard.prototype.enable = function() {
  this.enabled = true;
  this.el.style.display = 'flex';
  this.setupTriggers();
}

ChatgptCard.prototype.disable = function() {
  this.enabled = false;
  this.el.style.display = 'none';
}

ChatgptCard.prototype.updateCursor = function(cursorX, cursorY) {
  this.cursorX = window.scrollX + cursorX + 5;
  this.cursorY = window.scrollY + cursorY + 10;
  this.el.style.left = `${this.cursorX}px`;
  this.el.style.top = `${this.cursorY}px`;
}

ChatgptCard.prototype.updateData = function(data) {
  this.displayData = data;
  this.reload();
}

ChatgptCard.prototype.setupTriggers = function() {
  let closeChatgptCardButton = document.getElementById('close-chatgpt-card');
  closeChatgptCardButton.addEventListener('click', () => {
    this.disable();
  });
}

ChatgptCard.prototype.reload = function() {
  this.el.innerHTML = getChatgptCardInnerHtml(this.displayData);
  if (this.enabled) this.setupTriggers();
}

window.addEventListener("load", function() {
  chatgptCard = new ChatgptCard();
});
