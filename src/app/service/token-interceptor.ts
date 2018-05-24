import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { UsersService } from './user.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor{ //implements HttpInterceptor {

  constructor(private auth: UsersService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const authToken = this.auth.GetToken;
    const started = Date.now();
    let ok: string;
 
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    //if(authToken!=""){
      console.log("Interceptor Executing!!!");
    const authReq = req.clone({
      setHeaders:{'Content-Type':'application/json',Authorization:authToken}
    });

    return next.handle(authReq)
    .pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        // Operation failed; error is an HttpErrorResponse
        error => ok = 'failed'
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
  
  }
}
