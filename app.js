(function () {
  'use strict';
  window.CRM = window.CRM || {};

  CRM.translations = {
    en: {
      workspace: 'Workspace', operations: 'Operations', insights: 'Insights',
      dashboard: 'Dashboard', students: 'Students', groups: 'Groups', courses: 'Courses', lessons: 'Lessons',
      tasks: 'Tasks', payments: 'Payments', notifications: 'Notifications', chat: 'Chat', reports: 'Reports', settings: 'Settings',
      admin: 'Administrator', profile: 'Profile', logout: 'Logout', home: 'Home',
      search_global: 'Search...', search_ph: 'Search groups...',
      notif_new_group: 'New group created',
      nav_dashboard: 'Dashboard', nav_groups: 'Groups', nav_payments: 'Payments', nav_debts: 'Debts', nav_menu: 'Menu',
      title: 'Groups', subtitle: 'Manage all learning groups — schedule, teachers and progress.',
      new_group: 'New Group', export: 'Export',
      stat_total: 'Total Groups', stat_active: 'Active', stat_inactive: 'Inactive', stat_students: 'Students',
      filter_all: 'All', filter_active: 'Active', filter_inactive: 'Inactive',
      filter_course: 'Course', filter_teacher: 'Teacher',
      empty_title: 'No groups found', empty_sub: 'Try adjusting your filters or create a new group.',
      status_active: 'Active', status_inactive: 'Inactive',
      progress_label: 'Progress', room_label: 'Room',
      form_new: 'New Group', form_edit: 'Edit Group',
      form_name: 'Group Name', form_code: 'Code', form_room: 'Room',
      form_course: 'Course', form_teacher: 'Teacher',
      form_time_start: 'Start Time', form_time_end: 'End Time',
      form_days: 'Days', form_students: 'Students', form_capacity: 'Capacity',
      form_status: 'Status', form_select: 'Select...',
      form_cancel: 'Cancel', form_save: 'Save', form_create: 'Create',
      day_mon: 'Mon', day_tue: 'Tue', day_wed: 'Wed', day_thu: 'Thu',
      day_fri: 'Fri', day_sat: 'Sat', day_sun: 'Sun',
      delete_title: 'Delete Group',
      delete_sub: 'Are you sure you want to delete this group? This action cannot be undone.',
      delete_btn: 'Delete',
      toast_error: 'Backend connection error!',
      toast_success: 'Operation completed successfully!',
      toast_created: 'Group created successfully!',
      toast_updated: 'Group updated successfully!',
      toast_deleted: 'Group deleted.',
      toast_validation: 'Please fill in all required fields.',
      toast_capacity: 'Capacity cannot be less than current students.',
      toast_duplicate_code: 'A group with this code already exists.',
      toast_time_invalid: 'End time must be after start time.',
      toast_days_required: 'Please select at least one day.'
    },
    uz: {
      workspace: 'Ish Makanı', operations: 'Operatsiyalar', insights: 'Tahlillar',
      dashboard: 'Asosiy', students: "O'quvchilar", groups: 'Guruhlar', courses: 'Kurslar', lessons: 'Darslar',
      tasks: 'Vazifalar', payments: "To'lovlar", notifications: 'Bildirishnomalar', chat: 'Chat', reports: 'Hisobotlar', settings: 'Sozlamalar',
      admin: 'Administrator', profile: 'Profil', logout: 'Chiqish', home: 'Asosiy',
      search_global: 'Qidirish...', search_ph: 'Guruhlarni qidirish...',
      notif_new_group: 'Yangi guruh yaratildi',
      nav_dashboard: 'Asosiy', nav_groups: 'Guruhlar', nav_payments: "To'lovlar", nav_debts: 'Qarzdorlar', nav_menu: 'Menyu',
      title: 'Guruhlar', subtitle: "Barcha o'quv guruhlarini boshqaring — jadval, o'qituvchilar va jarayon.",
      new_group: 'Yangi Guruh', export: 'Eksport',
      stat_total: 'Jami Guruhlar', stat_active: 'Faol', stat_inactive: 'Nofaol', stat_students: "O'quvchilar",
      filter_all: 'Barchasi', filter_active: 'Faol', filter_inactive: 'Nofaol',
      filter_course: 'Kurs', filter_teacher: "O'qituvchi",
      empty_title: 'Guruhlar topilmadi', empty_sub: "Filtrlarni o'zgartiring yoki yangi guruh yarating.",
      status_active: 'Faol', status_inactive: 'Nofaol',
      progress_label: 'Jarayon', room_label: 'Xona',
      form_new: 'Yangi Guruh', form_edit: 'Guruhni Tahrirlash',
      form_name: 'Guruh Nomi', form_code: 'Kod', form_room: 'Xona',
      form_course: 'Kurs', form_teacher: "O'qituvchi",
      form_time_start: 'Boshlanish vaqti', form_time_end: 'Tugash vaqti',
      form_days: 'Kunlar', form_students: "O'quvchilar", form_capacity: "Sig'im",
      form_status: 'Holat', form_select: 'Tanlang...',
      form_cancel: 'Bekor qilish', form_save: 'Saqlash', form_create: 'Yaratish',
      day_mon: 'Dush', day_tue: 'Sesh', day_wed: 'Chor', day_thu: 'Pay',
      day_fri: 'Jum', day_sat: 'Shan', day_sun: 'Yak',
      delete_title: "Guruhni O'chirish",
      delete_sub: "Haqiqatan ham bu guruhni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.",
      delete_btn: "O'chirish",
      toast_error: "Backendga ulanishda xatolik!",
      toast_success: "Amaliyot muvaffaqiyatli yakunlandi!",
      toast_created: 'Guruh muvaffaqiyatli yaratildi!',
      toast_updated: 'Guruh muvaffaqiyatli yangilandi!',
      toast_deleted: "Guruh o'chirildi.",
      toast_validation: "Iltimos, barcha majburiy maydonlarni to'ldiring.",
      toast_capacity: "Sig'im o'quvchilar sonidan kam bo'lishi mumkin emas.",
      toast_duplicate_code: 'Bu kod bilan guruh allaqachon mavjud.',
      toast_time_invalid: "Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak.",
      toast_days_required: 'Iltimos, kamida bitta kun tanlang.'
    },
    ru: {
      workspace: 'Рабочее пространство', operations: 'Операции', insights: 'Аналитика',
      dashboard: 'Главная', students: 'Студенты', groups: 'Группы', courses: 'Курсы', lessons: 'Уроки',
      tasks: 'Задачи', payments: 'Платежи', notifications: 'Уведомления', chat: 'Чат', reports: 'Отчеты', settings: 'Настройки',
      admin: 'Администратор', profile: 'Профиль', logout: 'Выйти', home: 'Главная',
      search_global: 'Поиск...', search_ph: 'Поиск групп...',
      notif_new_group: 'Создана новая группа',
      nav_dashboard: 'Главная', nav_groups: 'Группы', nav_payments: 'Платежи', nav_debts: 'Долги', nav_menu: 'Меню',
      title: 'Группы', subtitle: 'Управление учебными группами — расписание, учителя и прогресс.',
      new_group: 'Новая Группа', export: 'Экспорт',
      stat_total: 'Всего Групп', stat_active: 'Активные', stat_inactive: 'Неактивные', stat_students: 'Студенты',
      filter_all: 'Все', filter_active: 'Активные', filter_inactive: 'Неактивные',
      filter_course: 'Курс', filter_teacher: 'Учитель',
      empty_title: 'Группы не найдены', empty_sub: 'Измените фильтры или создайте новую группу.',
      status_active: 'Активная', status_inactive: 'Неактивная',
      progress_label: 'Прогресс', room_label: 'Кабинет',
      form_new: 'Новая Группа', form_edit: 'Редактировать Группу',
      form_name: 'Название', form_code: 'Код', form_room: 'Кабинет',
      form_course: 'Курс', form_teacher: 'Учитель',
      form_time_start: 'Начало', form_time_end: 'Конец',
      form_days: 'Дни', form_students: 'Студенты', form_capacity: 'Вместимость',
      form_status: 'Статус', form_select: 'Выбрать...',
      form_cancel: 'Отмена', form_save: 'Сохранить', form_create: 'Создать',
      day_mon: 'Пн', day_tue: 'Вт', day_wed: 'Ср', day_thu: 'Чт',
      day_fri: 'Пт', day_sat: 'Сб', day_sun: 'Вс',
      delete_title: 'Удалить Группу',
      delete_sub: 'Вы уверены? Это действие нельзя отменить.',
      delete_btn: 'Удалить',
      toast_error: 'Ошибка подключения!',
      toast_success: 'Операция завершена!',
      toast_created: 'Группа создана!',
      toast_updated: 'Группа обновлена!',
      toast_deleted: 'Группа удалена.',
      toast_validation: 'Заполните все обязательные поля.',
      toast_capacity: 'Вместимость не может быть меньше студентов.',
      toast_duplicate_code: 'Группа с таким кодом уже существует.',
      toast_time_invalid: 'Время окончания должно быть позже начала.',
      toast_days_required: 'Выберите хотя бы один день.'
    }
  };

  CRM.t = function (key) {
    const lang = localStorage.getItem('lang') || 'en';
    return (CRM.translations[lang] && CRM.translations[lang][key])
      || CRM.translations['en'][key] || key;
  };

  CRM.showToast = function (key, type = 'error') {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = `toast-msg ${type}`;
    el.setAttribute('role', 'alert');
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    el.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span>${CRM.t(key)}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(-16px)';
      setTimeout(() => el.remove(), 300);
    }, 3500);
  };

  CRM.applyTranslation = function () {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = CRM.t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = CRM.t(el.getAttribute('data-i18n-placeholder'));
      if (val) el.placeholder = val;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const icon = themeBtn.querySelector('i');
      if (icon) icon.className = currentTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';

      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.setAttribute('data-bs-theme', next);
        localStorage.setItem('theme', next);
        if (icon) icon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      });
    }

    // 2. Language switcher
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = e.target.closest('[data-lang]').dataset.lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        CRM.applyTranslation();
        if (window.CRM && CRM.groupsPage) CRM.groupsPage.refresh();
      });
    });

    // 3. Mobile sidebar
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const openSidebar = () => {
      if (sidebar) sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.classList.add('is-nav-open');
    };
    const closeSidebar = () => {
      if (sidebar) sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.classList.remove('is-nav-open');
    };

    if (hamburger) hamburger.addEventListener('click', openSidebar);
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // 4. Smooth mobile → desktop cleanup (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('is-open')) {
          sidebar.style.transition = 'none';
          closeSidebar();
          requestAnimationFrame(() => {
            sidebar.style.transition = '';
          });
        }
      }, 120);
    }, { passive: true });

    // 5. Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        const input =
          document.getElementById('global-search-input') ||
          document.getElementById('group-search');
        if (input) {
          e.preventDefault();
          input.focus();
          if (input.select) input.select();
        }
      }
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('is-open')) {
        closeSidebar();
      }
    });

    // 6. Initial translation
    CRM.applyTranslation();

    // 7. Init groups page
    if (document.body.dataset.page === 'groups' && window.CRM && CRM.groupsPage) {
      CRM.groupsPage.init();
    }
  });
})();