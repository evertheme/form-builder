import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filter list of fields based on position
 */
@Pipe({name: 'position'})
export class PositionPipe implements PipeTransform {
    transform(list: any[], pos: string): any {
        if (list && list.length) {
            let filtered = list.filter((item: any) => {
                return item.position === pos;
            });

            return filtered;
        }

        return list;
    }
}
