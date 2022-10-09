import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

import { useEffect, useState } from "react";
import CenteredLoader from "components/loader/centered";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) return router.push("/user/portfolio");
      else return router.push("signup_login");
    });
  });

  if (loading) return <CenteredLoader />;
}
