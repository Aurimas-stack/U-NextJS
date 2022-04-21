import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../api-util";

import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

import Head from "next/head";

const EventsPage = (props) => {
  const router = useRouter();
  const events = props.events;

  const searchEventHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find all events here" />
      </Head>
      <EventsSearch onSearch={searchEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents
    },
    revalidate: 60
  }
}