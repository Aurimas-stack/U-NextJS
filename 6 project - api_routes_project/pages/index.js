import { getFeaturedEvents } from "../api-util";
import EvenList from "../components/events/EventList";
import Head from "next/head";
import NewsletterRegistration from '../components/inputs/newsletter-registration';

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of events here" />
      </Head>
      <NewsletterRegistration />
      <EvenList items={props.events} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
