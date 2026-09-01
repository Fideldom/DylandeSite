/**
 * DYLANDE — Software / Premium Product Experience
 */
import { Link } from "wouter";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Check, Download, Layers3, Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PageIntro } from "@/components/SiteLayout";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const m = "/media/";
const downloadGuide = `${m}dylande-soft-ux-ui.pdf`;
const products = [
  ["Faturação e Stock", "O núcleo", "Facturação electrónica, produtos, clientes, fornecedores, stock e relatórios num fluxo mais controlado.", "IMG-20260901-WA0008.jpg"],
  ["Restauração", "Turnos que fluem", "Pedidos, mesas, produtos e caixa com uma leitura operacional pensada para a realidade da restauração.", "IMG-20260901-WA0009.jpg"],
  ["Hotelaria e Restauração", "Hospitalidade com controlo", "Uma base digital para ligar reservas, serviços, consumos e gestão diária.", "IMG-20260901-WA0010.jpg"],
  ["Lavandaria", "Cada peça importa", "Registo de entrada, estados, clientes e entregas para reduzir perdas e dar visibilidade ao trabalho.", "IMG-20260901-WA0011.jpg"],
  ["Barbearia", "Agenda em ordem", "Serviços, profissionais, agenda e histórico num sistema simples de operar.", "IMG-20260901-WA0009.jpg"],
  ["Oficina", "Da recepção à entrega", "Ordens de serviço, peças, clientes e acompanhamento para uma oficina mais previsível.", "IMG-20260901-WA0010.jpg"],
];

export default function Software() {
  return <div className="inner-page software-premium">
    <div className="container">
      <PageIntro kicker="Software DYLANDE" title="Sistemas que conhecem o ritmo da operação." text="Software online e offline para negócios que precisam de trabalhar com menos improviso e mais contexto." variant="fill" />
    </div>

    <Reveal><section className="container product-feature product-feature-premium">
      <div className="product-feature-copy">
        <span className="eyebrow"><Sparkles size={13} /> Software empresarial</span>
        <h2>Uma base. Módulos que crescem consigo.</h2>
        <p>O DYLANDE SOFTWARE foi concebido para dar continuidade ao dia a dia: informação acessível, processos claros e suporte quando a equipa precisa.</p>
        <ul className="check-list"><li><Check size={16} />Facturação electrónica certificada</li><li><Check size={16} />Gestão de stock e indicadores</li><li><Check size={16} />Acesso online e operação local</li></ul>
        <div className="product-actions">
          <Link href="/contacto" className="button button-primary">Solicitar demonstração <ArrowRight size={16} /></Link>
          <a href={downloadGuide} download="DYLANDE-Software-Guia-Visual.pdf" className="button button-download"><Download size={16} /> Descarregar apresentação</a>
        </div>
        <a href={downloadGuide} target="_blank" rel="noreferrer" className="text-link">Abrir guia visual antes de descarregar <ArrowUpRight size={15} /></a>
      </div>
      <motion.div className="product-image product-image-premium" initial={{ opacity: 0, x: 50, rotateY: -8 }} whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: 1.25, ease: [0.16,1,.3,1] }}>
        <img src={`${m}IMG-20260901-WA0009.jpg`} alt="Interface DYLANDE SOFTWARE em vários dispositivos" />
        <span className="image-index">01 / 06 · Sistema multi-dispositivo</span>
        <span className="image-glow" />
      </motion.div>
    </section></Reveal>

    <section className="container product-catalog product-catalog-premium">
      <div className="section-head"><div><span className="eyebrow">Escolha por operação</span><h2>O seu negócio não é genérico.</h2></div><Layers3 size={25} /></div>
      <Stagger className="product-list" delay={.09}>
        {products.map(([name, label, text, image], i) => <StaggerItem key={name}>
          <motion.article className="product-row product-row-premium" whileHover={{ x: 9 }} transition={{ duration: .55, ease: [0.16,1,.3,1] }}>
            <div className="product-row-num">0{i + 1}</div>
            <div className="product-row-copy"><span className="eyebrow">{label}</span><h3>{name}</h3><p>{text}</p><div className="product-row-actions"><Link href="/contacto" className="text-link">Falar sobre esta solução <ArrowUpRight size={15} /></Link><a href={downloadGuide} download={`DYLANDE-${name.replace(/\s+/g, "-")}-Apresentacao.pdf`} className="download-link"><ArrowDownToLine size={15} /> Descarregar</a></div></div>
            <div className="product-row-media"><img src={`${m}${image}`} alt="" /><span>DYLANDE SOFTWARE · 0{i + 1}</span></div>
          </motion.article>
        </StaggerItem>)}
      </Stagger>
    </section>

    <Reveal><section className="container product-video product-video-premium">
      <div className="product-video-frame"><video controls muted poster={`${m}IMG-20260901-WA0008.jpg`}><source src={`${m}VID-20260901-WA0007.mp4`} type="video/mp4" /></video><div className="video-badge"><Play size={13} fill="currentColor" /> Demonstração visual</div></div>
      <div className="product-video-copy"><span className="eyebrow">Ver em contexto</span><h2>Não vendemos uma promessa. Mostramos o sistema.</h2><p>Veja como o ecossistema visualiza a operação e depois fale connosco sobre a sua realidade.</p><a href={downloadGuide} download="DYLANDE-Software-Guia-Visual.pdf" className="button button-download"><Download size={16} /> Descarregar guia completo</a></div>
    </section></Reveal>

    <section className="container software-final-download"><div><span className="eyebrow">Leve a apresentação consigo</span><h2>Explore o software. Partilhe com a sua equipa. Decida com contexto.</h2></div><a href={downloadGuide} download="DYLANDE-Software-Guia-Visual.pdf" className="button button-light"><Download size={17} /> Descarregar PDF</a></section>
  </div>;
}
