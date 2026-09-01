/**
 * DYLANDE — Navy Precision / Corporate Rebuild
 * Homepage orientada a decisão: clareza de oferta, produto visível e confiança comprovável.
 */
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Check, Play, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const media = "/media/";
const slides = [
  { image: `${media}IMG-20260901-WA0008.jpg`, eyebrow: "Software certificado para faturação electrónica", title: "O negócio cresce quando a operação ganha clareza.", accent: "clareza." },
  { image: `${media}IMG-20260901-WA0009.jpg`, eyebrow: "Um ecossistema que acompanha a sua equipa", title: "Tecnologia que trabalha no mesmo ritmo da sua empresa.", accent: "ritmo." },
  { image: `${media}IMG-20260901-WA0010.jpg`, eyebrow: "Controlo onde quer que esteja", title: "Mais controlo para decidir com confiança.", accent: "confiança." },
];

export default function Home() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), 6500); return () => window.clearInterval(timer); }, []);
  const slide = slides[active];
  return <div className="home-page">
    <section className="hero-new"><div className="hero-new-media" key={slide.image} style={{ backgroundImage: `url(${slide.image})` }} /><div className="hero-new-shade" /><div className="container hero-new-inner"><div className="hero-new-copy"><span className="eyebrow hero-eyebrow"><i />{slide.eyebrow}</span><h1>O negócio cresce quando a operação ganha <em>{slide.accent}</em></h1><p>A DYLANDE une software empresarial, consultoria e suporte próximo para transformar complexidade em decisões simples.</p><div className="hero-new-actions"><Link href="/software" className="button button-primary">Conhecer os softwares <ArrowUpRight size={16} /></Link><Link href="/contacto" className="button button-quiet">Falar com um especialista <ArrowRight size={16} /></Link></div><div className="trust-line"><span><Check size={14} /> Software próprio</span><span><Check size={14} /> Suporte local</span><span><Check size={14} /> Certificação AGT</span></div></div><div className="hero-new-side"><span>DY / 2026</span><span>Operação em movimento</span><div className="hero-pager">{slides.map((s, i) => <button key={s.image} aria-label={`Ver apresentação ${i + 1}`} className={i === active ? "active" : ""} onClick={() => setActive(i)}><b>0{i + 1}</b><i /></button>)}</div></div></div></section>
    <section className="proof-bar"><div className="container proof-bar-grid"><div><span>01</span><b>Software</b><small>feito para trabalhar</small></div><div><span>02</span><b>Serviço</b><small>que não desaparece</small></div><div><span>03</span><b>Confiança</b><small>que se documenta</small></div><div><span>04</span><b>Escala</b><small>que começa no essencial</small></div></div></section>
    <section className="section-new intro-split"><div className="container split-grid"><div><span className="eyebrow">Mais do que tecnologia</span><h2>Uma equipa para organizar o que mantém o negócio em movimento.</h2></div><div><p className="lead">Da emissão da factura ao controlo de stock, da recepção do hotel à oficina: desenhamos ferramentas para que cada pessoa saiba o que fazer e cada gestor saiba o que está a acontecer.</p><Link href="/empresa" className="text-link">Conhecer a DYLANDE <ArrowUpRight size={15} /></Link></div></div></section>
    <section className="section-new dark-panel"><div className="container dark-panel-grid"><div><span className="eyebrow">O produto no centro</span><h2>Software empresarial com o aspecto de uma operação bem organizada.</h2><p>Interfaces claras, indicadores accionáveis e módulos que respeitam o modo como as empresas realmente trabalham.</p><Link href="/software" className="button button-light">Ver catálogo de software <ArrowRight size={16} /></Link></div><div className="video-card"><video autoPlay muted loop playsInline poster={`${media}IMG-20260901-WA0009.jpg`}><source src={`${media}VID-20260901-WA0006.mp4`} type="video/mp4" /></video><span><Play size={14} fill="currentColor" /> Demonstração visual</span></div></div></section>
    <section className="section-new software-preview"><div className="container"><div className="section-head"><div><span className="eyebrow">O seu sector. O seu sistema.</span><h2>Seis operações. Uma visão mais simples.</h2></div><Link href="/software" className="text-link">Explorar todos <ArrowUpRight size={15} /></Link></div><div className="software-grid-new">{["Faturação e Stock", "Restauração", "Hotelaria e Restauração", "Lavandaria", "Barbearia", "Oficina"].map((name, i) => <Link href="/software" className="software-tile" key={name}><span>0{i + 1}</span><h3>{name}</h3><small>Ver solução <ArrowUpRight size={13} /></small></Link>)}</div></div></section>
    <section className="section-new authority-strip"><div className="container authority-grid"><div><ShieldCheck size={25} /><span className="eyebrow">Confiança documentada</span><h2>Quando o software é crítico, a prova também é.</h2><p>Os dois certificados AGT são apresentados com transparência, contexto e acesso aos documentos originais.</p></div><Link href="/certificacoes" className="authority-link">Ver certificações <ArrowUpRight size={17} /></Link></div></section>
    <section className="section-new final-cta"><div className="container final-cta-inner"><div><span className="eyebrow">O próximo passo é concreto</span><h2>Mostre-nos onde a operação pode ser melhor.</h2></div><Link href="/contacto" className="button button-primary">Agendar conversa <ArrowUpRight size={16} /></Link></div></section>
  </div>;
}
