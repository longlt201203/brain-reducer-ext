import Browser from "webextension-polyfill";

export interface ExtentionStore {
  apiKey: string;
}

export async function getStore(): Promise<ExtentionStore> {
  const data = await Browser.storage.sync.get();
  return {
    apiKey: String(data.apiKey || ""),
  };
}

export async function setStore(data: ExtentionStore) {
  await Browser.storage.sync.set({
    ...data,
  });
}
