import { useEffect, useState } from "react";

const API_MOCKAROO = "https://my.api.mockaroo.com/user";
const MACKAROO_KEY = "a3bc5410";
const MY_API = "http://192.168.171.44:5500/src/utils/MOCK_USER.json";

export interface User {
  usr_id: number;
  usr_user: string;
  usr_pass: string;
  usr_role: number;
  usr_profile: number;
  usr_vip: boolean;
}

// interface ProductRepo {
//   products: Product[];
// }

const useUserRepositories = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [user, setuser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      //   const params = new URLSearchParams({
      //     id: `${props.id}`,
      //     isuser: `${props.isuser}`
      //   });

      //   const response = await globalThis.fetch(
      //     `${API_MOCKAROO}?${params.toString()}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "X-API-Key": `${MACKAROO_KEY}`,
      //       },
      //     },
      //   );
      const response = await globalThis.fetch(MY_API);
      const json: User[] = await response.json();
      const data = json.find((item: User) => item.usr_id == props);
      setuser(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading };
};

export default useUserRepositories;
