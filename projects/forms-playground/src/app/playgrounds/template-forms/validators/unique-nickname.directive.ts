import {ChangeDetectorRef, Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from "@angular/forms";
import {catchError, finalize, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Directive({
  selector: '[appUniqueNickname]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueNicknameDirective,
      multi: true
    }
  ]
})
export class UniqueNicknameDirective implements AsyncValidator {

  constructor(private httpClient: HttpClient, private cd: ChangeDetectorRef) {
  }

  validate(control: AbstractControl<string>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.httpClient.get<unknown[]>('https://jsonplaceholder.typicode.com/users?username=' + control.value).pipe(
      map(users => users.length === 0 ? null : {appUniqueNickname: {isTaken: true}}),
      catchError(() => of({appUniqueNickname: {unknownError: true}})),
      finalize(() => this.cd.markForCheck())
    )
  }

}
