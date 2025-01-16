import { useStore } from "../hooks/useStore";

export default function Popup() {
  const { storeData } = useStore();

  return (
    <div>
      <h1>Hello</h1>
      <p>API Key: {storeData.apiKey}</p>
    </div>
  );
}
