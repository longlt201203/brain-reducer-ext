import { Button, Form, Input, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ExtentionStore, getStore, setStore } from "../utils/store";
import { useEffect } from "react";

export default function OptionsPage() {
  const [form] = Form.useForm<ExtentionStore>();
  const [messageApi, contextHolder] = message.useMessage();

  const getStoreInfo = useQuery({
    initialData: {
      apiKey: "",
    },
    queryKey: ["getStore"],
    queryFn: getStore,
  });
  const storeData = getStoreInfo.data;

  const setStoreMutation = useMutation({
    mutationFn: setStore,
    onSuccess: () => {
      messageApi.success("Success!");
      getStoreInfo.refetch();
    },
    onError: (error) => {
      console.log(error);
      message.error(error.message);
    },
  });

  useEffect(() => {
    form.setFieldsValue(storeData);
  }, [form, storeData]);

  return (
    <>
      {contextHolder}
      <Form<ExtentionStore>
        form={form}
        layout="vertical"
        onFinish={setStoreMutation.mutate}
      >
        <Form.Item<ExtentionStore> name="apiKey" label="API Key">
          <Input.Password placeholder="Enter API Key" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
