import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {
  transform(list: any[], searchTerm: string): any[] {
       if (searchTerm) {
          searchTerm = searchTerm.toUpperCase();
          return list.filter(item => {
            return item.sName.toUpperCase().indexOf(searchTerm) !== -1
          });
        } else {
          return list;
        }
    }
}
