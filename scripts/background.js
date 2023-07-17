chrome.runtime.onInstalled.addListener(function() {
  // 右クリックメニューに翻訳ByChatgptボタンを追加
  chrome.contextMenus.create({
    id: "callApi",
    title: "CallApi",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  if (tab.id === undefined) return;

  if (info.menuItemId === "callApi") {
    const text = info.selectionText;
    chrome.tabs.sendMessage(tab.id,
      {
        type: "callApi",
        data: {
          text: text,
        }
      });
  };
});
