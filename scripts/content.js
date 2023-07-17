const lfToBr = (text) => {
  return text.replace(/\n/g, '<br>');
};

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.type === "callApi") {
    let selection = window.getSelection();
    if (selection) {
      let requestUserPrompt = request.data.text;
      let rect = selection.getRangeAt(0).getBoundingClientRect();
      let response = await getApiResponse(requestUserPrompt);
      console.log(response);

      let data = {
        content: '',
        totalTokens: 0,
      }
      if (response.error) {
        data.content = lfToBr(response.error.message);
      } else {
        data.content = lfToBr(response.choices[0].message.content);
        data.totalTokens = response.usage.total_tokens;
      }

      chatgptCard.updateData(data);
      chatgptCard.updateCursor(rect.left, rect.bottom);
      chatgptCard.enable();
    }
  }
});
