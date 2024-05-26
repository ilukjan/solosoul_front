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

export async function signIn({ username, password }: { username: string; password: string }): Promise<SignInResponse> {
  return axios
    .post(process.env.REACT_APP_API_URL + 'api/user/signin', {
      username,
      password,
    })
    .then(function (response) {
      return response.data;
    });
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
    .get(process.env.REACT_APP_API_URL + 'api/conversation/all/' + userId, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      return response.data;
    });
}

export type UserProfileResponse = {
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
    topics: [
      {
        topic_id: string;
        topic_name: string;
        topic_description: string;
        topic_is_enabled: boolean;
      }
    ];
  };
  img: string;
  subscription: {
    id: string;
    expire_at: string;
  };
};

export async function getUserProfile(id: string, token: string): Promise<UserProfileResponse> {
  return axios
    .get(process.env.REACT_APP_API_URL + 'api/user/' + id, {
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

export async function getBotToAdd(userId: string, token: string): Promise<GetBotToAddResponse> {
  return axios
    .get(process.env.REACT_APP_API_URL + `api/conversation/pool/${userId}/search`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
      process.env.REACT_APP_API_URL + `api/conversation/pool/${userId}/add/${conversationId}`,
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
      process.env.REACT_APP_API_URL + `api/user/settings/${userId}/set`,
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
