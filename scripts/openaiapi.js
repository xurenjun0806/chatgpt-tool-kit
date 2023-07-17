function ChatgptOption() {
  this.openAiApiKey = '';
  this.userPromptMinLength = 20;
  this.userPromptMaxLength = 200;
  this.systemPrompt = '';
}

async function getApiResponse(user_prompt) {
  let chatgptOption = new ChatgptOption();
  await chrome.storage.local.get(chatgptOption).then(
    (result) => {
      chatgptOption.openAiApiKey = result.openAiApiKey;
      chatgptOption.userPromptMinLength = result.userPromptMinLength;
      chatgptOption.userPromptMaxLength = result.userPromptMaxLength;
      chatgptOption.systemPrompt = result.systemPrompt;
    });

  if (!chatgptOption.systemPrompt) {
    return {
      error: {
        message: 'システムプロンプトが設定されていません。'
      }
    };
  }

  if (user_prompt.length < chatgptOption.userPromptMinLength
    || user_prompt.length > chatgptOption.userPromptMaxLength) {
    return {
      error: {
        message: `文字数が${chatgptOption.userPromptMinLength}以上,
${chatgptOption.userPromptMaxLength}以下の場合のみ処理を行うことができます。`
      }
    };
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + chatgptOption.openAiApiKey
    },
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo',
      'messages': [
        {
          'role': 'system',
          'content': chatgptOption.systemPrompt
        },
        {
          'role': 'user',
          'content': user_prompt
        }
      ],
    })
  });

  // TODO: ユーザープロンプトとレスポンスを履歴に残す

  return response.json()
}
