export default function CV() {
  return(
    <main className="cv page-shell">
      <div className="page-heading">
        <p className="eyebrow">Curriculum Vitae</p>
        <h1>CV</h1>
        <p>Updated July 2026</p>
      </div>
      <div className="cvItems">
        <a className="button-link" href='/Daryl-Larsen-CV-2026.pdf' download>
          Download CV (PDF)
        </a>
        <iframe src='/Daryl-Larsen-CV-2026.pdf' title="Daryl Larsen curriculum vitae"></iframe>
      </div>
    </main>
  )
}
