// src/store.ts

import { writable, derived } from "svelte/store";
import type { User } from "@auth0/auth0-spa-js";

export const isAuthenticated = writable(false);
export const user = writable<User>({}); // Assuming user can be null before being set
export const popupOpen = writable(false);
export const error = writable();

export const tasks = writable<User>([]);
export const user_tasks = derived([tasks, user], ([$tasks, $user]) =>
  $tasks.filter((task: User) => task.user === $user.email)
);
