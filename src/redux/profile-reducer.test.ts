// @ts-ignore
import { actions } from "./profile-reducer.ts";
// @ts-ignore
import profileReducer from "./profile-reducer.ts";

let state = {
   posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 10 },
      { id: 2, message: "It's my first post", likesCount: 33 },
   ],
   profile: null,
   status: "",
   newPostText: "",
};

it("length of posts should be incremented", () => {
   // 1. test data
   let action = actions.addPostActionCreator("BARCELONA");

   // 2. action
   let newState = profileReducer(state, action);

   // 3. expectation
   expect(newState.posts.length).toBe(3);
});

it("message of new post should be correct", () => {
   // 1. test data
   let action = actions.addPostActionCreator("BARCELONA");

   // 2. action
   let newState = profileReducer(state, action);

   // 3. expectation
   expect(newState.posts[2].message).toBe("BARCELONA");
});

it("after deleting length of messages should be decrement", () => {
   // 1. test data
   let action = actions.deletePost(1);

   // 2. action
   let newState = profileReducer(state, action);

   // 3. expectation
   expect(newState.posts.length).toBe(1);
});

it(`after deleting, length shouldn't be decrement if id is incorrect`, () => {
   // 1. test data
   let action = actions.deletePost(5);

   // 2. action
   let newState = profileReducer(state, action);

   // 3. expectation
   expect(newState.posts.length).toBe(2);
});
