import { useQuery } from "@tanstack/react-query";
import { Flex, Input } from "antd";
import { getStore } from "src/utils/store";

export default function FastChat() {
  const getStoreInfo = useQuery({
    initialData: {
      apiKey: "",
    },
    queryKey: ["getStore"],
    queryFn: getStore,
  });

  return (
    <Flex vertical>
      <Input />
    </Flex>
  );
}
