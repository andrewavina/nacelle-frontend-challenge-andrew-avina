import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NotificationList from "./NotificationList";
import {
  addNotification,
  removeNotification,
} from "../../features/notifications/notificationsSlice";

const mockStore = configureStore([]);
const initialState = {
  notifications: {
    notifications: [],
  },
};

describe("NotificationList component unit tests:", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test("renders NotificationList component", () => {
    render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );

    expect(screen.getByText("Add Notification")).toBeInTheDocument();
    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  test("adds a notification", () => {
    render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Add Notification"));

    expect(store.dispatch).toHaveBeenCalledWith(
      addNotification(expect.any(Object)),
    );
  });

  test("removes a notification", () => {
    const stateWithNotifications = {
      notifications: {
        notifications: [{ id: "1", message: "Test Notification 1" }],
      },
    };
    store = mockStore(stateWithNotifications);

    render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Test Notification 1"));

    const actions = store.getActions();

    expect(actions).toContainEqual(removeNotification("1"));
  });

  test("renders notifications from the store", () => {
    const stateWithNotifications = {
      notifications: {
        notifications: [
          { id: "1", message: "Test Notification 1" },
          { id: "2", message: "Test Notification 2" },
        ],
      },
    };
    store = mockStore(stateWithNotifications);

    render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );

    expect(screen.getByText("Test Notification 1")).toBeInTheDocument();
    expect(screen.getByText("Test Notification 2")).toBeInTheDocument();
  });
});

describe("NotificationList component snapshot tests", () => {
  test("matches snapshot with no notifications", () => {
    const store = mockStore({ notifications: { notifications: [] } });
    const { asFragment } = render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot with one notification", () => {
    const store = mockStore({
      notifications: {
        notifications: [{ id: "1", message: "Test Notification" }],
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches snapshot with multiple notifications", () => {
    const store = mockStore({
      notifications: {
        notifications: [
          { id: "1", message: "Notification 1" },
          { id: "2", message: "Notification 2" },
        ],
      },
    });
    const { asFragment } = render(
      <Provider store={store}>
        <NotificationList />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
