import axios from 'axios';
import { APP_API_URL } from './constants';
import { SearchDataType } from '../providers/AppProvider/AppProvider.types';

export type SignInResponse = {
  user_id: string;
  access_token: string;
  token_valid_till: string;
};

export async function signIn({ userid }: { userid: string }): Promise<SignInResponse> {
  return axios
    .post(APP_API_URL + 'api/user/signin', {
      userid,
    })
    .then(function (response) {
      return response.data;
    });
}

export async function sendMessage(id: string, message: string, token: string): Promise<any> {
  return axios
    .post(
      APP_API_URL + `api/conversation/${id}/sendmessage`,
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

export type GetAllConversationsResponse = Array<Conversation>;

export type Conversation = {
  id: string;
  bot: ConversationBot;
};

export type ConversationBot = {
  id: string;
  username: string;
  settings: {
    gender: string;
    age: number;
  };
  profile: {
    bio: string;
  };
  img: string;
};

export async function getAllConversations(userId: string, token: string): Promise<GetAllConversationsResponse> {
  return axios
    .get(APP_API_URL + 'api/conversation/all/' + userId, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      return response.data;
    });
}

export type UserProfileResponse = {
  id: string;
  account: null | {
    gender: string;
    age: number;
    img: string | null;
  };
  username: string;
  search_settings: null | {};
};

export async function getUserProfile(id: string, token: string): Promise<UserProfileResponse> {
  return axios
    .get(APP_API_URL + 'api/user/' + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      return response.data;
    });
}

export type GetBotToAddResponse = {
  id: string;
  bot: ConversationBot;
  messages: [];
};

export async function getBotToAdd(
  userId: string,
  token: string,
  data: SearchDataType
): Promise<GetBotToAddResponse> {
  return axios
    .post(
      APP_API_URL + `api/conversation/pool/${userId}/search`,
      {
        gender: data.gender,
        nation: data.nation,
        // figure: data.figure,
        age_from: data.age_from,
        age_to: data.age_to,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    .then(function (response) {
      return response.data;
    });
}


export async function addUserAccountInfo(
  userId: string,
  token: string,
  gender: string,
  age: number
): Promise<UserProfileResponse['account']> {
  return axios
    .post(
      APP_API_URL + `api/user/account/${userId}/set`,
      {
        gender,
        age,
        img: ''
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(function (response) {
      return response.data;
    });
}

export async function addConversation(
  userId: string,
  token: string,
  conversationId: string
): Promise<GetBotToAddResponse> {
  return axios
    .post(
      APP_API_URL + `api/conversation/pool/${userId}/add/${conversationId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(function (response) {
      return response.data;
    });
}

export async function updateSettings(
  userId: string,
  token: string,
  search_gender: string,
  search_age_from: number,
  search_age_to: number
): Promise<GetBotToAddResponse> {
  return axios
    .post(
      APP_API_URL + `api/user/settings/${userId}/set`,
      {
        search_gender,
        search_age_from,
        search_age_to,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(function (response) {
      return response.data;
    });
}

export async function sendMediaMessage(id: string, token: string): Promise<any> {
  return axios
    .post(
      APP_API_URL + `api/conversation/${id}/sendmediamessage`,
      {
        image: 'string',
        message: 'string',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then(function (response) {
      return response.data;
    });
}
