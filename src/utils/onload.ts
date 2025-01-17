import Browser from "webextension-polyfill";

export let DOMStructure: unknown = {};
console.log(DOMStructure);

window.onload = async () => {
  const [tab] = await Browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  console.log(tab.id);
  DOMStructure = await Browser.tabs.sendMessage(tab.id!, {
    action: "getDOMStructure",
  });
  console.log(DOMStructure);
};
