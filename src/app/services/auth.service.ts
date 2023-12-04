import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$;
  user!: User | null;

  constructor(
    // private f: FirebaseApp,
    private auth: Auth,
  ) {
    this.user$ = new Observable<User | null>(observer => {auth.onAuthStateChanged(observer)});
    this.user$.subscribe(user => { this.user = user; });
    this.user$.subscribe(console.log);
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
