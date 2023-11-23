import { useEffect, useState } from "react";

import { Profile } from "~/utils/interface";
import { getProfile } from "~/utils/service";

const useProfile = (props: any) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const data = response.find((item: Profile) => item.prf_id === props);
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [setProfile]);

  return { profile, setProfile };
};

export default useProfile;
