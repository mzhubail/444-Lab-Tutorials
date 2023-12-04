import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User | null;

  constructor(
    // private f: FirebaseApp,
    private auth: Auth,
  ) {
    auth.onAuthStateChanged(
      user => {
        this.user = user;
      }
    );
  }

  signIn(email: string, password: string) {
    // const auth = getAuth(this.f);
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(`Signed in ${user.email}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  }

  signOut() {
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

}
