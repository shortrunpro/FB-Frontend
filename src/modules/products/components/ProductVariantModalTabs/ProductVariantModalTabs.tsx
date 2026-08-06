import { useState } from 'react';

import { StoreProductVariant } from '@medusajs/types';
import { Table, Tabs, Text } from '@medusajs/ui';

export const ProductVariantModalTabs = ({ variant }: { variant: StoreProductVariant }) => {
  const [value, setValue] = useState('specs');
  return (
    <div className="flex w-full flex-col">
      <Tabs
        value={value}
        onValueChange={setValue}
      >
        <Tabs.List className="font-medium text-brand">
          <Tabs.Trigger
            value="specs"
            className="data-[state=active]:shadow-elevation-card-rest p-2 hover:bg-brand hover:text-white data-[state=active]:bg-brand data-[state=active]:text-white"
          >
            Specifications
          </Tabs.Trigger>
          <Tabs.Trigger
            value="reviews"
            className="data-[state=active]:shadow-elevation-card-rest p-2 hover:bg-brand hover:text-white data-[state=active]:bg-brand data-[state=active]:text-white"
          >
            Reviews
          </Tabs.Trigger>
        </Tabs.List>
        <div className="mt-4">
          <Tabs.Content value="specs">
            <Table className="px-4">
              <Table.Body className="flex flex-col">
                <Table.Row className="bg-white px-6 odd:bg-gray-100 [&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                  <Table.Cell>SKU</Table.Cell>
                  <Table.Cell>{variant?.sku}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white px-6 odd:bg-gray-100 [&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                  <Table.Cell>Finish</Table.Cell>
                  {/* @ts-ignore */}
                  <Table.Cell>{variant?.finish}</Table.Cell>
                </Table.Row>

                <Table.Row className="bg-white px-4 odd:bg-gray-100 [&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                  <Table.Cell>Length</Table.Cell>
                  <Table.Cell>{`${variant?.length ? (variant?.length / 100).toFixed(2) : 0}"`}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white px-4 odd:bg-gray-100 [&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                  <Table.Cell>Width</Table.Cell>
                  <Table.Cell>{`${variant?.width ? (variant?.width / 100).toFixed(2) : 0}"`}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white px-4 odd:bg-gray-100 [&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                  <Table.Cell>Height</Table.Cell>
                  <Table.Cell>{`${variant?.height ? (variant?.height / 100).toFixed(2) : 0}"`}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white px-4 odd:bg-gray-100 [&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap">
                  <Table.Cell>Weight</Table.Cell>
                  <Table.Cell>{`${variant?.weight ? (variant?.weight / 100).toFixed(2) : 0} lbs`}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Tabs.Content>
          <Tabs.Content value="reviews">
            <Text size="small">This is the Shipping tab (controlled).</Text>
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  );
};
