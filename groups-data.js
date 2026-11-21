window.CRM = window.CRM || {};

CRM.groupsData = [
  { id: 1, name: 'Frontend Pro',       code: 'FE-24-A', course: 'Frontend Development', teacher: 'Aziz Karimov',      status: 'active',   days: ['Mon','Wed','Fri'], time: '14:00', endTime: '15:30', room: '201', students: 18, capacity: 20, progress: 68, accent: '#6366f1' },
  { id: 2, name: 'Backend Masters',    code: 'BE-24-A', course: 'Backend Development',  teacher: 'Javohir Toshmatov', status: 'active',   days: ['Tue','Thu','Sat'], time: '16:00', endTime: '17:30', room: '305', students: 15, capacity: 18, progress: 55, accent: '#0ea5e9' },
  { id: 3, name: 'UI/UX Fundamentals', code: 'UX-24-B', course: 'UI/UX Design',         teacher: 'Malika Yusupova',   status: 'active',   days: ['Mon','Wed'],       time: '10:00', endTime: '11:30', room: '102', students: 22, capacity: 24, progress: 82, accent: '#f472b6' },
  { id: 4, name: 'Data Science',       code: 'DS-24-A', course: 'Data Science',         teacher: 'Nilufar Rahimova',  status: 'inactive', days: ['Tue','Thu'],       time: '18:00', endTime: '19:30', room: '401', students: 12, capacity: 16, progress: 44, accent: '#a78bfa' },
  { id: 5, name: 'English A2',         code: 'EN-24-A', course: 'English Language',     teacher: 'Sardor Aliyev',     status: 'active',   days: ['Mon','Wed','Fri'], time: '09:00', endTime: '10:30', room: '108', students: 20, capacity: 22, progress: 71, accent: '#34d399' }
];

CRM.groupsMeta = {
  courses: ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Data Science', 'English Language'],
  teachers: ['Aziz Karimov', 'Malika Yusupova', 'Javohir Toshmatov', 'Nilufar Rahimova', 'Sardor Aliyev'],
  timeSlots: [
    '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30',
    '14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30',
    '20:00','20:30','21:00'
  ],
  dayOptions: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
};