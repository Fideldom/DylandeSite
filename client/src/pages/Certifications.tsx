// Certificações: prova de autoridade, contexto legível e acesso aos documentos originais.
 
import { Link } from "wouter";
import { ArrowUpRight, Download, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/SiteLayout";
const m = "/media/";
const docs = [
  [
    "01",
    "Certificado de Validação de Sistemas",
    "Nº 489/AGT/2024",
    "Validação do DYLANDE SOFTWARE pela Administração Geral Tributária. Aprovação em 25/08/2024, validade indicada no documento até 01/01/2027.",
    "certificado-validacao.pdf",
  ],
  [
    "02",
    "Certificação de Software para Facturação Electrónica",
    "FE/210/AGT/2026",
    "Certificação do DYLANDE SOFTWARE para facturação electrónica. Documento emitido em 11/04/2026 para a entidade com NIF 5001030655.",
    "certificado-software.pdf",
  ],
];
export default function Certifications() {
  return (
    <div className="inner-page certifications-page">
      <div className="container">
        <PageIntro
          kicker="Certificações e confiança"
          title="Quando o software entra no coração do negócio, a conformidade não é um detalhe."
          text="Apresentamos os documentos originais que sustentam o DYLANDE SOFTWARE, com os dados essenciais legíveis e acesso directo aos PDFs fornecidos."
          variant="outline"
        />
      </div>
      <section className="container cert-intro">
        <ShieldCheck size={28} />
        <div>
          <span className="eyebrow">Autoridade documentada</span>
          <h2>Confiança que se pode verificar.</h2>
          <p>
            Os certificados não são decoração. São a forma mais séria de mostrar
            que o produto foi pensado para uma realidade fiscal e operacional
            concreta.
          </p>
        </div>
      </section>
      <section className="container cert-grid">
        {docs.map(([n, title, number, text, file]) => (
          <article className="cert-card" key={file}>
            <div className="cert-card-top">
              <span>{n}</span>
              <span>AGT · DOCUMENTO ORIGINAL</span>
            </div>
            <div className="cert-preview">
              <div className="cert-seal">
                AGT
                <br />
                <b>✓</b>
              </div>
              <span>{number}</span>
            </div>
            <div className="cert-body">
              <span className="eyebrow">{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <a
                className="text-link"
                href={`${m}${file}`}
                target="_blank"
                rel="noreferrer"
              >
                Abrir documento original <ArrowUpRight size={15} />
              </a>
              <a className="cert-download" href={`${m}${file}`} download>
                <Download size={14} /> Descarregar PDF
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="container cert-cta">
        <h2>Quer perceber como o sistema pode servir a sua operação?</h2>
        <Link href="/contacto" className="button button-primary">
          Falar com a equipa <ArrowUpRight size={16} />
        </Link>
      </section>
    </div>
  );
}
