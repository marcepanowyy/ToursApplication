import { PipeTransform, Pipe } from '@angular/core';
import {Tour} from "../models/tour";

@Pipe({
  name: 'FilterTours',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], country: string, bottomPrice: string, topPrice: string, votes: string) {

    // return items.filter(item => { not array!
    return Object.values(items).filter(item => {

      if(country != item.country && country != ""){
        return false;
      }

      if(+bottomPrice > item.price && bottomPrice != "") {
        return false
      }

      if(+topPrice < item.price && topPrice != ""){
        return false
      }

      if(+votes > item.votes && votes != ""){
        return false
      }
      return true

    });
  }
}
