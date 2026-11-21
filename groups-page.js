(function (CRM) {
  'use strict';

  const GroupsPage = {
    _inited: false,
    _bound: false,
    _searchTimer: null,

    state: {
      groups: [],
      filterStatus: 'all',
      filterCourse: 'all',
      filterTeacher: 'all',
      search: ''
    },

    init() {
      if (this._inited) return;
      this._inited = true;
      this.state.groups = (CRM.groupsData || []).map(g => ({ ...g }));
      this.render();
      this.bindGlobal();
    },

    refresh() { this.render(); },

    esc(str) {
      return String(str ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[c]));
    },

    initials(name) {
      return (name || '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    },

    statusLabel(s) {
      return CRM.t(s === 'active' ? 'status_active' : 'status_inactive');
    },

    formatDays(days) {
      return (days || []).map(d => CRM.t('day_' + d.toLowerCase())).join(', ');
    },

    calcEndTime(start) {
      if (!start) return '';
      const [h, m] = start.split(':').map(Number);
      const total = h * 60 + m + 90;
      const eh = Math.floor(total / 60) % 24;
      const em = total % 60;
      return String(eh).padStart(2, '0') + ':' + String(em).padStart(2, '0');
    },

    filtered() {
      const { groups, filterStatus, filterCourse, filterTeacher, search } = this.state;
      const q = search.trim().toLowerCase();
      return groups.filter(g => {
        if (filterStatus !== 'all' && g.status !== filterStatus) return false;
        if (filterCourse !== 'all' && g.course !== filterCourse) return false;
        if (filterTeacher !== 'all' && g.teacher !== filterTeacher) return false;
        if (!q) return true;
        return (
          g.name.toLowerCase().includes(q) ||
          g.code.toLowerCase().includes(q) ||
          g.teacher.toLowerCase().includes(q) ||
          g.course.toLowerCase().includes(q)
        );
      });
    },

    stats() {
      const groups = this.state.groups;
      const active = groups.filter(g => g.status === 'active').length;
      return {
        total: groups.length,
        active,
        inactive: groups.length - active,
        students: groups.reduce((s, g) => s + (g.students || 0), 0)
      };
    },

    render() {
      const main = document.getElementById('main-content');
      if (!main) return;

      const s = this.stats();
      const meta = CRM.groupsMeta || { courses: [], teachers: [] };

      main.innerHTML = `
        <section class="groups-intro">
          <div class="groups-intro__text">
            <h1 class="groups-intro__title">${CRM.t('title')}</h1>
            <p class="groups-intro__subtitle">${CRM.t('subtitle')}</p>
          </div>
          <div class="groups-intro__actions">
            <button class="btn-ios btn-ios--primary" type="button" id="add-group-btn">
              <i class="fa-solid fa-plus"></i>
              <span>${CRM.t('new_group')}</span>
            </button>
          </div>
        </section>

        <section class="groups-stats">
          ${this.renderStatItem('stat_total', s.total, 'fa-layer-group', 'is-indigo', 0)}
          ${this.renderStatItem('stat_active', s.active, 'fa-circle-check', 'is-emerald', 1)}
          ${this.renderStatItem('stat_inactive', s.inactive, 'fa-pause-circle', 'is-amber', 2)}
          ${this.renderStatItem('stat_students', s.students, 'fa-users', 'is-sky', 3)}
        </section>

        <section class="groups-toolbar lg-glass" role="toolbar" aria-label="Filters">
          <div class="groups-toolbar__search">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input type="search" id="group-search" placeholder="${CRM.t('search_ph')}" value="${this.esc(this.state.search)}" autocomplete="off">
          </div>
          <div class="filter-group">
            <select id="filter-course" class="filter-select" aria-label="${CRM.t('filter_course')}">
              <option value="all">${CRM.t('filter_course')}</option>
              ${meta.courses.map(c => `<option value="${c}" ${this.state.filterCourse === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
            <select id="filter-teacher" class="filter-select" aria-label="${CRM.t('filter_teacher')}">
              <option value="all">${CRM.t('filter_teacher')}</option>
              ${meta.teachers.map(t => `<option value="${t}" ${this.state.filterTeacher === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="filter-chips" role="tablist" aria-label="Status filter">
            ${['all', 'active', 'inactive'].map(st => `
              <button type="button" class="filter-chip ${this.state.filterStatus === st ? 'is-active' : ''}"
                      data-status="${st}" role="tab" aria-selected="${this.state.filterStatus === st}">
                ${CRM.t('filter_' + st)}
              </button>
            `).join('')}
          </div>
        </section>

        <section id="groups-view" aria-live="polite"></section>
      `;

      this.renderGroups();
    },

    renderStatItem(key, value, icon, color, index) {
      return `
        <article class="stat-card lg-glass" style="animation-delay:${index * 60}ms">
          <div class="stat-card__head">
            <div class="stat-card__icon ${color}"><i class="fa-solid ${icon}" aria-hidden="true"></i></div>
            <span class="stat-card__label">${CRM.t(key)}</span>
          </div>
          <div class="stat-card__value">${value}</div>
        </article>
      `;
    },

    renderGroups(skipAnim = false) {
      const container = document.getElementById('groups-view');
      if (!container) return;
      const items = this.filtered();

      if (!items.length) {
        container.innerHTML = `
          <div class="empty-state lg-glass">
            <div class="empty-state__icon"><i class="fa-regular fa-folder-open" aria-hidden="true"></i></div>
            <h3 class="empty-state__title">${CRM.t('empty_title')}</h3>
            <p class="empty-state__desc">${CRM.t('empty_sub')}</p>
            <button type="button" class="btn-ios btn-ios--ghost" data-empty-reset>
              <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>
              <span>${CRM.t('filter_all')}</span>
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="groups-grid ${skipAnim ? 'no-anim' : ''}">
          ${items.map((g, i) => this.renderCard(g, i)).join('')}
        </div>
      `;
    },

    renderCard(g, i) {
      const timeText = g.endTime ? `${g.time}–${g.endTime}` : g.time;
      return `
        <article class="group-card lg-glass" style="--accent:${g.accent}; animation-delay:${i * 45}ms" data-id="${g.id}" tabindex="0">
          <header class="group-card__head">
            <div class="group-card__title-block">
              <h3 class="group-card__title">${this.esc(g.name)}</h3>
              <span class="group-card__code">${this.esc(g.code)}</span>
            </div>
            <span class="status-badge is-${g.status}">
              <span class="status-badge__dot"></span>
              ${this.statusLabel(g.status)}
            </span>
          </header>

          <div class="group-card__meta">
            <div class="meta-item"><i class="fa-solid fa-book-open" aria-hidden="true"></i> <span>${this.esc(g.course)}</span></div>
            <div class="meta-item"><i class="fa-solid fa-user" aria-hidden="true"></i> <span>${this.esc(g.teacher)}</span></div>
            <div class="meta-item"><i class="fa-regular fa-clock" aria-hidden="true"></i> <span>${timeText} · ${this.formatDays(g.days)}</span></div>
            <div class="meta-item"><i class="fa-solid fa-door-open" aria-hidden="true"></i> <span>${CRM.t('room_label')} ${g.room}</span></div>
          </div>

          <div class="progress-block">
            <div class="progress-head">
              <span>${CRM.t('progress_label')}</span>
              <span class="progress-value">${g.progress}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="--progress:${g.progress}%"></div>
            </div>
          </div>

          <footer class="group-card__foot">
            <div class="group-card__teacher">
              <span class="avatar-mini">${this.initials(g.teacher)}</span>
              <span class="students-count">
                <i class="fa-solid fa-users" aria-hidden="true"></i>
                <strong>${g.students}</strong><span class="sep">/</span>${g.capacity}
              </span>
            </div>
            <div class="card-actions">
              <button type="button" class="card-action" data-act="edit" aria-label="Edit">
                <i class="fa-solid fa-pen" aria-hidden="true"></i>
              </button>
              <button type="button" class="card-action card-action--danger" data-act="delete" aria-label="Delete">
                <i class="fa-solid fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </footer>
        </article>
      `;
    },

    bindGlobal() {
      if (this._bound) return;
      this._bound = true;

      document.addEventListener('click', (e) => {
        if (e.target.closest('#add-group-btn') || e.target.closest('#fab-add-group')) {
          e.preventDefault();
          this.openFormModal();
          return;
        }
        if (e.target.closest('[data-empty-reset]')) {
          this.resetFilters();
        }
      });

      const main = document.getElementById('main-content');
      if (!main) return;

      main.addEventListener('input', (e) => {
        if (e.target.id === 'group-search') {
          clearTimeout(this._searchTimer);
          const val = e.target.value;
          this._searchTimer = setTimeout(() => {
            this.state.search = val;
            this.renderGroups(true);
          }, 150);
        }
      });

      main.addEventListener('change', (e) => {
        if (e.target.id === 'filter-course') { this.state.filterCourse = e.target.value; this.renderGroups(); }
        if (e.target.id === 'filter-teacher') { this.state.filterTeacher = e.target.value; this.renderGroups(); }
      });

      main.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (chip) {
          this.state.filterStatus = chip.dataset.status;
          main.querySelectorAll('.filter-chip').forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-active', on);
            c.setAttribute('aria-selected', String(on));
          });
          this.renderGroups();
        }
      });

      main.addEventListener('click', (e) => {
        const actBtn = e.target.closest('[data-act]');
        if (!actBtn) return;
        e.stopPropagation();
        const card = actBtn.closest('[data-id]');
        if (!card) return;
        const id = Number(card.dataset.id);
        if (actBtn.dataset.act === 'edit') this.openFormModal(id);
        if (actBtn.dataset.act === 'delete') this.confirmDelete(id);
      });

      main.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        if (e.target.closest('button')) return;
        const card = e.target.closest('.group-card[data-id]');
        if (!card) return;
        e.preventDefault();
        this.openFormModal(Number(card.dataset.id));
      });
    },

    resetFilters() {
      this.state.filterStatus = 'all';
      this.state.filterCourse = 'all';
      this.state.filterTeacher = 'all';
      this.state.search = '';
      this.render();
    },

    openFormModal(id) {
      const group = id ? this.state.groups.find(g => g.id === id) : null;
      const isEdit = !!group;
      const meta = CRM.groupsMeta || { courses: [], teachers: [], timeSlots: [] };
      const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const allSlots = meta.timeSlots || ['09:00', '10:00', '14:00', '16:00', '18:00'];

      const dialog = document.createElement('dialog');
      dialog.className = 'lg-modal';
      const titleId = 'modal-title-' + Date.now();
      dialog.setAttribute('aria-labelledby', titleId);

      const currentDays = group?.days || [];
      const defaultEnd = group?.endTime || this.calcEndTime(group?.time) || '';

      dialog.innerHTML = `
        <form id="group-form" novalidate>
          <div class="modal-head">
            <h2 class="modal-title" id="${titleId}">${isEdit ? CRM.t('form_edit') : CRM.t('form_new')}</h2>
            <button type="button" class="modal-close" data-close aria-label="Close">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-field full">
                <label for="f-name">${CRM.t('form_name')}</label>
                <input id="f-name" name="name" value="${this.esc(group?.name || '')}" required autocomplete="off">
              </div>
              <div class="form-field">
                <label for="f-code">${CRM.t('form_code')}</label>
                <input id="f-code" name="code" value="${this.esc(group?.code || '')}" required autocomplete="off">
              </div>
              <div class="form-field">
                <label for="f-room">${CRM.t('form_room')}</label>
                <input id="f-room" name="room" value="${this.esc(group?.room || '')}" required autocomplete="off">
              </div>
              <div class="form-field full">
                <label for="f-course">${CRM.t('form_course')}</label>
                <select id="f-course" name="course" required>
                  <option value="">${CRM.t('form_select')}</option>
                  ${meta.courses.map(c => `<option ${group?.course === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div class="form-field full">
                <label for="f-teacher">${CRM.t('form_teacher')}</label>
                <select id="f-teacher" name="teacher" required>
                  <option value="">${CRM.t('form_select')}</option>
                  ${meta.teachers.map(t => `<option ${group?.teacher === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
              </div>
              <div class="form-field">
                <label for="f-time-start">${CRM.t('form_time_start')}</label>
                <select id="f-time-start" name="time" required>
                  <option value="">${CRM.t('form_select')}</option>
                  ${allSlots.map(t => `<option ${group?.time === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
              </div>
              <div class="form-field">
                <label for="f-time-end">${CRM.t('form_time_end')}</label>
                <select id="f-time-end" name="endTime" required>
                  <option value="">${CRM.t('form_select')}</option>
                  ${allSlots.map(t => `<option ${defaultEnd === t ? 'selected' : ''}>${t}</option>`).join('')}
                </select>
              </div>
              <div class="form-field full">
                <label>${CRM.t('form_days')}</label>
                <div class="day-picker" role="group" aria-label="Days">
                  ${allDays.map(d => `
                    <button type="button" class="day-btn ${currentDays.includes(d) ? 'is-selected' : ''}"
                            data-day="${d}" role="checkbox" aria-checked="${currentDays.includes(d)}">
                      ${CRM.t('day_' + d.toLowerCase())}
                    </button>
                  `).join('')}
                </div>
              </div>
              <div class="form-field">
                <label for="f-students">${CRM.t('form_students')}</label>
                <input id="f-students" name="students" type="number" min="0" value="${group?.students ?? 0}" required>
              </div>
              <div class="form-field">
                <label for="f-capacity">${CRM.t('form_capacity')}</label>
                <input id="f-capacity" name="capacity" type="number" min="1" value="${group?.capacity ?? 20}" required>
              </div>
              ${isEdit ? `
              <div class="form-field full">
                <label for="f-status">${CRM.t('form_status')}</label>
                <select id="f-status" name="status">
                  <option value="active" ${group?.status === 'active' ? 'selected' : ''}>${CRM.t('status_active')}</option>
                  <option value="inactive" ${group?.status === 'inactive' ? 'selected' : ''}>${CRM.t('status_inactive')}</option>
                </select>
              </div>` : ''}
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn-ios btn-ios--ghost" data-close>${CRM.t('form_cancel')}</button>
            <button type="submit" class="btn-ios btn-ios--primary">${isEdit ? CRM.t('form_save') : CRM.t('form_create')}</button>
          </div>
        </form>
      `;

      document.getElementById('modal-root').appendChild(dialog);
      const close = () => { dialog.close(); setTimeout(() => dialog.remove(), 280); };

      dialog.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
      dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });

      // Day picker toggles
      dialog.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.classList.toggle('is-selected');
          btn.setAttribute('aria-checked', String(btn.classList.contains('is-selected')));
        });
      });

      dialog.querySelector('#group-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const selectedDays = Array.from(dialog.querySelectorAll('.day-btn.is-selected')).map(b => b.dataset.day);

        const data = {
          name: String(fd.get('name') || '').trim(),
          code: String(fd.get('code') || '').trim(),
          course: String(fd.get('course') || '').trim(),
          teacher: String(fd.get('teacher') || '').trim(),
          time: String(fd.get('time') || '').trim(),
          endTime: String(fd.get('endTime') || '').trim(),
          days: selectedDays,
          room: String(fd.get('room') || '').trim(),
          students: Number(fd.get('students')) || 0,
          capacity: Number(fd.get('capacity')) || 1,
          status: isEdit ? String(fd.get('status') || 'active') : 'active'
        };

        if (!data.name || !data.code || !data.course || !data.teacher || !data.time || !data.endTime || !data.room) {
          CRM.showToast('toast_validation', 'error'); return;
        }
        if (!data.days.length) {
          CRM.showToast('toast_days_required', 'error'); return;
        }
        if (data.endTime <= data.time) {
          CRM.showToast('toast_time_invalid', 'error'); return;
        }
        if (data.capacity < data.students) {
          CRM.showToast('toast_capacity', 'error'); return;
        }
        const dup = this.state.groups.find(g =>
          g.code.toLowerCase() === data.code.toLowerCase() && g.id !== (group?.id)
        );
        if (dup) {
          CRM.showToast('toast_duplicate_code', 'error'); return;
        }

        if (isEdit) {
          Object.assign(group, data);
          CRM.showToast('toast_updated', 'success');
        } else {
          const palette = ['#6366f1','#0ea5e9','#f472b6','#a78bfa','#34d399','#f59e0b','#06b6d4'];
          this.state.groups.unshift({
            id: Date.now(),
            ...data,
            progress: 0,
            accent: palette[this.state.groups.length % palette.length]
          });
          CRM.showToast('toast_created', 'success');
        }
        close();
        this.render();
      });

      dialog.showModal();
      setTimeout(() => {
        const first = dialog.querySelector('input, select');
        if (first) first.focus();
      }, 100);
    },

    confirmDelete(id) {
      const g = this.state.groups.find(x => x.id === id);
      if (!g) return;

      const dialog = document.createElement('dialog');
      dialog.className = 'lg-modal lg-modal--sm';
      dialog.innerHTML = `
        <div class="modal-head">
          <h2 class="modal-title">${CRM.t('delete_title')}</h2>
          <button type="button" class="modal-close" data-close aria-label="Close">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="confirm-delete">
            <div class="confirm-delete__icon">
              <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
            </div>
            <p class="confirm-delete__text">${CRM.t('delete_sub')}</p>
            <div class="confirm-delete__group">
              <strong>${this.esc(g.name)}</strong>
              <span>${this.esc(g.code)}</span>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button type="button" class="btn-ios btn-ios--ghost" data-close>${CRM.t('form_cancel')}</button>
          <button type="button" class="btn-ios btn-ios--danger" id="confirm-del">${CRM.t('delete_btn')}</button>
        </div>
      `;

      document.getElementById('modal-root').appendChild(dialog);
      const close = () => { dialog.close(); setTimeout(() => dialog.remove(), 280); };

      dialog.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
      dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); });

      dialog.querySelector('#confirm-del').addEventListener('click', () => {
        this.state.groups = this.state.groups.filter(x => x.id !== id);
        CRM.showToast('toast_deleted', 'success');
        close();
        this.render();
      });

      dialog.showModal();
    }
  };

  CRM.groupsPage = {
    init: () => GroupsPage.init(),
    refresh: () => GroupsPage.refresh()
  };

  function boot() {
    if (document.body && document.body.dataset.page === 'groups' && CRM.t) {
      GroupsPage.init();
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window.CRM = window.CRM || {});