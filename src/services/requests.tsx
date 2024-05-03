import axios from 'axios';

export async function signIn({ username, password }: { username: string; password: string }): Promise<any> {
  axios
    .post(process.env.REACT_APP_API_URL + 'api/user/signin', {
      user_name: username,
      user_password: password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
