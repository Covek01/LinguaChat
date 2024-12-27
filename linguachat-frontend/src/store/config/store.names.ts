import { StoreModule } from '@ngrx/store';
import { darkModeReducer } from '../dark-mode/dark-mode.reducer';
import { loginReducer } from '../login/login.reducer';
import { signupReducer } from '../signup/signup.reducer';
import {
  myUserStateReducer,
  userStateReducer,
} from '../user/user-data/user-data.reducer';
import { blockedUsersReducer } from '../user/blocked-users/blocked-users.reducer';
import { connectionsReducer } from '../user/connections/connections.reducer';
import { languagesLearningReducer } from '../user/languages-learning/languages-learning.reducer';
import { languagesNativeReducer } from '../user/languages-native/languages-native.reducer';
import { postReducer } from '../user/post/user-post.reducer';
import { commentReducer } from '../comment/comment.reducer';

//it's stateName - reducer configuration
export const ngStoreNames = StoreModule.forRoot({
  darkMode: darkModeReducer,
  loginState: loginReducer,
  signupState: signupReducer,
  user: userStateReducer,
  myUser: myUserStateReducer,
  blockedUsers: blockedUsersReducer,
  connections: connectionsReducer,
  languagesLearning: languagesLearningReducer,
  languagesNative: languagesNativeReducer,
  posts: postReducer,
  comments: commentReducer
});
