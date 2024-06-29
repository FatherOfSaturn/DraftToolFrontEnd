import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

//   private appConfig: any;

//   constructor(private http: HttpClient) { 
//     console.log("HttpClient is injected:", http);
//   }

//   loadAppConfig(): Promise<void>{
//     return this.http.get('/assets/config.json')
//       .toPromise()
//       .then(data => {
//         this.appConfig = data;
//       });
//   }

//   // This is an example property ... you can make it however you want.
//   get apiBaseUrl() {

//     if (!this.appConfig) {
//       throw Error('Config file not loaded!');
//     }

//     return this.appConfig.apiBaseUrl;
//   }
}