import axios from "axios";
import { useState } from "react";
import { User, Mail, Briefcase, Send, CheckCircle2, AlertCircle } from "lucide-react";

const CreateUser = () => {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success or error

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/usercreate`;
      const response = await axios.post(api, input);
      console.log(response.data);
      setStatus("success");
      setInput({});
    } catch (error) {
      setStatus("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gradient-to-br from-white to-blue-50 shadow-md rounded-2xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-lg">
      {/* header */}
      <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2 border-b border-blue-100 pb-3">
        <User className="text-blue-600 w-7 h-7" />
        Create New User
      </h2>

      {/* Status Message */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 mb-4 bg-green-50 border border-green-200 rounded-lg p-2">
          <CheckCircle2 className="w-5 h-5" />
          User created successfully!
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 mb-4 bg-red-50 border border-red-200 rounded-lg p-2">
          <AlertCircle className="w-5 h-5" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Employee Name
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <User className="text-gray-400 mr-2 w-5 h-5" />
            <input
              type="text"
              name="empname"
              value={input.empname || ""}
              onChange={handleInput}
              placeholder="Enter employee name"
              required
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Employee Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Employee Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Mail className="text-gray-400 mr-2 w-5 h-5" />
            <input
              type="email"
              name="empemail"
              value={input.empemail || ""}
              onChange={handleInput}
              placeholder="Enter employee email"
              required
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Designation
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Briefcase className="text-gray-400 mr-2 w-5 h-5" />
            <select
              name="designation"
              value={input.designation || ""}
              onChange={handleInput}
              required
              className="w-full bg-transparent outline-none text-gray-700"
            >
              <option value="">Select designation</option>
              <option value="Programmer">Programmer</option>
              <option value="Tester">Tester</option>
              <option value="Designer">Designer</option>
              <option value="DB Designer">Database Designer</option>
              <option value="Analyst">Analyst</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
