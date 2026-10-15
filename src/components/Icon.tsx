import type { CSSProperties } from 'react';

export type IconName = 'arrow-up-right' | 'arrow-right' | 'arrow-down' | 'arrow-left' | 'plus' | 'close' | 'menu' | 'loader';

const paths: Record<IconName, string> = {
  'arrow-up-right': 'M7 17 17 7M7 7h10v10',
  'arrow-right': 'M4 12h16m-6-6 6 6-6 6',
  'arrow-down': 'M12 4v16m-6-6 6 6 6-6',
  'arrow-left': 'M20 12H4m6-6-6 6 6 6',
  plus: 'M12 5v14M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 8h16M4 16h16',
  loader: 'M20 12a8 8 0 1 1-8-8',
};

export function Icon({ name, className = '', style }: { name: IconName; className?: string; style?: CSSProperties }) {
  return <svg className={`ui-icon ui-icon--${name} ${className}`} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style}><path d={paths[name]}/></svg>;
}
