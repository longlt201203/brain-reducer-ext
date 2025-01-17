import { Flex, Tabs, TabsProps, Typography } from "antd";
import HomePage from "./pages/HomePage";
import OptionsPage from "./pages/OptionsPage";

const { Title } = Typography;

const tabsItem: TabsProps["items"] = [
  {
    key: "home",
    label: "Home",
    children: <HomePage />,
  },
  {
    key: "options",
    label: "Options",
    children: <OptionsPage />,
  },
];

export default function App() {
  return (
    <Flex vertical className="p-2">
      <Title className="text-center" style={{ margin: 0 }}>
        Brain Reducer
      </Title>
      <Tabs defaultActiveKey="home" items={tabsItem} centered />
    </Flex>
  );
}
