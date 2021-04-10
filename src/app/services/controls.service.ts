import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  fontSize$ : BehaviorSubject<any> = new BehaviorSubject(16);
  constructor() { }
}
