import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

import { useEffect, useState } from "react";
import CenteredLoader from "components/loader/centered";
import useUserStore from "data/user_store";

export default function Home() {
  const userStore = useUserStore();
  const router = useRouter();
  const auth = getAuth();
  if (userStore.userUID) router.push("/portfolio");
  return <CenteredLoader />;
}
