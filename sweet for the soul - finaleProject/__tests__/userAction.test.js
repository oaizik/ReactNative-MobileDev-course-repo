import { setUser } from '../redux/actions/userActions';
import { SET_USER } from '../redux/actions/types';

describe('user actions tests', function () {
    test('set user action', function () {
      const action = setUser({
        _id: '123',
        name: 'Mitzi aizik',
        email: 'mitzi@mail.com',
        password: '1234',
        phone: '0505888999',
        address: 'kibuts Hoquq',
        numOfDeliverys: 15
      });
      
      expect(action).toHaveProperty('type', SET_USER);
  
      expect(action.payload).toHaveProperty('_id', '123');
      expect(action.payload).toHaveProperty('name', 'Mitzi aizik');
      expect(action.payload).toHaveProperty('email', 'mitzi@mail.com');
      expect(action.payload).toHaveProperty('password', '1234');
      expect(action.payload).toHaveProperty('phone', '0505888999');
      expect(action.payload).toHaveProperty('address', 'kibuts Hoquq');
      expect(action.payload).toHaveProperty('numOfDeliverys', 15);

    });
  });