import { IColumnData, ITask } from 'interfaces/interface';
import { default as sortByOrder } from './sortByOrder';

const getMaxOrder = <T extends Array<ITask | IColumnData>>(arg: T): number | undefined => {
  if (!arg.length) {
    return;
  }

  if (arg.length === 1) {
    return arg[0].order;
  }

  const sortedArg = sortByOrder(arg);
  return sortedArg[sortedArg.length - 1].order;
};
export default getMaxOrder;
