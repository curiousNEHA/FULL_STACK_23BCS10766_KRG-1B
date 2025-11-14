import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import moment from "moment";

const AnalyticsDashboard = ({ applications }) => {
  // --- Status-based counts for Pie Chart ---
  const counts = applications.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(counts).map((status) => ({
    name: status,
    value: counts[status],
  }));

  const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FF9800", "#9C27B0"];

  // --- Monthly Application Data for Bar Chart ---
  const monthlyData = applications.reduce((acc, job) => {
    const month = moment(job.date).format("MMM YYYY");
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(monthlyData).map((month) => ({
    month,
    applications: monthlyData[month],
  }));

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        📊 Application Analytics
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">No data available</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pie Chart for Status Distribution */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700 text-center">
              Applications by Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Monthly Applications */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-gray-700 text-center">
              Monthly Applications Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#2563eb" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
