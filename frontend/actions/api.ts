import axios from "axios";
interface IPost {
  id: number;
  type: string;
  amount: number;
  userID: string;
  isRemoved: boolean;
}
const UpdateUserSpent = async (post: IPost) => {

  console.log(process.env);
  await axios
    .post(
      process.env.BACKEND_API_URL +
        "/user/modifyUserSpent",
      post
    )
    .catch((err) => {
      console.log(err);
    });
};

export { UpdateUserSpent };
