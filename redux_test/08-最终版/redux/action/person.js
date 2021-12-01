//引入常量
import { ADD_PERSON } from '../constant';

//定义action
export const addPerson = personObj => ({ type: ADD_PERSON, data: personObj });
