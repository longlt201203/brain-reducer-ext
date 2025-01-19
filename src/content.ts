import Browser from "webextension-polyfill";

import { RuntimeMessage, RuntimeResponse } from "./utils/runtime-message";
import { DOMStructureObject, PageInfo } from "./utils/types";

console.log("Content Script loaded!");

Browser.runtime.onMessage.addListener((message, _, sendResponse) => {
  console.log("Content Script Called", message);
  if (!message) {
    sendResponse({ error: "Message is required!" });
    return undefined;
  }
  if (typeof message !== "object") {
    sendResponse({ error: "Type of message is object!" });
    return undefined;
  }
  const msg = message as RuntimeMessage;
  switch (msg.action) {
    case "getDOMStructure":
      sendResponse(getDOMStructure());
      return undefined;
    case "getPageInfo":
      sendResponse(getPageInfo());
      return undefined;
    default:
      sendResponse({ error: "Invalid action!" });
      return undefined;
  }
});

function getDOMStructure() {
  const response: RuntimeResponse<string> = {};
  const root = document.documentElement;

  const queue: Element[] = [root];
  const eleMap = new Map<Element, DOMStructureObject>();
  while (queue.length > 0) {
    const current = queue.shift()!;
    let obj: DOMStructureObject = {
      tagName: current.tagName,
      id: current.id,
      class: current.className,
      content: current.textContent || "",
      children: [],
      parent: null,
    };
    if (current.parentElement) {
      const parentObj = eleMap.get(current.parentElement)!;
      obj.parent = parentObj;
      parentObj.children.push(obj);
    }
    eleMap.set(current, obj);
    queue.push(...Array.from(current.children));
  }

  const cache: string[] = [];
  response.data = JSON.stringify(eleMap.get(root), (key, value) => {
    if (typeof value === "object" && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return;

      // Store value in our collection
      cache.push(value);
    }
    return value;
  });

  return response;
}

function getPageInfo() {
  const response: RuntimeResponse<PageInfo> = {
    data: {
      links: [],
      media: [],
      text: [],
      import: [],
    },
  };
  const root = document.documentElement;

  const queue: Element[] = [root];
  while (queue.length > 0) {
    const current = queue.shift()!;
    switch (current.tagName) {
      case "A":
      case "IFRAME": {
        const e = current as HTMLAnchorElement;
        response.data?.links.push({
          href: e.href,
          text: e.textContent || e.href,
        });
        break;
      }
      case "IMG":
      case "VIDEO":
      case "AUDIO": {
        const e = current as HTMLMediaElement;
        response.data?.media.push(e.src);
        break;
      }
      case "LINK": {
        const e = current as HTMLLinkElement;

        response.data?.import.push(e.href);
        break;
      }
      case "SCRIPT": {
        const e = current as HTMLScriptElement;
        if (e.src) {
          response.data?.import.push(e.src);
        }
        break;
      }
      default: {
        if (
          current.tagName != "STYLE" &&
          current.tagName != "NOSCRIPT" &&
          current.textContent
        ) {
          response.data?.text.push(current.textContent);
        }
      }
    }
    queue.push(...Array.from(current.children));
  }

  return response;
}
