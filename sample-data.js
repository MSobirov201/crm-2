(function (CRM) {
  'use strict';

  /* Presentation-only sample data. No backend / API is implied. */

  var kpis = [
    { id: 'students', label: 'Total students', value: 1284, delta: 8.4,
      icon: 'fa-solid fa-user-graduate', tone: 'indigo', hint: 'vs last month' },
    { id: 'groups', label: 'Active groups', value: 47, delta: 3.2,
      icon: 'fa-solid fa-users-rectangle', tone: 'blue', hint: 'vs last month' },
    { id: 'lessons', label: 'Upcoming lessons', value: 26, delta: -1.8,
      icon: 'fa-solid fa-chalkboard-user', tone: 'cyan', hint: 'vs last week' },
    { id: 'revenue', label: 'Revenue (MTD)', value: 24850, delta: 12.6,
      icon: 'fa-solid fa-sack-dollar', tone: 'green', hint: 'vs last month', money: true }
  ];

  var months = ['Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'];

  var series = {
    revenue:     [16200,18400,17100,19800,21300,22900,21600,24100,25400,23800,26100,24850],
    enrollments: [38,44,41,52,58,63,57,71,74,66,79,72],
    attendance:  [88,90,87,91,92,94,93,95,94,92,96,95]
  };

  var recentStudents = [
    { name: 'Aziza Karimova',   group: 'ENG-B2-04',  course: 'English · B2',      status: 'active',  joined: '2026-10-14' },
    { name: 'Bekzod Tursunov',  group: 'MATH-A1-02', course: 'Mathematics · A1',  status: 'active',  joined: '2026-10-13' },
    { name: 'Dilnoza Yusupova', group: 'IELTS-07',   course: 'IELTS Intensive',   status: 'pending', joined: '2026-10-12' },
    { name: 'Eldor Rahimov',    group: 'CS-PY-01',   course: 'Python Basics',     status: 'active',  joined: '2026-10-11' },
    { name: 'Feruza Nazarova',  group: 'ENG-A2-05',  course: 'English · A2',      status: 'paused',  joined: '2026-10-10' },
    { name: 'Gulnora Saidova',  group: 'MATH-B1-01', course: 'Mathematics · B1',  status: 'active',  joined: '2026-10-09' }
  ];

  function atHour(dayOffset, hour, minute) {
    var d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hour, minute || 0, 0, 0);
    return d;
  }

  var upcomingLessons = [
    { title: 'IELTS Writing Task 2',  group: 'IELTS-07',   room: 'Room 204', teacher: 'M. Ismoilov',  start: atHour(0, 15, 30), duration: 90 },
    { title: 'Python — Functions',    group: 'CS-PY-01',   room: 'Lab 2',    teacher: 'S. Qodirov',   start: atHour(0, 18, 0),  duration: 120 },
    { title: 'English Grammar B2',    group: 'ENG-B2-04',  room: 'Room 108', teacher: 'N. Xolmatova', start: atHour(1, 10, 0),  duration: 90 },
    { title: 'Mathematics — Algebra', group: 'MATH-A1-02', room: 'Room 301', teacher: 'R. Yusupov',   start: atHour(1, 14, 0),  duration: 90 },
    { title: 'Speaking Club',         group: 'MIXED',      room: 'Hall A',   teacher: 'D. Karimova',  start: atHour(2, 17, 0),  duration: 60 }
  ];

  var activity = [
    { type: 'enroll',  text: '<b>Aziza Karimova</b> enrolled in <b>English · B2</b>',        time: '2026-10-14T09:12:00' },
    { type: 'payment', text: 'Payment of <b>$180</b> received from <b>Bekzod Tursunov</b>',  time: '2026-10-14T08:40:00' },
    { type: 'lesson',  text: '<b>IELTS Writing</b> lesson completed by group <b>IELTS-07</b>', time: '2026-10-13T18:05:00' },
    { type: 'group',   text: 'New group <b>CS-PY-02</b> was created',                        time: '2026-10-13T14:22:00' },
    { type: 'alert',   text: '<b>Feruza Nazarova</b> attendance dropped below 70%',          time: '2026-10-13T11:00:00' },
    { type: 'payment', text: 'Payment of <b>$220</b> received from <b>Gulnora Saidova</b>',  time: '2026-10-12T16:31:00' },
    { type: 'enroll',  text: '<b>Eldor Rahimov</b> enrolled in <b>Python Basics</b>',        time: '2026-10-11T10:15:00' }
  ];

  CRM.data = {
    kpis: kpis,
    months: months,
    series: series,
    recentStudents: recentStudents,
    upcomingLessons: upcomingLessons,
    activity: activity
  };
})(window.CRM);