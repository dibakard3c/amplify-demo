'use client';

import React, { useState } from 'react';
import { Input } from '@estia/components/ui/input';
import { Button } from '@estia/components/ui/button';
import { SearchIcon } from '@estia/assets/icons/search';
import { useDebounce } from '@estia/hooks/useDebounce';
import {
  useFetchMerchantsByCategoryQuery,
  useFetchMerchantsQuery,
} from '@estia/networking/endpoints/transaction';
import { isEmpty } from 'lodash';
import MerchantItem from '@estia/components/item-views/merchant-item';
import { Merchant } from '@estia/typings/merchant';
import { cn } from '@estia/lib/utils';
import { useAppSelector } from '@estia/store/store';
import {
  selectAllMerchants,
  selectSelectedMerchantCategory,
} from '@estia/store/selector';

export default function Page() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const debouncedSearchValue = useDebounce(search, 700);

  const allMerchants = useAppSelector(selectAllMerchants);
  const selectedCategoryMerchants = useAppSelector(
    selectSelectedMerchantCategory
  );

  const { isLoading } = useFetchMerchantsQuery({
    search: debouncedSearchValue,
    groupSize: 5,
  });

  const { isFetching: isDetailLoading } = useFetchMerchantsByCategoryQuery(
    Object.assign(
      {
        type: selectedCategory,
        page,
      },
      !isEmpty(debouncedSearchValue) && { search: debouncedSearchValue }
    ),
    { refetchOnMountOrArgChange: true, skip: isEmpty(selectedCategory) }
  );

  if (selectedCategory) {
    return (
      <div className='bg-card-bg mt-8 rounded-2xl p-8'>
        <div className='dashboard-shadow flex w-full flex-col items-start justify-start rounded-2xl p-6 text-sm'>
          <div className='mb-4 flex w-full flex-col items-center justify-between px-3 md:flex-row'>
            <div
              className='mb-3 text-left text-3xl font-bold md:mb-0'
              onClick={() => {
                setSelectedCategory('');
              }}
            >
              <span
                className={cn(
                  'mb-3 cursor-pointer self-start text-3xl font-bold md:mb-0',
                  !isEmpty(selectedCategory) && 'text-secondary-3'
                )}
              >
                Merchants&#39; List
              </span>
              {selectedCategory ? (
                <span className={cn('text-3xl font-bold')}>
                  {' >'} {selectedCategory}
                </span>
              ) : null}
            </div>
            <div className='flex w-full items-center md:w-auto'>
              <Input
                type='text'
                placeholder='Search'
                containerClassName='w-full md:w-auto'
                className='border-primary-1 mb-1 h-11 min-w-[280px] border pr-10'
                value={search ?? ''}
                onChange={(event) => {
                  setSearch(event?.target?.value || '');
                }}
              />
              <SearchIcon className='-ml-9' />
            </div>
          </div>
          <div className='w-full pl-3'>
            {isDetailLoading && page === 0 ? (
              <p className='py-12 text-center text-base font-medium'>
                Loading...
              </p>
            ) : (
              <div className='mb-2 grid grid-cols-12'>
                {selectedCategoryMerchants?.list?.map((item, index) => (
                  <MerchantItem key={index} item={item} />
                ))}
              </div>
            )}
          </div>
          {selectedCategoryMerchants?.hasMore && !isDetailLoading ? (
            <div className='flex w-full items-center justify-center py-6'>
              <Button
                variant='outline'
                className='text-md border-2 p-6 py-5 font-bold'
                onClick={() => {
                  setPage((currPage) => currPage + 1);
                }}
              >
                Load more
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-card-bg mt-8 rounded-2xl p-4 md:p-8'>
      <div className='dashboard-shadow flex w-full flex-col items-start justify-start rounded-2xl p-6 text-sm'>
        <div className='mb-4 flex w-full flex-col items-center justify-between md:flex-row md:px-3'>
          <h1
            className='cusor-pointer mb-3 self-start text-left text-xl font-bold md:mb-0 md:text-3xl'
            onClick={() => {
              setSelectedCategory('');
            }}
          >
            Merchants&#39; List
          </h1>
          <div className='flex w-full items-center md:w-auto'>
            <Input
              type='text'
              placeholder='Search'
              containerClassName='w-full md:w-auto'
              className='border-primary-1 mb-1 h-11 border pr-10 md:min-w-[280px]'
              value={search ?? ''}
              onChange={(event) => {
                setSearch(event?.target?.value || '');
              }}
            />
            <SearchIcon className='-ml-9' />
          </div>
        </div>
        {isLoading && isEmpty(allMerchants) ? (
          <div className='w-full'>
            <p className='py-12 text-center text-base font-medium'>
              Loading...
            </p>
          </div>
        ) : (
          <div className='w-full pl-3'>
            {[...(allMerchants || [])]
              ?.sort((a, b) => {
                return a?.title
                  ?.toLowerCase()
                  .localeCompare(b?.title?.toLowerCase());
              })
              ?.map((item, dataKey) => (
                <div key={dataKey} className='block'>
                  <div className='mt-4 mb-2 flex w-full items-center justify-between'>
                    <h1 className='text-neutral-2 text-lg font-semibold md:text-xl'>
                      {item?.title}
                    </h1>
                    <Button
                      size='sm'
                      onClick={() => {
                        setPage(0);
                        setSearch('');
                        setSelectedCategory(item?.title);
                      }}
                    >
                      See All
                    </Button>
                  </div>
                  <div className='mb-2 grid md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12'>
                    {[
                      ...item?.list,
                      ...item?.list,
                      ...item?.list,
                      ...item?.list,
                      ...item?.list,
                    ]
                      ?.sort((a, b) => {
                        return a?.companyName
                          ?.toLowerCase()
                          .localeCompare(b?.companyName?.toLowerCase());
                      })
                      ?.map((item: Merchant, itemKey: number) => (
                        <MerchantItem
                          key={`${dataKey}-${itemKey}`}
                          item={item}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
