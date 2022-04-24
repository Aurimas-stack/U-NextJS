import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const notificationCtx = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notificationCtx.notification && (
        <Notification
          title={notificationCtx.notification.title}
          message={notificationCtx.notification.message}
          status={notificationCtx.notification.status}
        />
      )}
    </Fragment>
  );
};
export default Layout;
