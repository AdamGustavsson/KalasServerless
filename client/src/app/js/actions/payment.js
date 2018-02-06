import { PAY_FOR_THEME } from './constants';

export function payForTheme() {
    localStorage.setItem("isThemePaidFor", true);
  return {
    type: PAY_FOR_THEME
  }
}
