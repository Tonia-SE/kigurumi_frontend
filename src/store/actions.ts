import { showAlert } from './messageReducer';

export function toggleNavbarDropdownMenu() {
  const menu = document.getElementById('navbarSupportedContent');
  const auth = document.getElementById('navbarSupportedRegForms');
  if (auth.classList.toString().includes('show')) {
    auth.classList.toggle('show');
  }
  if (menu.classList.toString().includes('show')) {
    menu.classList.toggle('show');
  }
}

export function proceedToCheckout(lang: string) {
  if (lang === 'eng') {
    return showAlert('Log in first, please', 'my-danger', 'order-message');
  }
  return showAlert('Войдите в личный кабинет', 'my-danger', 'order-message');
}

export function sumOfArray(arr: Array<number>) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
