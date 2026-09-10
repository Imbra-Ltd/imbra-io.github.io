import { useState } from "react";

interface Service {
  num: string;
  title: string;
  desc: string;
  detail: string;
  tech: string[];
  projects?: string[];
}

interface Props {
  services: Service[];
  projectsLabel: string;
}

export default function ServiceExpand({ services, projectsLabel }: Props) {
  const [activeNum, setActiveNum] = useState<string | null>(null);

  function toggle(num: string) {
    setActiveNum(prev => (prev === num ? null : num));
  }

  return (
    <div className="services-list reveal">
      {services.map(s => {
        const open = activeNum === s.num;
        const panelId = `service-detail-${s.num}`;
        return (
          <div key={s.num} className={`service-item${open ? " active" : ""}`}>
            {/* The whole heading row is the click target; the button inside it is the keyboard
                control, and its click bubbles up to the same handler. */}
            <div className="service-header" onClick={() => toggle(s.num)}>
              <span className="service-num mono">{s.num}</span>
              <h3 className="service-title">
                <button type="button" className="service-toggle" aria-expanded={open} aria-controls={panelId}>
                  <span>{s.title}</span>
                  <span className="service-indicator" aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
              </h3>
              <p className="service-desc">{s.desc}</p>
            </div>
            <div className="service-detail" id={panelId} hidden={!open}>
              {s.detail.split("\n\n").map((para, i) => (
                <p key={i} className="service-detail-text">{para}</p>
              ))}
              {s.projects && (
                <div className="service-detail-row">
                  <div className="service-detail-label">{projectsLabel}</div>
                  <ul className="service-detail-projects">
                    {s.projects.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              )}
              <div className="service-tags">
                {s.tech.map(t => <span key={t} className="service-tag">{t}</span>)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
