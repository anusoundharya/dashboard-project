import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import { 
  mockDashboard, 
  mockStudents, 
  mockProfile, 
  mockCourses, 
  mockAttendance, 
  mockNotifications 
} from './mockData';

// ==========================================
// 1. DASHBOARD VIEW
// ==========================================
function DashboardView() {
  const { data, loading, error } = useFetch('https://api.failed/dashboard', mockDashboard);
  if (loading) return <h3>Loading Dashboard Overview...</h3>;
  return (
    <div>
      <h2>📊 Dashboard Overview</h2>
      {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ {error}</p>}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flex: 1 }}>
          <h3>Total Students</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>{data?.totalStudents}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flex: 1 }}>
          <h3>Average Attendance</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>{data?.averageAttendance}</p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flex: 1 }}>
          <h3>Active Courses</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2980b9' }}>{data?.activeCourses}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. STUDENT LIST VIEW
// ==========================================
function StudentListView() {
  const { data: students, loading, error } = useFetch('https://api.failed/students', mockStudents);
  if (loading) return <h3>Loading Students Directory...</h3>;
  return (
    <div>
      <h2>👥 Student Directory</h2>
      {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ {error}</p>}
      <table border="1" cellPadding="12" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {students?.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td><b>{s.name}</b></td>
              <td>{s.email}</td>
              <td>{s.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 3. STUDENT PROFILE VIEW
// ==========================================
function StudentProfileView() {
  const { data: profile, loading, error } = useFetch('https://api.failed/profile', mockProfile);
  if (loading) return <h3>Loading Profile Details...</h3>;
  return (
    <div>
      <h2>👤 My Profile</h2>
      {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ {error}</p>}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '500px' }}>
        <p><b>Name:</b> {profile?.name}</p>
        <p><b>Age:</b> {profile?.age} Yrs</p>
        <p><b>Current GPA:</b> ✨ {profile?.gpa}</p>
        <p><b>Bio:</b> {profile?.bio}</p>
      </div>
    </div>
  );
}

// ==========================================
// 4. COURSES VIEW
// ==========================================
function CoursesView() {
  const { data: courses, loading, error } = useFetch('https://api.failed/courses', mockCourses);
  if (loading) return <h3>Loading Available Courses...</h3>;
  return (
    <div>
      <h2>📚 Academic Courses</h2>
      {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ {error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {courses?.map(c => (
          <div key={c.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #2980b9' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2980b9' }}>{c.code}</h4>
            <p style={{ margin: 0, fontWeight: 'bold' }}>{c.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. ATTENDANCE VIEW
// ==========================================
function AttendanceView() {
  const { data: attendance, loading, error } = useFetch('https://api.failed/attendance', mockAttendance);
  if (loading) return <h3>Loading Attendance Logs...</h3>;
  return (
    <div>
      <h2>📝 Attendance Tracker</h2>
      {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ {error}</p>}
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {attendance?.map((a, index) => (
          <li key={index} style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span>📅 {a.date}</span>
            <span style={{ fontWeight: 'bold', color: a.status === 'Present' ? '#27ae60' : '#c0392b' }}>{a.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 6. NOTIFICATIONS VIEW
// ==========================================
function NotificationsView() {
  const { data: notifications, loading, error } = useFetch('https://api.failed/notifications', mockNotifications);
  if (loading) return <h3>Loading Updates...</h3>;
  return (
    <div>
      <h2>🔔 Live Announcements</h2>
      {error && <p style={{ color: 'orange', fontWeight: 'bold' }}>⚠️ {error}</p>}
      <div style={{ marginTop: '20px' }}>
        {notifications?.map(n => (
          <div key={n.id} style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '12px', borderRadius: '6px', borderLeft: '5px solid #e74c3c', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <p style={{ margin: 0 }}>{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP CONTENT LAYOUT
// ==========================================
export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        
        {/* SIDEBAR NAVIGATION CONTROL */}
        <nav style={{ width: '260px', backgroundColor: '#2c3e50', padding: '25px 20px', color: 'white' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#ecf0f1', letterSpacing: '1px' }}>🎓 Dashboard</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ margin: '20px 0' }}><Link to="/" style={{ color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', display: 'block' }}>📊 Dashboard</Link></li>
            <li style={{ margin: '20px 0' }}><Link to="/students" style={{ color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', display: 'block' }}>👥 Student List</Link></li>
            <li style={{ margin: '20px 0' }}><Link to="/profile" style={{ color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', display: 'block' }}>👤 Profile</Link></li>
            <li style={{ margin: '20px 0' }}><Link to="/courses" style={{ color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', display: 'block' }}>📚 Courses</Link></li>
            <li style={{ margin: '20px 0' }}><Link to="/attendance" style={{ color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', display: 'block' }}>📝 Attendance</Link></li>
            <li style={{ margin: '20px 0' }}><Link to="/notifications" style={{ color: '#bdc3c7', textDecoration: 'none', fontSize: '16px', display: 'block' }}>🔔 Notifications</Link></li>
          </ul>
        </nav>

        {/* MAIN DISPLAY WINDOW */}
        <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/students" element={<StudentListView />} />
            <Route path="/profile" element={<StudentProfileView />} />
            <Route path="/courses" element={<CoursesView />} />
            <Route path="/attendance" element={<AttendanceView />} />
            <Route path="/notifications" element={<NotificationsView />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}