import React, { PropsWithChildren, useRef } from 'react';
import { Icons } from '@estia/assets';
import { cn } from '@estia/lib/utils';
import Image from 'next/image';
import { formatCurrency } from '@estia/utils/general';
import { Button } from '@estia/components/ui/button';
import IbanSelectorView from '@estia/components/general/IbanSelectorView';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

interface TransferSuccessProps extends PropsWithChildren {
  className?: string;
  onProceed: () => void;
  amount?: number;
  fees?: string;
  received?: number;
  transRef?: string;
  fromIban?: { iban: string; name: string };
  toIban?: { iban: string; name: string };
}

export default function TransferSuccess({
  className,
  onProceed,
  amount,
  fees,
  received,
  transRef,
  toIban,
  fromIban,
}: TransferSuccessProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  async function handleDownload() {
    const canvas = await html2canvas(contentRef.current!, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.9);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210 mm for A4
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297 mm for A4

    const margin = 20; // mm
    const usableWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * usableWidth) / canvas.width;

    // If the image height exceeds the page height, handle multi-page rendering
    if (imgHeight + margin * 2 > pageHeight) {
      // Handle pagination if needed
      console.warn('Image is taller than a page. Consider paginating.');
    }

    pdf.addImage(imgData, 'JPEG', margin, margin, usableWidth, imgHeight);
    pdf.save('transfer-receipt.pdf');
  }

  return (
    <div
      className={cn(
        'mx-auto -mt-12 flex max-w-[55%] flex-col items-center justify-center',
        className
      )}
    >
      <div
        ref={contentRef}
        className='flex-col items-center justify-center px-12 pt-12'
      >
        <h1 className='text-center text-2xl font-bold'>
          Confirmation of transaction
        </h1>
        <div className='relative mx-auto my-8 size-28'>
          <Image src={Icons.success} alt='' fill />
        </div>
        <h2 className='text-center text-lg font-bold'>You sent</h2>
        <h3 className='my-4 text-center text-4xl font-medium'>
          {formatCurrency(amount)}
        </h3>
        <div className='pl-4'>
          <IbanSelectorView
            subText='From'
            title={fromIban?.name || ''}
            iban={fromIban?.iban || ''}
          />
          <IbanSelectorView
            subText='To'
            title={toIban?.name || ''}
            iban={toIban?.iban || ''}
          />
        </div>
        <div className='mt-8 w-full rounded-2xl bg-white p-4 px-5'>
          <h5 className='pt-2 pb-3 text-base font-bold'>Transaction details</h5>
          <div className='flex justify-between pb-3'>
            <p className='text-lg font-medium'>You sent</p>
            <p className='text-lg'>{formatCurrency(amount)}</p>
          </div>
          <div className='flex justify-between pb-3'>
            <p className='text-lg font-medium'>Fees</p>
            <p className='text-lg'>{fees}</p>
          </div>
          <div className='flex justify-between pb-3'>
            <p className='text-lg font-medium'>Received</p>
            <p className='text-lg font-bold'>{formatCurrency(received)}</p>
          </div>
          <div className='flex justify-between pb-3'>
            <p className='text-lg font-medium'>Transaction number</p>
            <p className='text-right text-lg'>{transRef}</p>
          </div>
          {/*<h1 className='mt-4 text-lg font-bold'>*/}
          {/*  George Papaioannou’s bank details*/}
          {/*</h1>*/}
          {/*<div className='mt-3 pb-3'>*/}
          {/*  <p className='text-base font-medium'>Account holder name</p>*/}
          {/*  <p className='text-lg font-bold'>George Papaioannou</p>*/}
          {/*</div>*/}
          {/*<div className='mt-1 pb-3'>*/}
          {/*  <p className='text-base font-medium'>Bank code (BIC/SWIFT)</p>*/}
          {/*  <p className='text-lg font-bold'>ESTIAXXX</p>*/}
          {/*</div>*/}
          {/*<div className='mt-1 pb-3'>*/}
          {/*  <p className='text-base font-medium'>IBAN</p>*/}
          {/*  <p className='text-lg font-bold'>GR 2465 9795 1579 4587 24</p>*/}
          {/*</div>*/}
          {/*<div className='mt-1 pb-3'>*/}
          {/*  <p className='text-base font-medium'>Bank name</p>*/}
          {/*  <p className='text-lg font-bold'>ESTIA PAYMENTS</p>*/}
          {/*</div>*/}
        </div>
      </div>
      <div className='w-full px-12'>
        <Button
          onClick={handleDownload}
          size='lg'
          variant='outline'
          className='border-primary-1 mt-8 w-full border shadow-none'
        >
          Download transfer receipt
        </Button>
        <Button
          onClick={() => {
            onProceed();
          }}
          size='lg'
          className='mt-5 mb-16 w-full'
        >
          Go to wallet
        </Button>
      </div>
    </div>
  );
}
