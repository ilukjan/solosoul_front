import axios from 'axios';


export type SignInResponse = {
  user_id: string;
  payment_subscription: {
    id: string;
    expire_at: string;
  };
  access_token: string;
  token_valid_till: string;
};

  export type UserResponse = {
  id: string;
  username: string;
  gender: string;
  age: number;
  profile: {
    level: {
      level: string;
      progress: number;
    };
    pretty: {
      progress: number;
    };
    drive: {
      progress: number;
    };
    erudition: {
      progress: number;
    };
    romantic: {
      progress: number;
    };
    horny: {
      progress: number;
    };
  };
  search_settings: {
    search_gender: string;
    search_age_from: number;
    search_age_to: number;
  };
  img: string;
};

export async function signIn({ username, password }: { username: string; password: string }): Promise<SignInResponse> {
  return axios
    .post(process.env.REACT_APP_API_URL + 'api/user/signin', {
      username,
      password,
    })
    .then(function (response) {
      return response.data;
    })
}

export async function sendMessage(id: string, message: string, token: string): Promise<any> {
  return axios
    .post(
      process.env.REACT_APP_API_URL + `api/conversation/${id}/sendmessage`,
      {
        message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(function (response) {
      return response.data;
    });
}


