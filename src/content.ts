import Browser from "webextension-polyfill";

import { RuntimeMessage, RuntimeResponse } from "./utils/runtime-message";

console.log("Content Script loaded!");

Browser.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  console.log("Called");
  if (!message) return sendResponse({ error: "Message is required!" });
  if (typeof message !== "object") {
    return sendResponse({ error: "Type of message is object!" });
  }
  const msg = message as RuntimeMessage;
  switch (msg.action) {
    case "getDOMStructure":
      return sendResponse(getDOMStructure());
    default:
      return sendResponse({ error: "Invalid action!" });
  }
});

function getDOMStructure() {
  const response: RuntimeResponse = {};

  response.data = { message: "Hello!" };

  return response;
}
