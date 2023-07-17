function ChatgptOption() {
  this.openAiApiKey = '';
  this.userPromptMinLength = 20;
  this.userPromptMaxLength = 200;
  this.systemPrompt = '';
}

function show_status(text, time) {
  var status = document.getElementById('status');
  status.textContent = text;
  setTimeout(function() {
    status.textContent = '';
  }, time);
}

function restore_options() {
  var defaultOption = new ChatgptOption();
  chrome.storage.local.get(defaultOption).then(
    (items) => {
      //TODO: APIキーの表示仕方を考える
      openAiApiKey.value = items.openAiApiKey;
      userPromptMinLength.value = items.userPromptMinLength;
      userPromptMaxLength.value = items.userPromptMaxLength;
      systemPrompt.value = items.systemPrompt;
    });
}


let openAiApiKey = document.getElementById('chatgpt-api-key');
let userPromptMinLength = document.getElementById('user-prompt-min-length');
let userPromptMaxLength = document.getElementById('user-prompt-max-length');
let systemPrompt = document.getElementById('system-prompt');
let saveButton = document.getElementById('save-chatgpt-setting');
saveButton.addEventListener('click', () => {
  let chatgptOption = new ChatgptOption();
  chatgptOption.openAiApiKey = openAiApiKey.value;
  chatgptOption.userPromptMinLength = userPromptMinLength.value;
  chatgptOption.userPromptMaxLength = userPromptMaxLength.value;
  chatgptOption.systemPrompt = systemPrompt.value;

  chrome.storage.local.set(
    chatgptOption,
    () => {
      show_status('保存完了', 900);
    });
});
document.addEventListener('DOMContentLoaded', restore_options);
