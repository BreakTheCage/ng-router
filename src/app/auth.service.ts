import { resolve } from "path";

export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800)
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}



























// export class AuthService {
//   loggedIn = false;

//   isAuthenticated() {
//     const promise = new Promise(
//       (resolve, reject) => {
//         setTimeout(() => {
//           resolve(this.loggedIn);
//         }, 800);
//       }
//     );
//     return promise;
//   }

//   login() {
//     this.loggedIn = true;
//   }

//   logout() {
//     this.loggedIn = false;
//   }
// }
