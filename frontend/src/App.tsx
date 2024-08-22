import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Kanban from "./components/Kanban";

export default function App() {
  return (
    <div>
      <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Kanban Board</div>
        <div>
          <SignedOut>
            <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton
              userProfileUrl="/profile"
              appearance={{
                elements: {
                  userButtonAvatarBox: "rounded-full",
                  userButtonLogoutButton: "hover:bg-gray-700",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
      <div className="p-6">
        <SignedIn>
          <Kanban />
        </SignedIn>
      </div>
    </div>
  );
}
