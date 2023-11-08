export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { 'x-access-token': user.token };
  }
  return;
}
