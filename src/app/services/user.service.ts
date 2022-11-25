import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getGroupsOfUser(fakeToken: string): string[] {
    return [
      '3fa85f64-5717-4562-b3fc-2c963f66afa9',
      'af385f64-5717-4562-b3fc-2c963f66afa4',
      'be3a5572-5717-4562-b3fc-2c963f66a4fc',
    ];
  }
}
