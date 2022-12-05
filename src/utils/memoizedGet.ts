import axios from 'axios';
import { memo } from './memo';

const memoizedGet = async <T>(url: string) => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default memo(memoizedGet);
