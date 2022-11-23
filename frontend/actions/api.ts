import axios from "axios";
interface IPost {
  metaID: number;
  type: string;
  amount: number;
  userID: string;
  isRemoved: boolean;
}

interface IBot {
  userID: string;
  path: string;
  value: any;
}

const UpdateUserSpent = async (post: IPost) => {
  await axios
    .post(
      "https://fast-src-uk6gr.cloud.serverless.com/" + "user/modifyUserSpent",
      post
    )
    .catch((err) => {
      console.log(err);
    });
};

const updateUserBot = async (post: IBot) => {
  await axios
    .post(
      "https://fast-src-uk6gr.cloud.serverless.com/" + "user/updateUserBot",
      post
    )
    .catch((err) => {
      console.log(err);
    });
};

export { UpdateUserSpent, updateUserBot };
