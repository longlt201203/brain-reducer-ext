import Browser from "webextension-polyfill";
import { RuntimeResponse } from "./utils/runtime-message";

Browser.runtime.onConnect.addListener(async () => {
  console.log("Popup open!");
  const response = (await Browser.runtime.sendMessage({
    action: "getDOMStructure",
  })) as RuntimeResponse;

  await Browser.runtime.sendMessage({
    action: "receiveDOMStructure",
    data: response.data,
  });
});
