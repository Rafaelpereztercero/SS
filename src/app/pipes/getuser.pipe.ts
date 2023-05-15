import { Pipe, PipeTransform } from '@angular/core'
import { User } from 'src/app/models/user.model';


@Pipe({
  name: 'getuser',
})
export class getUserPipe implements PipeTransform {
  transform(uid: number, users: User[]): User {
    return users.find(user => user.id === uid)!

  }
}
