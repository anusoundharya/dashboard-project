import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Predefined Mock Data (Fallback Source)
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

function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  
  // Data States
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Axios Fetch with Try-Catch Fallback Requirement
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Intentionally using an invalid URL as required by assignment
        await axios.get('https://api.invalid-student-endpoint.com/data');
      } catch (error) {
        console.log("API Failed gracefully. Fetching predefined mock JSON data instead.");
        // Catch block safely loads predefined constants
        setStudents(MOCK_STUDENTS);
        setCourses(MOCK_COURSES);
        setNotifications(MOCK_NOTIFICATIONS);
      } finally {
        // Stop loading state
        setTimeout(() => setLoading(false), 500); // 0.5s smooth transition delay
      }
    };
    fetchData();
  }, []);

  // 3. Advanced Search Filtering Logic
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      backgroundColor: darkMode ? '#1e1e24' : '#f4f6f9',
      color: darkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      
      {/* HEADER NAVBAR */}
      <header style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '15px 30px', 
        backgroundColor: darkMode ? '#111115' : '#0056b3', 
        color: '#fff',
        alignItems: 'center'
      }}>
        <h2>🎓 Student Dashboard Project</h2>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px 15px', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            border: 'none',
            fontWeight: 'bold',
            backgroundColor: darkMode ? '#fff' : '#222',
            color: darkMode ? '#222' : '#fff'
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* NAVIGATION TABS (6 Mandatory Pages) */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '15px', backgroundColor: '#e9ecef' }}>
        {['dashboard', 'student-list', 'student-profile', 'courses', 'attendance', 'notifications'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              backgroundColor: activeTab === tab ? '#0056b3' : '#fff',
              color: activeTab === tab ? '#fff' : '#333',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </nav>

      {/* MAIN LAYOUT WINDOW */}
      <main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', fontSize: '20px', padding: '5px' }}>
            🔄 Loading data from server, please wait...
          </div>
        ) : (
          <div>
            
            {/* PAGE 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <h3>Dashboard Summary</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                  <div style={{ flex: 1, padding: '20px', background: darkMode ? '#2d2d35' : '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4>Total Students</h4>
                    <p style={{ fontSize: '28px', color: '#0056b3', fontWeight: 'bold' }}>{students.length}</p>
                  </div>
                  <div style={{ flex: 1, padding: '20px', background: darkMode ? '#2d2d35' : '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4>Active Batches</h4>
                    <p style={{ fontSize: '28px', color: '#28a745', fontWeight: 'bold' }}>{courses.length}</p>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: STUDENT LIST (WITH ADVANCED FILTER) */}
            {activeTab === 'student-list' && (
              <div>
                <h3>Student Directory</h3>
                <input 
                  type="text" 
                  placeholder="🔍 Search student by name or ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%', padding: '12px', margin: '15px 0', borderRadius: '5px',
                    border: '1px solid #ccc', boxSizing: 'border-box'
                  }}
                />
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
                      <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>No students found matching your search.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGE 3: STUDENT PROFILE */}
            {activeTab === 'student-profile' && (
              <div>
                <h3>My Profile View</h3>
                <div style={{ display: 'flex', gap: '20px', marginTop: '15px', background: darkMode ? '#2d2d35' : '#fff', padding: '20px', borderRadius: '8px' }}>
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

            {/* PAGE 5: ATTENDANCE */}
            {activeTab === 'attendance' && (
              <div>
                <h3>Attendance Track Logs</h3>
                <div style={{ marginTop: '15px' }}>
                  {students.map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: darkMode ? '#2d2d35' : '#fff', marginBottom: '8px', borderRadius: '5px' }}>
                      <span><strong>{s.name}</strong> ({s.id})</span>
                      <span style={{ color: '#0056b3', fontWeight: 'bold' }}>{s.attendance} Present Rate</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGE 6: NOTIFICATIONS WITH SAFE ALERT PANEL */}
            {activeTab === 'notifications' && (
              <div>
                <h3>System Notifications</h3>
                <div style={{ marginTop: '15px' }}>
                  {notifications.map((note, idx) => (
                    <div key={idx} style={{ 
                      padding: '15px', 
                      backgroundColor: idx === 0 ? '#fff3cd' : '#d1ecf1', 
                      color: idx === 0 ? '#856404' : '#0c5460',
                      marginBottom: '10px', 
                      borderRadius: '5px',
                      borderLeft: '5px solid'
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
export default App;