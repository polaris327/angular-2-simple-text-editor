import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class SignalsService {
  private user = '20987ea0-77d0-4b1f-ac88-52aa39faa9f';

  constructor(private http: Http) { }

  get() {
    const URL = 'https://evening-savannah-67907.herokuapp.com/api/v1/sys/signals/' + this.user;
    return this.http.get(URL).map(
      (response: Response) => {
          return response.json();
      }
  );

  }
  save( signal: string ) {
    const URL = 'https://evening-savannah-67907.herokuapp.com/api/v1/sys/signals';

    const headers    = new Headers({ 'Content-Type': 'application/json' });
    const options: RequestOptionsArgs    = { headers: headers };
    const body = {
      user: this.user,
      content: signal
    };

    return this.http.put(URL, body, options).map(
        (response: Response) => {
            return response.json();
        }
    );
  }
}
