import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Predefined Mock Data Source
const MOCK_STUDENTS = [
  { id: "S101", name: "Anu Soundharya", course: "React JS", attendance: "95%", status: "Active" },
  { id: "S102", name: "Rahul Kumar", course: "Node JS", attendance: "88%", status: "Active" },
  { id: "S103", name: "Priya Dharshini", course: "Python", attendance: "92%", status: "Inactive" },
  { id: "S104", name: "Vijay Sethu", course: "UI/UX Design", attendance: "79%", status: "Active" }
];

const MOCK_COURSES = ["React JS Fullstack", "Node JS Backend", "Python Data Science", "UI/UX Advanced"];
const MOCK_NOTIFICATIONS = [
  "System Alert: API server failed! Safely loaded offline mock database data.",
  "Reminder: React assignment deadline is tomorrow end of day."
];

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  
  // Data States
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // EXTRA ADVANCED FEATURE 1: Status Filter State (All / Active / Inactive)
  const [statusFilter, setStatusFilter] = useState("All");

  // Form Inputs State (Add Student Feature)
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCourse, setNewStudentCourse] = useState("React JS");

  // Axios Fetch Fallback Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('https://api.invalid-student-endpoint.com/data');
      } catch (error) {
        console.log("Safe offline fallback data active.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Advanced Search + EXTRA Status Filter Combined Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "All") return matchesSearch;
    return matchesSearch && student.status === statusFilter;
  });

  // EXTRA ADVANCED FEATURE 2: Attendance Analytics Calculations
  const totalStudentsCount = students.length;
  const avgAttendance = totalStudentsCount > 0 
    ? Math.round(students.reduce((acc, s) => acc + parseInt(s.attendance), 0) / totalStudentsCount) 
    : 0;
  const lowAttendanceCount = students.filter(s => parseInt(s.attendance) < 85).length;

  // Dynamic Add Student Function
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return alert("Please enter a student name!");
    
    const nextId = "S" + (100 + students.length + 1);
    const newStudent = {
      id: nextId,
      name: newStudentName,
      course: newStudentCourse,
      attendance: "80%", // Dynamic default test value to test low attendance logic
      status: "Active"
    };

    setStudents([...students, newStudent]);
    setNewStudentName(""); 
    alert("Success! Added to the list.");
  };

  // CSV Report Generator
  const downloadCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Name,Course,Attendance,Status\n";
    students.forEach(s => {
      csvContent += s.id + "," + s.name + "," + s.course + "," + s.attendance + "," + s.status + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Student_Directory_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#1e1e24' : '#f4f6f9',
      color: darkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      
      {/* NAVBAR */}
      <header style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '15px 30px', 
        backgroundColor: darkMode ? '#111115' : '#0056b3', 
        color: '#fff',
        alignItems: 'center'
      }}>
        <h2>🎓 Student Dashboard Project 
          <span style={{ backgroundColor: '#dc3545', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '14px', marginLeft: '10px' }}>
            {notifications.length}
          </span>
        </h2>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', border: 'none',
            fontWeight: 'bold', backgroundColor: darkMode ? '#fff' : '#222', color: darkMode ? '#222' : '#fff'
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* NAVIGATION TABS */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '15px', backgroundColor: '#e9ecef', flexWrap: 'wrap' }}>
        {['dashboard', 'student-list', 'student-profile', 'courses', 'attendance', 'notifications'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              textTransform: 'capitalize', fontWeight: activeTab === tab ? 'bold' : 'normal',
              backgroundColor: activeTab === tab ? '#0056b3' : '#fff', color: activeTab === tab ? '#fff' : '#333',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', fontSize: '20px', padding: '50px' }}>
            🔄 Loading data...
          </div>
        ) : (
          <div>
            
            {/* PAGE 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <h3>Dashboard Summary</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '15px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '250px', padding: '20px', background: darkMode ? '#2d2d35' : '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4>Total Registered Students</h4>
                    <p style={{ fontSize: '28px', color: '#0056b3', fontWeight: 'bold' }}>{students.length}</p>
                  </div>
                  <div style={{ flex: 1, minWidth: '250px', padding: '20px', background: darkMode ? '#2d2d35' : '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4>Active Batches</h4>
                    <p style={{ fontSize: '28px', color: '#28a745', fontWeight: 'bold' }}>{courses.length}</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: STUDENT LIST */}
            {activeTab === 'student-list' && (
              <div>
                <h3>Student Directory</h3>
                
                {/* Add student component form */}
                <form onSubmit={handleAddStudent} style={{ background: darkMode ? '#2d2d35' : '#e9ecef', padding: '15px', borderRadius: '8px', margin: '15px 0', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <strong style={{ minWidth: '130px' }}>➕ Quick Add Student:</strong>
                  <input 
                    type="text" 
                    placeholder="Student Full Name" 
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
                  />
                  <select 
                    value={newStudentCourse} 
                    onChange={(e) => setNewStudentCourse(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="React JS">React JS</option>
                    <option value="Node JS">Node JS</option>
                    <option value="Python">Python</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                  <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
                </form>

                {/* EXTRA ADVANCED FEATURE: Status Filter Toggle Buttons Row */}
                <div style={{ margin: '15px 0', display: 'flex', gap: '10px' }}>
                  {["All", "Active", "Inactive"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setStatusFilter(type)}
                      style={{
                        padding: '6px 15px', borderRadius: '4px', border: '1px solid #0056b3', cursor: 'pointer',
                        backgroundColor: statusFilter === type ? '#0056b3' : 'transparent',
                        color: statusFilter === type ? '#fff' : '#0056b3',
                        fontWeight: 'bold'
                      }}
                    >
                      {type} Status
                    </button>
                  ))}
                </div>

                {/* Operations strip */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '15px 0', flexWrap: 'wrap' }}>
                  <input 
                    type="text" 
                    placeholder="🔍 Search student by name or ID..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', flex: 1 }}
                  />
                  <button 
                    type="button"
                    onClick={downloadCSVReport}
                    style={{ padding: '12px 18px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    📥 Download CSV Report
                  </button>
                </div>

                {/* Grid Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', background: darkMode ? '#2d2d35' : '#fff' }}>
                  <thead>
                    <tr style={{ background: '#0056b3', color: '#fff', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>ID</th>
                      <th style={{ padding: '12px' }}>Name</th>
                      <th style={{ padding: '12px' }}>Course</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? filteredStudents.map(s => (
                      <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px' }}>{s.id}</td>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{s.name}</td>
                        <td style={{ padding: '12px' }}>{s.course}</td>
                        <td style={{ padding: '12px', color: s.status === 'Active' ? '#28a745' : '#dc3545' }}>{s.status}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>No students match the active status/search filter.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGE 3: STUDENT PROFILE */}
            {activeTab === 'student-profile' && (
              <div>
                <h3>My Profile View</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '15px', background: darkMode ? '#2d2d35' : '#fff', padding: '20px', borderRadius: '8px', flexWrap: 'wrap' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#0056b3', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
                    AS
                  </div>
                  <div>
                    <h4>Anu Soundharya (Individual Intern)</h4>
                    <p style={{ margin: '5px 0' }}><strong>Role:</strong> Frontend React Developer</p>
                    <p style={{ margin: '5px 0' }}><strong>Current Repo Status:</strong> Linked & Deployed Clean</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 4: COURSES */}
            {activeTab === 'courses' && (
              <div>
                <h3>Offered Technical Courses</h3>
                <ul style={{ listStyleType: 'none', padding: 0, marginTop: '15px' }}>
                  {courses.map((course, idx) => (
                    <li key={idx} style={{ padding: '15px', background: darkMode ? '#2d2d35' : '#fff', marginBottom: '10px', borderRadius: '5px', borderLeft: '5px solid #0056b3' }}>
                      🚀 {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PAGE 5: ATTENDANCE (WITH EXTRA ANALYTICS CARDS ROW) */}
            {activeTab === 'attendance' && (
              <div>
                <h3>Attendance Track Logs</h3>

                {/* EXTRA ADVANCED FEATURE: Attendance Analytics Ribbon Dashboard */}
                <div style={{ display: 'flex', gap: '15px', margin: '15px 0', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, padding: '15px', background: '#e3f2fd', color: '#0d47a1', borderRadius: '6px', fontWeight: 'bold' }}>
                    📊 Avg Attendance Rate: {avgAttendance}%
                  </div>
                  <div style={{ flex: 1, padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '6px', fontWeight: 'bold' }}>
                    🚨 Low Attendance (&lt;85%): {lowAttendanceCount} Students
                  </div>
                </div>

                <div style={{ marginTop: '15px' }}>
                  {students.map(s => (
                    <div key={s.id} style={{ padding: '15px', background: darkMode ? '#2d2d35' : '#fff', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span><strong>{s.name}</strong> ({s.id})</span>
                        <span style={{ color: parseInt(s.attendance) >= 85 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>{s.attendance}</span>
                      </div>
                      <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px', height: '8px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: s.attendance, 
                          backgroundColor: parseInt(s.attendance) >= 85 ? '#28a745' : '#ffc107', 
                          height: '100%' 
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 6: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div>
                <h3>System Notifications</h3>
                <div style={{ marginTop: '15px' }}>
                  {notifications.map((note, idx) => (
                    <div key={idx} style={{ 
                      padding: '15px', 
                      backgroundColor: idx === 0 ? '#fff3cd' : '#d1ecf1', 
                      color: idx === 0 ? '#856404' : '#0c5460',
                      marginBottom: '10px', borderRadius: '5px', borderLeft: '5px solid'
                    }}>
                      ⚠️ {note}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}