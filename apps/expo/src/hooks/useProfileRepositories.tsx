import { useEffect, useState } from "react";

import useUserRepositories from "./useUserRepositories";

const MY_API = "http://192.168.171.44:5500/src/utils/MOCK_PROF.json";

export interface Profile {
  prf_id: number;
  prf_name: string;
  prf_lastname: string;
  prf_mail: string;
}

const useProfileRepositories = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true); // [1]

  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await globalThis.fetch(MY_API);
      const json: Profile[] = await response.json();
      const data = json?.find((item: Profile) => item.prf_id == props);
      setProfile(data !== undefined ? data : null);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, loading };
};

export default useProfileRepositories;


