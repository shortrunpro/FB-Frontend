'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { ArrowDownTray } from '@medusajs/icons';
import { clx, Text } from '@medusajs/ui';
import Link from 'next/link';
import { get } from 'react-hook-form';

export interface FileType {
  id: string;
  url: string;
  file: File;
}

export interface RejectedFile {
  file: File;
  reason: 'size' | 'format';
}

export interface FileUploadProps {
  name: string;
  errors?: Record<string, unknown>;
  label: string;
  multiple?: boolean;
  hint?: string;
  formats: string[];
  maxFileSize?: number; // in bytes, defaults to 1MB. Set to Infinity to disable.
  onUploaded: (files: FileType[], rejectedFiles?: RejectedFile[]) => void;
}

const DEFAULT_MAX_FILE_SIZE = 1024 * 2048; // 2MB fallback

export const FileUpload = ({
  name,
  errors,
  label,
  hint,
  multiple = true,
  formats,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  onUploaded
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>();
  const [rejected, setRejected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLButtonElement>(null);
  const hasError = get(errors, name);
  const handleOpenFileSelector = () => {
    inputRef.current?.click();
  };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (!files) {
      return;
    }

    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!dropZoneRef.current || dropZoneRef.current.contains(event.relatedTarget as Node)) {
      return;
    }

    setIsDragOver(false);
  };

  const handleUploaded = (files: FileList | null) => {
    if (!files) {
      return;
    }
    const fileList = Array.from(files);
    const validFiles: FileType[] = [];
    const rejectedFiles: RejectedFile[] = [];
    const normalizedMaxFileSize = Math.min(maxFileSize, Infinity);
    // Reset rejected value to false before checking uploaded files
    setRejected(false);
    fileList.forEach(file => {
      if (file.size > normalizedMaxFileSize) {
        rejectedFiles.push({ file, reason: 'size' });
        setRejected(true);
        return;
      }
      const id = Math.random().toString(36).substring(7);
      const previewUrl = URL.createObjectURL(file);
      validFiles.push({
        id: id,
        url: previewUrl,
        file
      });
    });
    setFiles(validFiles);
    onUploaded(validFiles, rejectedFiles);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragOver(false);

    handleUploaded(event.dataTransfer?.files);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    handleUploaded(event.target.files);
  };

  return (
    <div>
      <button
        ref={dropZoneRef}
        type="button"
        onClick={handleOpenFileSelector}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={clx(
          'bg-ui-bg-component border-ui-border-strong transition-fg group flex w-full flex-col items-center gap-y-2 rounded-lg border border-dashed p-8',
          'hover:border-ui-border-interactive focus:border-ui-border-interactive',
          'focus:shadow-borders-focus outline-none focus:border-solid',
          {
            '!border-ui-border-error': hasError,
            '!border-ui-border-interactive': isDragOver
          }
        )}
      >
        <div className="text-ui-fg-subtle group-disabled:text-ui-fg-disabled flex items-center gap-x-2">
          <ArrowDownTray />
          <Text>{label}</Text>
        </div>
        {!!hint && (
          <Text
            size="small"
            leading="compact"
            className="text-ui-fg-muted group-disabled:text-ui-fg-disabled"
          >
            {hint}
          </Text>
        )}
      </button>
      <input
        hidden
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        accept={formats.join(',')}
        multiple={multiple}
      />
      <div className="flex flex-col gap-y-2">
        {files &&
          files.length > 0 &&
          !rejected &&
          files.map(file => (
            <a
              href={file.url}
              key={file.id}
              className="flex items-center gap-x-2"
              target="_blank"
            >
              <FileThumbnail />
              <span className="text-brand underline">{file.file.name}</span>
            </a>
          ))}
      </div>
      {hasError && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => {
            return (
              <div className="text-xsmall-regular pl-2 pt-1 text-rose-500">
                <span>{message}</span>
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

const FileThumbnail = () => {
  return (
    <svg
      width="24"
      height="32"
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 31.75H4C1.92893 31.75 0.25 30.0711 0.25 28V4C0.25 1.92893 1.92893 0.25 4 0.25H15.9431C16.9377 0.25 17.8915 0.645088 18.5948 1.34835L22.6516 5.4052C23.3549 6.10847 23.75 7.06229 23.75 8.05685V28C23.75 30.0711 22.0711 31.75 20 31.75Z"
        fill="url(#paint0_linear_6594_388107)"
        stroke="url(#paint1_linear_6594_388107)"
        strokeWidth="0.5"
      />
      <path
        opacity="0.4"
        d="M17.7857 12.8125V13.5357H10.3393V10.9643H15.9375C16.9569 10.9643 17.7857 11.7931 17.7857 12.8125ZM6.21429 16.9107V15.0893H8.78571V16.9107H6.21429ZM10.3393 16.9107V15.0893H17.7857V16.9107H10.3393ZM15.9375 21.0357H10.3393V18.4643H17.7857V19.1875C17.7857 20.2069 16.9569 21.0357 15.9375 21.0357ZM6.21429 19.1875V18.4643H8.78571V21.0357H8.0625C7.0431 21.0357 6.21429 20.2069 6.21429 19.1875ZM8.0625 10.9643H8.78571V13.5357H6.21429V12.8125C6.21429 11.7931 7.0431 10.9643 8.0625 10.9643Z"
        fill="url(#paint2_linear_6594_388107)"
        stroke="url(#paint3_linear_6594_388107)"
        strokeWidth="0.428571"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6594_388107"
          x1="12"
          y1="0"
          x2="12"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4F4F5" />
          <stop
            offset="1"
            stopColor="#E4E4E7"
          />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6594_388107"
          x1="12"
          y1="0"
          x2="12"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E4E7" />
          <stop
            offset="1"
            stopColor="#D4D4D8"
          />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6594_388107"
          x1="12"
          y1="10.75"
          x2="12"
          y2="21.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52525B" />
          <stop
            offset="1"
            stopColor="#A1A1AA"
          />
        </linearGradient>
        <linearGradient
          id="paint3_linear_6594_388107"
          x1="12"
          y1="10.75"
          x2="12"
          y2="21.25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18181B" />
          <stop
            offset="1"
            stopColor="#52525B"
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
