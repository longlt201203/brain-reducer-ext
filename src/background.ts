import Browser from "webextension-polyfill";

Browser.runtime.onConnect.addListener(async () => {
  console.log("Popup open!");
  const response = await Browser.runtime.sendMessage({
    action: "getDOMStructure",
  });
  console.log(response);
});
