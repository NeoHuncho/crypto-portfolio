import axios from "axios";
interface IPost {
  metaID: number;
  type: string;
  amount: number;
  userID: string;
  isRemoved: boolean;
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

export { UpdateUserSpent };
