import userReducer from '../redux/reducers/userReducer';
import { SET_USER } from '../redux/actions/types';

describe('user reducer tests', function () {
  test('has initial state', function () {
    const state = userReducer(undefined, {});
    expect(state).toHaveProperty('user', {});
  });

  test('adds item to user', function () {
    const expectedUserItem = { 
      _id: '123', 
      name: 'Mitzi aizik', 
      email: 'mitzi@mail.com',
      password: '1234',
      phone: '0505888999',
      address: 'kibuts Hoquq',
      numOfDeliverys: 15 
    };

    const state = userReducer(undefined, {
      type: SET_USER,
      payload: expectedUserItem
    });

    expect(state.user).toBeInstanceOf(Object);
    expect(state.user).toBeDefined();
    expect(state.user).toEqual(expectedUserItem);
  });

});