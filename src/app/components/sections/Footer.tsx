import { Facebook, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <strong>YOMSAN AUTOMOBILE</strong>
          <p>Premium vehicles. Confident decisions.</p>
        </div>
        <div className="site-footer__links">
          <a href="https://jiji.ng/shop/yomsan-automobile/cars" target="_blank" rel="noreferrer" aria-label="Yomsan Automobile on Jiji">
            Jiji Cars <ExternalLink size={14} />
          </a>
          <a href="https://web.facebook.com/Yomsanautos/?_rdc=1&_rdr#" target="_blank" rel="noreferrer" aria-label="Yomsan Automobile on Facebook">
            Facebook <Facebook size={14} />
          </a>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 Yomsan Motors Sdn. Bhd. All rights reserved.</span>
          <a href="/login">Admin Portal / Login</a>
        </div>
      </div>
    </footer>
  );
}
