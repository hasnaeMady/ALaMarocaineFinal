import { Pipe, PipeTransform } from '@angular/core';
import { PlatModule } from '../Models/plat/plat.module';

/**
 * Angular Pipes transform the output. 
 * You can think of them as makeup rooms where they beautify the data into a more desirable format. 
 * They do not alter the data but change how they appear to the user. 
 * 


 */

@Pipe({
  name: 'platsearchpipe'
})

export class PlatsearchpipePipe implements PipeTransform {

  transform(plat: PlatModule[], searchTerm: string) {
    if (!plat || !searchTerm) {
      return plat;
    } else {
      
      return plat.filter(plat => {
            if (searchTerm && plat.platName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                return true;
            }
            if (searchTerm && plat.chefName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                return true;
            }
            if (searchTerm && plat.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                return true;
            }
            return false;
       });

    }


  }

}
