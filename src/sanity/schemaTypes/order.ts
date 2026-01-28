export default {
    name: 'order',
    type: 'document',
    title: 'Orders',
    fields: [
        { name: 'customerName', title: 'Customer Name', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'totalPrice', title: 'Total Price', type: 'number' },
        { name: 'paymentMethod', title: 'Payment Method', type: 'string' },
        
        // Transaction ID Field
        { 
            name: 'transactionId', 
            title: 'Transaction ID', 
            type: 'string',
            description: 'Enter TID for JazzCash/EasyPaisa/Bank Transfer' 
        },

        // Order Items Details (Ye zaroori hai taake products nazar aayen)
        {
            name: 'cartItems',
            title: 'Order Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'productName', title: 'Product Name', type: 'string' },
                        { name: 'quantity', title: 'Quantity', type: 'number' },
                        { name: 'price', title: 'Price at Sale', type: 'number' }
                    ]
                }
            ]
        },

        { 
            name: 'status', 
            title: 'Order Status', 
            type: 'string', 
            options: { 
                list: [
                    { title: 'Pending', value: 'Pending' },
                    { title: 'Processing', value: 'Processing' },
                    { title: 'Shipped', value: 'Shipped' },
                    { title: 'Delivered', value: 'Delivered' },
                    { title: 'Cancelled', value: 'Cancelled' }
                ] 
            },
            initialValue: 'Pending'
        },
        
        { 
            name: 'orderDate', 
            title: 'Order Date', 
            type: 'datetime', 
            initialValue: () => new Date().toISOString() 
        }
    ]
}