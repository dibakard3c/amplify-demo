import React, { useEffect, useMemo, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@estia/components/ui/form';
import { Button } from '@estia/components/ui/button';
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
  value?: FileWithPath;
  onChange: (value: FileWithPath) => void;
  className?: string;
  description?: string;
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
      <div className='relative size-12 rounded border'>
        <Image
          src={URL.createObjectURL(file)}
          alt={``}
          fill
          onLoad={() => {
            URL.revokeObjectURL(file);
          }}
        />
      </div>
    </li>
  );
}

export default function FormUpload({
  label,
  value,
  onChange,
  className,
  description,
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
      setFiles(_acceptedFiles);
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

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file?.preview));
  }, [files]);

  return (
    <FormItem className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <section className='max-w-96'>
        <div {...getRootProps({ className: 'dropzone', style: style as any })}>
          <input {...getInputProps()} />
          <div className='flex h-full w-full items-center'>
            <Button
              variant='outline'
              className='text-neutral-4 group rounded px-5 py-5 text-sm'
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              <div className='h-5 w-5 rounded bg-[#667085]/20 group-hover:bg-white/20'></div>
              Upload
            </Button>
            <p className='text-neutral-4 ml-3 text-sm font-medium'>
              Or Drop Files
            </p>
          </div>
        </div>
        <aside
          className={cn(
            (!isEmpty(value) || !isEmpty(files) || !isEmpty(fileRejections)) &&
              'mt-6 mb-4'
          )}
        >
          <ul>
            {value ? (
              <Display key={value.path} file={value} />
            ) : (
              files.map((file) => <Display key={file.path} file={file} />)
            )}
            {fileRejections?.map(({ file, errors }) => (
              <Display key={file.path} file={file} errors={errors} />
            ))}
          </ul>
        </aside>
      </section>
      {fileRejections?.length <= 0 && <FormMessage />}
      <FormDescription className='w-auto leading-relaxed'>
        {description}
      </FormDescription>
    </FormItem>
  );
}
