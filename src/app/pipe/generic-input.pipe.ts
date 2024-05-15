import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genericInputPipe'
})
export class GenericInputPipe implements PipeTransform {

  transform(element: any, inputFunction: Function, arg?: string): unknown {

    return inputFunction(element, arg);
  }

}
