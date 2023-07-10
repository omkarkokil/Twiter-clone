import TweetInput from "@/components/MiddleSection/Tweet/TweetInput";
import FeedHolder from "@/components/MiddleSection/Feed/FeedHolder";
import TweeterLayout from "@/components/Layouts/TweeterLayout";
import ServerSideAction from "@/components/MiddleSection/Feed/ServerSideAction";

export default function Home() {
  return (
    <>
      <TweeterLayout>
        <TweetInput />
        <ServerSideAction />
      </TweeterLayout>
    </>
  );
}
