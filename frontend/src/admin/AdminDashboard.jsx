import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div>
            <span className="font-medium text-gray-800">
              {localStorage.getItem("adminname")}
            </span>{" "}
            | {localStorage.getItem("adminemail")}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
      
        <aside className="w-64 bg-white shadow-md p-5 hidden sm:block">
          <nav className="flex flex-col gap-3">
            <Link
              to="create-user"
              className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all font-medium"
            >
              ➕ Create User
            </Link>
            <Link
              to="manage-users"
              className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all font-medium"
            >
              👥 Manage Users
            </Link>
            <Link
              to="reports"
              className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all font-medium"
            >
              📊 Reports
            </Link>
          </nav>
        </aside>

       
       <main className="flex-1 p-6 overflow-auto pb-32">

          <div className="bg-white shadow-sm rounded-xl p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashBoard;
