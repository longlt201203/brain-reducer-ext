import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

export interface ExtentionStore {
  apiKey: string;
}

export function useStore() {
  const [storeData, setStoreData] = useState<ExtentionStore>({
    apiKey: "",
  });

  useEffect(() => {
    const fetchStore = async () => {
      const data = await browser.storage.sync.get();
      setStoreData({
        apiKey: String(data.apiKey || ""),
      });
    };

    fetchStore();
  }, []);

  const updateStore = async (data: ExtentionStore) => {
    setStoreData(data);
    await browser.storage.sync.set({
      ...data,
    });
  };

  return { storeData, updateStore };
}
