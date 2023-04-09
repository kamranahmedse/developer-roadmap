# $lookup

The `$lookup` stage in MongoDB is a powerful aggregation pipeline operator that allows you to perform left outer join between two collections. It is used for combining data from multiple collections in a single aggregation pipeline operation.

Here's a brief summary of `$lookup` operator:

## Syntax

The `$lookup` operator uses the following syntax:

```json
{
  "$lookup": {
    "from": "<collection_name>",
    "localField": "<field_from_input_documents>",
    "foreignField": "<field_from_documents_of_the_from_collection>",
    "as": "<output_array_field>"
  }
}
```

## Parameters

- `from`: The target collection to perform the join operation with.
- `localField`: The field from the input collection (i.e., the collection on which the `$lookup` is applied).
- `foreignField`: The field from the target collection (i.e., the `from` collection).
- `as`: The name of the output array field that will store the joined documents.

## Example

Suppose you have two collections, `orders` and `products`. The `orders` collection contains documents with following fields: `orderId`, `productId`, and `quantity`. The `products` collection contains documents with fields: `productId`, `productName`, and `price`.

To calculate the total amount of each order, you can use the `$lookup` operator along with other aggregation stages:

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: 'products',
      localField: 'productId',
      foreignField: 'productId',
      as: 'productDetails',
    },
  },
  {
    $unwind: '$productDetails',
  },
  {
    $project: {
      orderId: 1,
      totalAmount: {
        $multiply: ['$quantity', '$productDetails.price'],
      },
    },
  },
]);
```

In this example, `$lookup` will join the `orders` and `products` collections based on `productId`. The joined data will be stored in the new `productDetails` array field. Additional aggregation stages (`$unwind` and `$project`) are used to calculate and display the total amount of each order.

So, the `$lookup` operator becomes an essential tool when you need to work with data from multiple collections and perform complex data processing tasks in MongoDB.
