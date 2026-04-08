/**
 * Order.js — Model
 * Manages orders placed by customers.
 */

const Order = {
    orders: [], // In-memory store — replace with Supabase table

    /**
     * Create a new order
     */
    create: ({ userId, items, totalAmount }) => {
        const order = {
            id: `ORD-${Date.now()}`,
            userId,
            items,
            totalAmount,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        Order.orders.push(order);
        return order;
    },

    /**
     * Get all orders for a specific user
     */
    getByUserId: (userId) => Order.orders.filter((o) => o.userId === userId),

    /**
     * Get a single order by ID
     */
    getById: (orderId) => Order.orders.find((o) => o.id === orderId),

    /**
     * Update order status
     */
    updateStatus: (orderId, status) => {
        const order = Order.orders.find((o) => o.id === orderId);
        if (order) order.status = status;
        return order;
    },
};

module.exports = Order;
