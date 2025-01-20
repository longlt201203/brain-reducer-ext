import { useQuery } from "@tanstack/react-query";
import { Button, Collapse, Flex, Typography } from "antd";
import FastChat from "../components/FastChat";
import { RuntimeResponse } from "../utils/runtime-message";
import { PageInfo } from "../utils/types";
import Browser from "webextension-polyfill";

const { Link } = Typography;

export default function HomePage() {
  const getPageInfoInfo = useQuery({
    queryKey: ["getPageInfo"],
    queryFn: async () => {
      const [tab] = await Browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      if (!tab.id) throw new Error("Tab not found!");
      const response = (await Browser.tabs.sendMessage(tab.id, {
        action: "getPageInfo",
      })) as RuntimeResponse<PageInfo>;
      if (response.error) throw new Error(response.error);
      return response.data!;
    },
  });

  console.log(getPageInfoInfo.data?.text);

  return (
    <>
      <Flex vertical gap="small">
        <Button type="primary" onClick={() => getPageInfoInfo.refetch()}>
          Refetch Page Info
        </Button>
        <Collapse>
          <Collapse.Panel header="Fast Chat" key="chat">
            <FastChat pageInfo={getPageInfoInfo.data} />
          </Collapse.Panel>
          <Collapse.Panel header="Links" key="links">
            <ul className="list-disc p-1">
              {getPageInfoInfo.data?.links.map((v) => (
                <li>
                  <Link href={v.href}>{v.text}</Link>
                </li>
              ))}
            </ul>
          </Collapse.Panel>
          <Collapse.Panel header="Media" key="media">
            <ul style={{ listStyleType: "disc" }} className="list-disc p-1">
              {getPageInfoInfo.data?.media.map((v) => (
                <li>
                  <Link href={v}>{v}</Link>
                </li>
              ))}
            </ul>
          </Collapse.Panel>
          <Collapse.Panel header="Import" key="import">
            <ul className="list-disc p-1">
              {getPageInfoInfo.data?.import.map((v) => (
                <li>
                  <Link href={v}>{v}</Link>
                </li>
              ))}
            </ul>
          </Collapse.Panel>
        </Collapse>
      </Flex>
    </>
  );
}
