import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { message } from "antd";

export default function Options() {
  const { storeData, updateStore } = useStore();
  const [apiKey, setApiKey] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setApiKey(storeData.apiKey);
  }, [storeData]);

  return (
    <>
      {contextHolder}
      <div>
        <h1>Options</h1>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button
          onClick={async () => {
            await updateStore({ apiKey });
            messageApi.success({
              content: "Update successfully!",
            });
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
