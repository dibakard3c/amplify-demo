import React, { useEffect, useMemo, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@estia/components/ui/form';
import { formatBytes } from '@estia/utils/general';
import { get, isEmpty } from 'lodash';
import { cn } from '@estia/lib/utils';
import Image from 'next/image';
import { CONSTANTS } from '@estia/constants';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0.8rem',
  borderWidth: '1px',
  borderRadius: '4px',
  borderColor: '#D0D5DD',
  borderStyle: 'dashed',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface FormUploadProps {
  label?: string;
  placeholder?: string;
  onChange: (value: FileWithPath) => void;
  className?: string;
  description?: string;
  previewMode?: boolean;
}

function Display({ file, errors }: any) {
  return (
    <li key={file.path} className='flex items-center justify-between'>
      <div>
        <p className='font-semibold'>{file.name}</p>
        <p className='mt-1'>Size - {formatBytes(file.size)}</p>
        {!isEmpty(errors) && (
          <ul>
            {errors.map((e: any) => (
              <li key={e.code}>
                <p className='mt-1 text-sm text-red-500'>
                  {e.code === 'file-too-large'
                    ? 'File is larger than 2MB'
                    : e?.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {file?.preview ? (
        <div className='relative size-12 rounded border'>
          <Image
            src={file?.preview}
            alt={``}
            fill
            onLoad={() => {
              URL.revokeObjectURL(file?.preview);
            }}
          />
        </div>
      ) : null}
    </li>
  );
}

export function AttachmentUpload({
  label,
  onChange,
  className,
  description,
  previewMode,
}: FormUploadProps) {
  const [files, setFiles] = useState<FileWithPath[] | any[]>([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: CONSTANTS.MERCHANT_BUSINESS_LOGO_SIZE,
    onDrop: (_acceptedFiles) => {
      if (onChange) {
        onChange(get(_acceptedFiles, 0));
      }
      setFiles(
        _acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const previewModeImage = useMemo(() => get(files, 0), [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file?.preview));
  }, [files]);

  return (
    <FormItem className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <section className='relative container max-w-96'>
        <div {...getRootProps({ className: 'dropzone', style: style as any })}>
          <input {...getInputProps()} />
          <div className='flex h-full w-full items-center justify-center py-18'>
            <p className='text-neutral-4 ml-3 text-base font-medium'>
              Tap to browse
            </p>
          </div>
          {previewMode ? (
            <div className='absolute -mt-4 size-full'>
              <div className='relative size-full overflow-hidden rounded border'>
                <Image
                  src={previewModeImage?.preview}
                  alt={``}
                  fill
                  onLoad={() => {
                    URL.revokeObjectURL(previewModeImage?.preview);
                  }}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          ) : null}
        </div>
        {previewMode ? null : (
          <aside
            className={cn(
              (!isEmpty(files) || !isEmpty(fileRejections)) && 'mt-6 mb-4'
            )}
          >
            <ul>
              {files.map((file) => (
                <Display key={file.path} file={file} />
              ))}
              {fileRejections?.map(({ file, errors }) => (
                <Display key={file.path} file={file} errors={errors} />
              ))}
            </ul>
          </aside>
        )}
      </section>
      {fileRejections?.length <= 0 && <FormMessage />}
      <FormDescription className='w-auto leading-relaxed'>
        {description}
      </FormDescription>
    </FormItem>
  );
}
