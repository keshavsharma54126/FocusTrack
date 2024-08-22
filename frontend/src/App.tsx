import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Kanban from "./components/Kanban";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative ">
      <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center shadow-lg fixed z-30 w-screen">
        <div className="text-white font-bold text-2xl tracking-wide">
          Kanban Board
        </div>
        <div>
          <SignedOut>
            <div className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton
              userProfileUrl="/profile"
              appearance={{
                elements: {
                  userButtonAvatarBox: "rounded-full border-2 border-white",
                  userButtonLogoutButton: "hover:bg-gray-700",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>

      <div
        className="relative flex-1 flex items-center justify-center bg-cover bg-center mt-12"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?abstract,workspace')",
        }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-4xl font-extrabold mb-4">
            Welcome to Your Kanban Board
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto">
            Manage your tasks and projects efficiently with our intuitive and
            easy-to-use Kanban board.
          </p>
          <SignedOut>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
              <SignInButton />
            </button>
          </SignedOut>
        </div>
      </div>

      <div id="kanban" className=" flex-1 mb-4">
        <SignedIn>
          <div className="h-full">
            <Kanban />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
