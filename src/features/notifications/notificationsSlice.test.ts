import notificationsReducer, { addNotification } from "./notificationsSlice";

test("should add a notification", () => {
  const initialState = { notifications: [] };
  const newNoticiation: AppNotification = {
    id: "1",
    message: "Test notification",
  };
  const testAction = addNotification(newNoticiation);
  const newState = notificationsReducer(initialState, testAction);
  expect(newState.notifications).toHaveLength(1);
  expect(newState.notifications[0].message).toBe("Test notification");
});
