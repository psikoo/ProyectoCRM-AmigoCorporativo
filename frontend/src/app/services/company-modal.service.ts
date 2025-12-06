import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyModalService {
  private subj = new Subject<boolean>();
  open$ = this.subj.asObservable();

  open() { this.subj.next(true); }
  close() { this.subj.next(false); }
}
