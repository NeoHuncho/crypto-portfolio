import axios from "axios";
interface IPost {
  metaID: number;
  type: string;
  amount: number;
  userID: string;
  isRemoved: boolean;
}
const UpdateUserSpent = async (post: IPost) => {
  console.log(process.env.STAGING_BACKEND_API_URL);
  await axios
    .post(
      " https://fabulous-build-3pkyv.cloud.serverless.com/" +
        "user/modifyUserSpent",
      post
    )
    .catch((err) => {
      console.log(err);
    });
};

export { UpdateUserSpent };
