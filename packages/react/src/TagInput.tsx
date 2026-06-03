'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface TagInputProps {
  /** Controlled tag list. */
  value?: string[];
  /** Default tags (uncontrolled). */
  defaultValue?: string[];
  /** Fires whenever the list changes. */
  onValueChange?: (tags: string[]) => void;
  /** Placeholder for the input. Default: `'Add a tag…'`. */
  placeholder?: string;
  /** Keys that finalise a tag. Default: Enter + comma. */
  separators?: string[];
  /** Maximum number of tags. */
  max?: number;
  /** Disable adding tags but keep existing ones visible. */
  disabled?: boolean;
  /** Optional validator. Returning a string rejects the tag with that reason. */
  validate?: (tag: string) => string | true;
  /** Render override for each tag. */
  renderTag?: (tag: string, remove: () => void) => ReactNode;
  /** Optional accessible label for the input. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  {
    value,
    defaultValue = [],
    onValueChange,
    placeholder = 'Add a tag…',
    separators = ['Enter', ','],
    max,
    disabled,
    validate,
    renderTag,
    className,
    style,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const tags = isControlled ? value : internal;
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setTags = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const commit = useCallback(
    (raw: string) => {
      const t = raw.trim();
      if (!t) return;
      if (tags.includes(t)) {
        setError(`"${t}" is already in the list`);
        return;
      }
      if (max != null && tags.length >= max) {
        setError(`Maximum ${max} tags`);
        return;
      }
      const v = validate ? validate(t) : true;
      if (v !== true) {
        setError(v);
        return;
      }
      setTags([...tags, t]);
      setError(null);
      setDraft('');
    },
    [max, tags, setTags, validate],
  );

  const remove = useCallback(
    (index: number) => {
      const next = tags.slice(0, index).concat(tags.slice(index + 1));
      setTags(next);
      setError(null);
    },
    [tags, setTags],
  );

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (separators.includes(e.key)) {
      e.preventDefault();
      commit(draft);
      return;
    }
    if (e.key === 'Backspace' && draft.length === 0 && tags.length > 0) {
      e.preventDefault();
      remove(tags.length - 1);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDraft(e.target.value);
    if (error) setError(null);
  };

  useEffect(() => {
    if (!error) return;
    const id = window.setTimeout(() => setError(null), 2200);
    return () => window.clearTimeout(id);
  }, [error]);

  return (
    <div className={cn('bwo-tag-input', className)} style={style}>
      <div
        role="group"
        onClick={() => inputRef.current?.focus()}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 6,
          minHeight: 38,
          padding: '5px 8px',
          border: '1px solid var(--bwo-border)',
          borderRadius: 'var(--bwo-radius-md)',
          background: disabled ? 'var(--bwo-grey-4)' : 'var(--bwo-surface)',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color 0.15s ease',
        }}
      >
        {tags.map((t, i) =>
          renderTag ? (
            renderTag(t, () => remove(i))
          ) : (
            <span
              key={`${t}-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 6px 3px 10px',
                fontSize: 13,
                borderRadius: 9999,
                background: 'var(--bwo-grey-4)',
                border: '1px solid var(--bwo-border)',
                color: 'var(--bwo-text)',
                lineHeight: 1.2,
              }}
            >
              {t}
              <button
                type="button"
                aria-label={`Remove ${t}`}
                onClick={(e) => {
                  e.stopPropagation();
                  remove(i);
                }}
                disabled={disabled}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 16,
                  height: 16,
                  border: 0,
                  background: 'transparent',
                  color: 'var(--bwo-text-body)',
                  cursor: 'pointer',
                  padding: 0,
                  borderRadius: '50%',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ),
        )}
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          type="text"
          value={draft}
          placeholder={tags.length === 0 ? placeholder : undefined}
          disabled={disabled || (max != null && tags.length >= max)}
          onChange={onChange}
          onKeyDown={onKey}
          onBlur={() => commit(draft)}
          style={{
            flex: 1,
            minWidth: 80,
            border: 0,
            outline: 'none',
            background: 'transparent',
            fontFamily: 'inherit',
            fontSize: 14,
            color: 'var(--bwo-text)',
            padding: '4px 4px',
          }}
          {...rest}
        />
      </div>
      {error && (
        <div
          role="alert"
          style={{
            marginTop: 4,
            fontSize: 12,
            color: '#ff481f',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
});
