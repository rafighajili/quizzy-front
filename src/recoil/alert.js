import { atom } from 'recoil';

export const alertState = atom({
  key: 'alertState',
  default: { type: true, message: '' },
});
