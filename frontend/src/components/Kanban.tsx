import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import MainComponent from "./MainComponent";

const Kanban = () => {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (isLoaded && user) {
      synchronizeUser();
    }
  }, [user, isLoaded]);

  const synchronizeUser = async () => {
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        email: user?.emailAddresses[0].emailAddress,
        name: user?.fullName,
        googleId: user?.externalId,
        imageUrl: user?.imageUrl,
      });

      setUserId(res.data.id);
    } catch (e) {
      console.log("error while fetching user from clerk");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">Tasks</h1>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-6">
          <MainComponent userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Kanban;
