import React, { useState } from 'react';
import { SearchBar } from '../../molecules/SearchBar';
import { Chip } from '../../primitives/Chip';
import { List } from '../../molecules/List';
import { ListItem } from '../../molecules/ListItem';
import styles from './SearchView.module.css';

export interface SearchViewProps {
  open: boolean;
  onClose?: () => void;
  placeholder?: string;
  recentSearches?: string[];
  filterChips?: Array<{ label: string; selected?: boolean; onClick?: () => void }>;
  onSearch?: (query: string) => void;
  onSelectRecent?: (query: string) => void;
  children?: React.ReactNode;
  className?: string;
}

/**
 * MD3 full-screen search overlay: search bar + recent searches + filter chips.
 * STATES: happy (results), empty (no results → EmptyState guidance), loading,
 * ai-empty (echo query + alternatives).
 */
export function SearchView({
  open, onClose, placeholder, recentSearches = [], filterChips = [],
  onSearch, onSelectRecent, children, className,
}: SearchViewProps) {
  const [query, setQuery] = useState('');
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={[styles.view, className].filter(Boolean).join(' ')}>
        <div className={styles.barRow}>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={placeholder}
            onClear={() => setQuery('')}
          />
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
            Cancel
          </button>
        </div>
        {filterChips.length > 0 && (
          <div className={styles.chips}>
            {filterChips.map((c) => (
              <Chip key={c.label} selected={c.selected} onClick={c.onClick}>
                {c.label}
              </Chip>
            ))}
          </div>
        )}
        {query === '' && recentSearches.length > 0 && (
          <div className={styles.recent}>
            <div className={styles.sectionLabel}>Recent</div>
            <List>
              {recentSearches.map((r) => (
                <ListItem
                  key={r}
                  title={r}
                  onClick={() => {
                    setQuery(r);
                    onSelectRecent?.(r);
                    onSearch?.(r);
                  }}
                />
              ))}
            </List>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default SearchView;
