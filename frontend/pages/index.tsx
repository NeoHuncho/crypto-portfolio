import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user?.uid) return router.push("/user/portfolio");
      else return router.push("/user/signup_login");
    });
  });

  if (loading) return <p>Loading...</p>;
}
