import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Briefcase,
  Mail,
  User,
  ClipboardCheck,
  X,
  Clock,
  Flag,
  FileText,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskData, setTaskData] = useState({
    task: "",
    duration: "",
    priority: "",
  });

  const fetchEmployees = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/allusers`;
      const response = await axios.get(api);
      setEmployees(response.data);
    } catch (error) {
      toast.error("❌ Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAssignClick = (emp) => {
    setSelectedUser(emp);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.task || !taskData.duration || !taskData.priority) {
      toast.warn("⚠️ Please fill all fields before assigning!");
      return;
    }

    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/assign-task/${
        selectedUser._id
      }`;
      await axios.post(api, taskData);
      toast.success(`✅ Task assigned to ${selectedUser.name}`);
      setShowModal(false);
      setTaskData({ task: "", duration: "", priority: "" });
    } catch (error) {
      toast.error("❌ Failed to assign task, please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-2xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-600" />
          Manage Employees
        </h2>
        <span className="text-gray-500 font-medium">
          Total: {employees.length}
        </span>
      </div>

      {/* Loading / Empty / Employee List */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          Loading employees...
        </p>
      ) : employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        <div className="space-y-4">
          {employees.map((emp, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{emp.name}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <Mail className="w-4 h-4 text-gray-400" /> {emp.email}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-gray-400" />{" "}
                    {emp.designation}
                  </p>
                </div>
              </div>

              <button
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => handleAssignClick(emp)}
              >
                <ClipboardCheck className="w-4 h-4" />
                Assign Task
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Task Assign Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 relative border border-gray-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2 border-b border-blue-100 pb-2">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
              Assign Task to {selectedUser?.name}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Task
                </label>
                <input
                  type="text"
                  name="task"
                  value={taskData.task}
                  onChange={handleInputChange}
                  placeholder="Enter task details"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={taskData.duration}
                  onChange={handleInputChange}
                  placeholder="Enter duration (e.g. 2 days)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 flex items-center gap-1">
                  <Flag className="w-4 h-4 text-gray-500" />
                  Priority
                </label>
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
