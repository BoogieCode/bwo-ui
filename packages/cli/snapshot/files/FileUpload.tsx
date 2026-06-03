'use client';

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface FileUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled list of files. */
  value?: File[];
  /** Default file list (uncontrolled). */
  defaultValue?: File[];
  /** Fires when files are added or removed. */
  onValueChange?: (files: File[]) => void;
  /** Allow multiple files. Default: `false`. */
  multiple?: boolean;
  /** MIME types / extensions accepted. Default: any. */
  accept?: string;
  /** Maximum number of files. */
  maxFiles?: number;
  /** Maximum size per file in bytes. */
  maxSize?: number;
  /** Disable interaction. */
  disabled?: boolean;
  /** Hint message under the dropzone. */
  hint?: React.ReactNode;
  /** Custom heading text. */
  heading?: React.ReactNode;
  /** Custom CTA text. Default: `'Click to browse'`. */
  cta?: React.ReactNode;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const Cloud = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 18a4 4 0 010-8 6 6 0 0111-3 5 5 0 014 8 4 4 0 01-4 4H7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 12v6m-3-3l3-3 3 3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Trash = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  {
    value,
    defaultValue = [],
    onValueChange,
    multiple = false,
    accept,
    maxFiles,
    maxSize,
    disabled,
    hint,
    heading,
    cta = 'Click to browse',
    className,
    style,
    ...rest
  },
  ref,
) {
  const id = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<File[]>(defaultValue);
  const files = isControlled ? (value as File[]) : internal;
  const [draggingOver, setDraggingOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setFiles = useCallback(
    (next: File[]) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const intake = useCallback(
    (incoming: FileList | File[]) => {
      const incomingArr = Array.from(incoming);
      const errs: string[] = [];
      const accepted: File[] = [];
      for (const file of incomingArr) {
        if (maxSize != null && file.size > maxSize) {
          errs.push(`${file.name} is too large (${formatBytes(file.size)})`);
          continue;
        }
        accepted.push(file);
      }
      let next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
      if (maxFiles != null && next.length > maxFiles) {
        errs.push(`Maximum ${maxFiles} files`);
        next = next.slice(0, maxFiles);
      }
      setFiles(next);
      setErrors(errs);
    },
    [files, multiple, maxSize, maxFiles, setFiles],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) intake(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(false);
    if (disabled) return;
    if (e.dataTransfer.files.length) intake(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setDraggingOver(true);
  };

  const onDragLeave = () => setDraggingOver(false);

  const remove = (i: number) => {
    const next = files.slice(0, i).concat(files.slice(i + 1));
    setFiles(next);
  };

  return (
    <div ref={ref} className={cn('bwo-file-upload', className)} style={style} {...rest}>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-controls={id}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '28px 24px',
          textAlign: 'center',
          border: `2px dashed ${draggingOver ? 'var(--bwo-text)' : 'var(--bwo-border)'}`,
          borderRadius: 'var(--bwo-radius-md)',
          background: draggingOver ? 'var(--bwo-grey-4)' : 'var(--bwo-surface)',
          color: 'var(--bwo-text-body)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span aria-hidden style={{ color: 'var(--bwo-text-body)' }}>
          {Cloud}
        </span>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--bwo-text)' }}>
          {heading ?? (draggingOver ? 'Drop to upload' : 'Drag files here')}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--bwo-text-body)' }}>
          or <u>{cta}</u>
        </div>
        {hint && (
          <div style={{ fontSize: 11.5, color: 'var(--bwo-text-body)', marginTop: 4 }}>
            {hint}
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onChange}
          style={{ display: 'none' }}
          tabIndex={-1}
        />
      </div>

      {errors.length > 0 && (
        <ul
          role="alert"
          style={{
            margin: '10px 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            fontSize: 12,
            color: '#ff481f',
          }}
        >
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul
          aria-label="Files"
          style={{
            margin: '12px 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}-${f.lastModified}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                background: 'var(--bwo-surface)',
                border: '1px solid var(--bwo-border)',
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              <span
                aria-hidden
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'var(--bwo-grey-4)',
                  color: 'var(--bwo-text-body)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {(f.name.split('.').pop() ?? '?').slice(0, 4)}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f.name}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--bwo-text-body)' }}>
                  {formatBytes(f.size)}
                </div>
              </div>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() => remove(i)}
                disabled={disabled}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 26,
                  height: 26,
                  border: 0,
                  background: 'transparent',
                  color: 'var(--bwo-text-body)',
                  cursor: 'pointer',
                  borderRadius: 6,
                  padding: 0,
                }}
              >
                {Trash}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
