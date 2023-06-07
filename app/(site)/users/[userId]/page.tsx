"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const { userId } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/users/${userId}`, {
            params: { userId: userId },
          });          
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserById();
  }, [userId]);

  return <div>{user?.name}</div>;
};

export default Profile;