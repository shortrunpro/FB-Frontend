import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronUpDown } from '@medusajs/icons';
import { clx } from '@medusajs/ui';
import Image from 'next/image';

import { Card, Checkbox } from '@/components/atoms';
import { convertToLocale } from '@/lib/helpers/money';
import { cn } from '@/lib/utils';

export const ReturnItemsTab = ({
  order,
  selectedItems,
  handleSelectItem,
  returnReasons,
  error
}: {
  order: any;
  selectedItems: any[];
  handleSelectItem: (item: any, reason_id: string) => void;
  returnReasons: any[];
  error: boolean;
}) => {
  return (
    <div>
      <Card className="flex items-center justify-between p-4">
        <ul className="w-full">
          {order.items.map((item: any) => (
            <li
              key={item.id}
              className="w-full justify-between gap-2 md:flex"
            >
              <div className="mb-4 flex items-center gap-2 md:mb-0 md:w-2/3">
                <Checkbox
                  checked={selectedItems.some(i => i.line_item_id === item.id)}
                  onChange={() => handleSelectItem(item, '')}
                />
                <div className="flex items-center gap-2">
                  <div className="w-16 rounded-sm border">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.subtitle}
                        width={64}
                        height={64}
                        className="rounded-sm"
                      />
                    ) : (
                      <Image
                        src={'/images/placeholder.svg'}
                        alt={item.subtitle}
                        width={64}
                        height={64}
                        className="scale-75 opacity-25"
                      />
                    )}
                  </div>
                  <div>
                    <p className="label-md w-full truncate font-semibold text-primary">
                      {item.subtitle}
                    </p>
                    <p className="label-md w-full truncate">{item.title}</p>
                    <p className="label-lg mt-2">
                      {convertToLocale({
                        amount: item.subtotal,
                        currency_code: order.currency_code
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <Listbox
                  value={selectedItems.find(i => i.line_item_id === item.id)?.reason_id}
                  onChange={value => handleSelectItem(item, value || '')}
                >
                  <div className="relative">
                    <ListboxButton
                      className={cn(
                        'text-base-regular relative flex h-12 w-full cursor-default items-center justify-between rounded-lg border bg-component-secondary px-4 text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300',
                        error &&
                          !selectedItems.find(i => i.line_item_id === item.id)?.reason_id &&
                          'border-red-700'
                      )}
                    >
                      {({ open }) => (
                        <>
                          <span className="block truncate">
                            {returnReasons.find(
                              r =>
                                r.id ===
                                selectedItems.find(i => i.line_item_id === item.id)?.reason_id
                            )?.label || 'Select Reason'}
                          </span>
                          <ChevronUpDown
                            className={clx('transition-rotate duration-200', {
                              'rotate-180 transform': open
                            })}
                          />
                        </>
                      )}
                    </ListboxButton>
                    <ListboxOptions className="text-small-regular border-top-0 absolute z-20 max-h-60 w-full overflow-auto rounded-lg border bg-white focus:outline-none sm:text-sm">
                      {returnReasons.map(reason => (
                        <ListboxOption
                          key={reason.id}
                          value={reason.id}
                          className="relative cursor-default select-none border-b py-4 pl-6 pr-10 hover:bg-gray-50"
                        >
                          {reason.label}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                    {error && !selectedItems.find(i => i.line_item_id === item.id)?.reason_id && (
                      <p className="label-md absolute -bottom-6 text-red-700">
                        Please select reason
                      </p>
                    )}
                  </div>
                </Listbox>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
