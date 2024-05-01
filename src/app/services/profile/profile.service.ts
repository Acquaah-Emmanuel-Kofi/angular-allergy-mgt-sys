// import { Injectable, inject } from '@angular/core';
// import { AuthenticationService } from '../auth/authentication.service';
// import { decodeJwt } from '../../utility/constants/auth.constants';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {

//   private _tokenService = inject(AuthenticationService)
//   userFirstName!:string;
//   userLastName!:string;
//   userId!:string;
//   userEmail!:string;
//   userProfilePicture!:string;


//   constructor() { 
//     console.log(this._tokenService.getAccessTokenn());
    
//     this.getUserInfo(); 
//   }

//   getUserInfo(): void{
//     const token = this._tokenService.getAccessTokenn();

//     if (token){
//       const decodedToken: any = decodeJwt(token);
//       this.userId = decodedToken.jti;
//       this.userFirstName = decodedToken.given_name;
//       this.userLastName = decodedToken.family_name;
//       this.userProfilePicture = decodedToken.picture;
//       this.userEmail = decodedToken.email;
//     }
//   }
// }
