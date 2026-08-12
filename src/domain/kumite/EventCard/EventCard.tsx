import React from 'react';
import { Button } from '../../../primitives/Button';
import styles from './EventCard.module.css';

export interface EventCardProps {
  title: string;
  subtitle?: string;
  date?: string;             // ISO
  location?: string;
  status?: 'upcoming' | 'live' | 'completed' | 'cancelled';
  capacity?: number;
  registered?: number;
  onRegister?: () => void;
  className?: string;
}

const STATUS_LABEL = { upcoming: 'Upcoming', live: 'Live', completed: 'Completed', cancelled: 'Cancelled' };

/**
 * KUMITE vertical: event card (tournament/event).
 * STATES: happy, loading (Skeleton), empty, offline (cached schedule).
 * status is a LABEL + tone, never semantic-red alone (risk rule).
 */
export function EventCard({ title, subtitle, date, location, status = 'upcoming', capacity, registered, onRegister, className }: EventCardProps) {
  const spotsLeft = capacity && registered != null ? capacity - registered : null;
  const isLive = status === 'live';
  const isCancelled = status === 'cancelled';
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.title}>{title}</div>
          <span className={[styles.status, styles[status]].join(' ')}>{STATUS_LABEL[status]}</span>
        </div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.meta}>
        {date && <div className={styles.metaItem}><span className={styles.metaLabel}>Date</span><span className={styles.metaValue}>{date}</span></div>}
        {location && <div className={styles.metaItem}><span className={styles.metaLabel}>Where</span><span className={styles.metaValue}>{location}</span></div>}
        {spotsLeft != null && (
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Spots</span>
            <span className={[styles.metaValue, spotsLeft <= 5 && !isCancelled ? styles.low : ''].join(' ')}>
              {spotsLeft} left
            </span>
          </div>
        )}
      </div>
      {onRegister && !isCancelled && (
        <div className={styles.footer}>
          <Button variant={isLive ? 'tonal' : 'filled'} size="sm" onClick={onRegister} disabled={isLive}>
            {isLive ? 'Live — join now' : 'Register'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EventCard;
