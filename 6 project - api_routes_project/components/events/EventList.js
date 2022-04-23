import EventItem from "./EventItem";

import classes from "./EventList.module.css";

const EvenList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EvenList;
