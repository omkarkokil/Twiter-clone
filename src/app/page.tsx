import TweetInput from "@/components/MiddleSection/Tweet/TweetInput";
import FeedHolder from "@/components/MiddleSection/Feed/FeedHolder";
import TweeterLayout from "@/components/Layouts/TweeterLayout";

export default function Home() {
  return (
    <>
      <TweeterLayout>
        <TweetInput />
        <FeedHolder />
      </TweeterLayout>
    </>
  );
}
