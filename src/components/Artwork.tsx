import { useId } from 'react';

export function Logo({ light = false }: { light?: boolean }) {
  const filterId = `brand-${useId().replace(/:/g, '')}`;
  return <span className={`logo ${light ? 'logo--light' : ''}`} aria-label="KHAZRI DMC">
    <svg className="logo__emblem" viewBox="510 170 570 440" aria-hidden="true">
      <defs><filter id={filterId} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1.5 1.5 1.5 0 -0.85"/></filter></defs>
      <image href="/images/logo.png" width="1536" height="1024" filter={`url(#${filterId})`}/>
    </svg>
    <span className="logo__wordmark" aria-hidden="true"><b>KHAZRI</b><small>DMC · AZERBAIJAN</small></span>
  </span>;
}

export function HeroArtwork() {
  return <div className="collage" aria-hidden="true">
    <figure className="photo-sticker photo-sticker--panorama"><img src="/images/updatedD/baku.jpg" alt="" width="720" height="1280" fetchPriority="high"/><figcaption>BAKU · CASPIAN COAST</figcaption></figure>
    <figure className="photo-sticker photo-sticker--maiden"><img src="/images/hero/maiden-tower.jpg" alt="" width="1280" height="1920" fetchPriority="high"/><figcaption>MAIDEN TOWER</figcaption></figure>
    <figure className="photo-sticker photo-sticker--center"><img src="/images/hero/heydar-aliyev-center.jpg" alt="" width="1280" height="720" fetchPriority="high"/><figcaption>HEYDAR ALIYEV CENTER</figcaption></figure>
    <div className="sticker sticker--sun"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="43"/><path d="M60 4v18M60 98v18M4 60h18M98 60h18M20 20l13 13M87 87l13 13M100 20 87 33M33 87l-13 13"/></svg></div>
    <div className="sticker sticker--ticket"><span>CASPIAN<br/><b>→ BAKU</b></span><i>40°23′N</i></div>
    <div className="sticker sticker--stamp"><svg viewBox="0 0 130 130"><circle cx="65" cy="65" r="56"/><circle cx="65" cy="65" r="44"/><path d="M30 69h70M65 30c-14 18-14 52 0 70M65 30c14 18 14 52 0 70M25 50h80M25 84h80"/></svg><b>AZ</b></div>
  </div>;
}

export function AirportArt() {
  return <figure id="footer" className="airport-sticker"><img src="/images/footer/gyd-terminal.jpg" alt="Aerial view of Heydar Aliyev International Airport in Baku" width="1920" height="1280" loading="lazy"/><figcaption><b>GYD</b><span>Heydar Aliyev International Airport · Baku</span></figcaption><i className="landing-target" aria-hidden="true"/></figure>;
}
