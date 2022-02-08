export default function CV() {
  return(
    <div className="cv">
      <h2>Curriculum Vitae</h2>
      <div className="cvItems">
        <button><a href='../../CV.pdf' download>Download</a></button>
        <iframe src='../../CV.pdf' width="60%" height="1000px"></iframe>
      </div>
    </div>
  )
}