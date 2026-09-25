const courses = [
  {
    code: 'COMM 306',
    name: 'Urban Land Economics',
    detail: 'Undergraduate, Winter 2023, 2024, 2025',
  },
  {
    code: 'COMM 407',
    name: 'Real Estate Economics',
    detail: 'Undergraduate, Winter 2023, 2024, 2025',
  },
  {
    code: 'BAPA 550',
    name: 'Managerial Economics',
    detail: 'MBA, Fall 2024, 2025, 2026, Summer 2025',
  },
  {
    code: 'COMM 405',
    name: 'Real Estate Finance',
    detail: 'Undergraduate, Fall 2023',
  },
  {
    code: 'BASM 516',
    name: 'Economics and Strategy of Innovation',
    detail: 'MBA, Winter 2025',
  },
];

export default function Teaching() {
  return (
    <section className="teaching section-shell content-section" id="teaching">
      <h2 className="section-title">Teaching</h2>

      <div className="teaching-group">
        <h3>Instructor — University of British Columbia</h3>
        <div className="course-entry">
          <p><strong>COMM 394: Environment, Society and Government</strong> — Undergraduate, Summer 2026</p>
          <small>Evaluation: 4.6/5.0</small>
        </div>
      </div>

      <div className="teaching-group">
        <h3>Teaching Assistant — University of British Columbia</h3>
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.code}>
              <strong>{course.code}: {course.name}</strong> — {course.detail}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
