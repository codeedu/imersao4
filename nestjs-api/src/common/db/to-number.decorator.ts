import { addAttributeOptions } from 'sequelize-typescript';

export function ToNumber(target: any, propertyKey: string): any {
  addAttributeOptions(target, propertyKey, {
    get(): any {
      return +this.getDataValue(propertyKey);
    },
  });
}
