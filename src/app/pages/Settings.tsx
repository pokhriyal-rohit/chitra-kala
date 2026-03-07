import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("firebase_user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d0d14] pt-16 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl" style={{ fontWeight: 700 }}>
              Settings
            </h1>
            <p className="text-gray-400 text-sm">
              Manage account, notifications, and privacy
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  Email Notifications
                </p>
                <p className="text-gray-500 text-sm">
                  Get updates about new challenges and followers
                </p>
              </div>
              <span className="text-gray-400 text-sm">Toggle in backend</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white" style={{ fontWeight: 600 }}>
                  Privacy
                </p>
                <p className="text-gray-500 text-sm">
                  Control who can see your uploads and profile
                </p>
              </div>
              <span className="text-gray-400 text-sm">Coming soon</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-center py-3 rounded-xl bg-white/5 border border-white/10 text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
