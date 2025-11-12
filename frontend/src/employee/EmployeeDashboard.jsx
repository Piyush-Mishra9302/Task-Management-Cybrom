import { useEffect, useState } from "react";
import axios from "axios";
import {
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  LogOut,
  Send,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [changing, setChanging] = useState(false);

  const [reportModal, setReportModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reportText, setReportText] = useState("");
  const [sendingReport, setSendingReport] = useState(false);

  const employeeEmail = localStorage.getItem("employeeemail");
  const employeeName = localStorage.getItem("employeename");

  // ✅ Fetch Tasks
  const fetchTasks = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/get-employee-tasks`;
      const response = await axios.post(api, { email: employeeEmail });

      // Sort by priority order: High > Medium > Low
      const sortedTasks = response.data.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      setTasks(sortedTasks);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeEmail) fetchTasks();
  }, [employeeEmail]);

  // ✅ Change Password Handler
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPass || !newPass || !confirmPass) {
      toast.warn("Please fill all password fields");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      setChanging(true);
      const api = `${import.meta.env.VITE_BACKEND_URL}/employee/change-password`;
      const res = await axios.post(api, {
        email: employeeEmail,
        currentPassword: currentPass,
        newPassword: newPass,
      });

      if (res.status === 200) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setChanging(false);
    }
  };

  // ✅ Logout Handler
  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  // ✅ Send Report Handler
  const handleSendReport = async (e) => {
    e.preventDefault();
    if (!reportText.trim()) {
      toast.warn("Please write a short report before submitting.");
      return;
    }

    try {
      setSendingReport(true);
      const api = `${import.meta.env.VITE_BACKEND_URL}/employee/send-report`;
      await axios.post(api, {
        email: employeeEmail,
        taskId: selectedTask._id,
        report: reportText,
      });
      toast.success("Report sent successfully!");
      setReportModal(false);
      setReportText("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send report");
    } finally {
      setSendingReport(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-2xl p-8 border border-gray-100 relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <ClipboardList className="w-7 h-7 text-blue-600" />
          Welcome, {employeeName || "Employee"}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm shadow transition"
          >
            <Lock className="w-4 h-4" />
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm shadow transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Task Summary */}
      <div className="text-gray-500 font-medium mb-4">
        {tasks.length} Tasks Assigned
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center text-gray-500 flex items-center justify-center gap-2">
          <Loader2 className="animate-spin w-5 h-5" />
          Loading your tasks...
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks assigned yet. Enjoy your day!
        </p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {task.task}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Duration: {task.duration}
                  </p>
                  <p
                    className={`mt-2 inline-flex items-center text-sm px-2 py-1 rounded-md ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Priority: {task.priority}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-400">
                    {new Date(task.assignedAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setReportModal(true);
                    }}
                    className="flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Send className="w-4 h-4" />
                    Send Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b pb-2">
              Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changing}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                >
                  {changing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Submit Report for “{selectedTask?.task}”
            </h3>
            <form onSubmit={handleSendReport} className="space-y-4">
              <textarea
                rows={5}
                placeholder="Write your report or update here..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setReportModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingReport}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                >
                  {sendingReport ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
