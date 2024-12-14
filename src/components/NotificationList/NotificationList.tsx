import React from "react";
import "./NotificationList.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  addNotification,
  removeNotification,
} from "../../features/notifications/notificationsSlice";

const NotificationList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications,
  );
  const dispatch = useDispatch();

  const handleAddNotification = () => {
    const newNotification: AppNotification = {
      id: Date.now().toString(),
      message: `This is notification ${notifications.length + 1}`,
    };
    dispatch(addNotification(newNotification));
  };

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <section
      className="notification-container"
      aria-labelledby="notification-heading"
    >
      <h2 id="notification-heading" className="visually-hidden">
        Notifications
      </h2>
      <button className="add-button" onClick={handleAddNotification}>
        Add Notification
      </button>
      {notifications.length === 0 ? (
        <p className="empty-notification">No notifications</p>
      ) : (
        <ul className="notification-list" role="list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="notification-item"
              role="listitem"
              tabIndex={0}
              onClick={() => handleRemoveNotification(notification.id)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleRemoveNotification(notification.id);
                }
              }}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default NotificationList;
