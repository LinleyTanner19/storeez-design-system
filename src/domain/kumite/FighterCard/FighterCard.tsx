import React from 'react';
import styles from './FighterCard.module.css';

export type FighterTone = 'success' | 'warning' | 'error' | 'brand';

export interface FighterCardProps {
  name: string;
  nickname?: string;
  record: { wins: number; losses: number; draws?: number };
  gym?: string;
  weightClass?: string;
  imageUrl?: string;
  rank?: number;
  streak?: number;
  tone?: FighterTone;
  onClick?: () => void;
  className?: string;
}

/**
 * KUMITE vertical: fighter profile card. Record ALWAYS in mono.
 * STATES: happy, loading (Skeleton), empty (no fighter), offline (cached record).
 * Honest AI: predicted-matchup slot uses AIInsight, never invented stats.
 */
export function FighterCard({
  name, nickname, record, gym, weightClass, imageUrl, rank, streak, tone = 'brand', onClick, className,
}: FighterCardProps) {
  const toneMap: Record<FighterTone, string> = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--error)',
    brand: 'var(--md-sys-color-primary-text)',
  };
  const wld = `${record.wins}-${record.losses}${record.draws ? '-' + record.draws : ''}`;
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={[styles.card, onClick ? styles.clickable : '', className].filter(Boolean).join(' ')}
    >
      <div className={styles.top}>
        {imageUrl ? (
          <img src={imageUrl} alt="" className={styles.avatar} />
        ) : (
          <div className={[styles.avatar, styles.avatarPlaceholder].join(' ')} aria-hidden="true">
            {name.slice(0, 1)}
          </div>
        )}
        <div className={styles.identity}>
          {rank != null && <div className={styles.rank} style={{ color: toneMap[tone] }}>#{rank}</div>}
          <div className={styles.name}>{name}</div>
          {nickname && <div className={styles.nickname}>"{nickname}"</div>}
        </div>
        {streak != null && streak > 0 && (
          <div className={styles.streak} style={{ color: toneMap[tone] }}>▲ {streak}</div>
        )}
      </div>
      <div className={styles.meta}>
        <span className={styles.record} title="W-L-D">{wld}</span>
        {weightClass && <span className={styles.weightClass}>{weightClass}</span>}
        {gym && <span className={styles.gym}>{gym}</span>}
      </div>
    </div>
  );
}

export default FighterCard;
