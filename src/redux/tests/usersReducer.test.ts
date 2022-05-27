import usersReducer, {
  actions,
  followThunkCreator,
  InitialStateType,
  unFollowThunkCreator,
} from "../usersReducer";
import {
  ResultCodesEnum,
  followUnfollowAPI,
  ResponseType,
} from "./../../api/api";

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Denis",
        followed: false,
        photos: { small: null, large: null },
        status: "I like React",
      },
      {
        id: 1,
        name: "Vasya",
        followed: false,
        photos: { small: null, large: null },
        status: "I'm Vasya",
      },
      {
        id: 2,
        name: "Grisha",
        followed: true,
        photos: { small: null, large: null },
        status: "I hate JS",
      },
    ],
    pageSize: 3 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false,
    followingProgress: [],
    filter: {
      term: "",
      friend: null,
    },
  };
});

test("follow success", () => {
  const newState = usersReducer(state, actions.follow(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unFollow success", () => {
  const newState = usersReducer(state, actions.unFollow(2));

  expect(newState.users[2].followed).toBeFalsy();
});

//Thunk testing//
jest.mock("./../../api/api");
const userApiMock = followUnfollowAPI as jest.Mocked<typeof followUnfollowAPI>;
const result: ResponseType = {
  messages: [],
  data: {},
  resultCode: ResultCodesEnum.Success,
};

test("followThunk success", async () => {
  userApiMock.followUser.mockReturnValue(Promise.resolve(result));
  const thunk = followThunkCreator(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.disabledButton(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.disabledButton(false, 1)
  );
});

test("unFollowThunk success", async () => {
  userApiMock.unFollowUser.mockReturnValue(Promise.resolve(result));
  const thunk = unFollowThunkCreator(2);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.disabledButton(true, 2)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollow(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.disabledButton(false, 2)
  );
});
