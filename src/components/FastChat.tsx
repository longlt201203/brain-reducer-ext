import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Flex, Mentions, Spin } from "antd";
import { getStore } from "../utils/store";
import { ExportOutlined, SendOutlined } from "@ant-design/icons";
import MyMarkdown from "./MyMarkdown";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import Browser from "webextension-polyfill";
import { PageInfo } from "../utils/types";
import hljs from "highlight.js";

const openai = new OpenAI({ apiKey: "", dangerouslyAllowBrowser: true });

export interface FastChatProps {
  pageInfo?: PageInfo;
}

export default function FastChat({ pageInfo }: FastChatProps) {
  const getStoreInfo = useQuery({
    initialData: {
      apiKey: "",
    },
    queryKey: ["getStore"],
    queryFn: getStore,
  });
  const storeData = getStoreInfo.data;

  useEffect(() => {
    openai.apiKey = storeData.apiKey;
  }, [storeData]);

  const [userInput, setUserInput] = useState("");
  const [mdText, setMdText] = useState("");

  const sendMessageToOpenAI = async () => {
    if (!userInput) return;

    setMdText("");
    setUserInput("");
    const chatCompletions = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Please answer all user questions in markdown format.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      stream: true,
    });

    for await (const chunk of chatCompletions) {
      if (chunk.choices[0].delta.content) {
        setMdText((prev) => prev + chunk.choices[0].delta.content);
      }
    }

    hljs.highlightAll();
  };

  return getStoreInfo.isLoading ? (
    <Spin size="large" />
  ) : (
    <Flex vertical gap="small">
      <div className="p-1">
        <MyMarkdown content={mdText} />
      </div>
      <Divider />
      <Flex gap="small">
        <Mentions
          autoSize
          placeholder="Type '#' to include something in this page"
          value={userInput}
          onChange={(v) => setUserInput(v)}
          onKeyDownCapture={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              if (!e.shiftKey) {
                setUserInput((prev) => prev + "\n");
              } else {
                sendMessageToOpenAI();
              }
            }
          }}
          options={[
            ...(pageInfo?.media.map((item) => ({ label: item, value: item })) ||
              []),
          ]}
          prefix="#"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={sendMessageToOpenAI}
        ></Button>
      </Flex>
      <div>
        <Button
          type="link"
          className="italic text-xs"
          icon={<ExportOutlined />}
          iconPosition="end"
          onClick={() => {
            Browser.tabs.create({
              url: "https://chatgpt.com/",
              active: true,
            });
          }}
        >
          ChatGPT
        </Button>
      </div>
    </Flex>
  );
}
