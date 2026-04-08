/**
 * Product.js — Model
 * Defines the Product schema and data access methods for Anshveda products.
 * Connects to Supabase (or any DB) for CRUD operations.
 */

const products = [
    {
        id: 1,
        name: 'Anshveda Absorbent Cotton Wool (I.P.)',
        brand: 'Anshveda',
        category: 'cotton-care',
        price: 199,
        mrp: 235,
        image: '/images/cotton_roll.png',
        badges: ['Microbiological Tested', 'pH Tested', 'Contamination Free', 'Hygienically Processed'],
        inStock: true,
    },
    {
        id: 2,
        name: 'Anshveda Pure Soft Cotton Balls',
        brand: 'Anshveda',
        category: 'cotton-care',
        price: 96,
        mrp: 120,
        image: '/images/cotton_balls.png',
        badges: ['100% Natural', 'Ultra Soft'],
        inStock: true,
    },
    {
        id: 3,
        name: 'Anshveda Dispo Guard Face Mask',
        brand: 'Anshveda',
        category: 'hygiene',
        price: 399,
        mrp: 1000,
        image: '/images/face_mask_box.png',
        badges: ['3-Ply', 'BIS Certified'],
        inStock: true,
    },
    {
        id: 4,
        name: 'Anshveda Magna Pant Style Adult Diapers',
        brand: 'Anshveda',
        category: 'adult-care',
        price: 289,
        mrp: 548,
        image: '/images/adult_diapers.png',
        badges: ['Super Absorbent', 'Leak Proof'],
        inStock: true,
    },
    {
        id: 5,
        name: 'Anshveda Bloom Disposable Period Panty',
        brand: 'Anshveda',
        category: 'women-care',
        price: 247,
        mrp: 780,
        image: '/images/period_panty.png',
        badges: ['Disposable', 'Ultra Comfort'],
        inStock: true,
    },
    {
        id: 6,
        name: 'Anshveda Poochie Play Pants Baby Diapers',
        brand: 'Anshveda',
        category: 'baby-care',
        price: 323,
        mrp: 371,
        image: '/images/baby_products.png',
        badges: ['Skin Friendly', 'Wetness Indicator'],
        inStock: true,
    },
];

const Product = {
    /**
     * Get all products
     */
    getAll: () => products,

    /**
     * Get product by ID
     */
    getById: (id) => products.find((p) => p.id === parseInt(id)),

    /**
     * Get products by category
     */
    getByCategory: (category) => products.filter((p) => p.category === category),

    /**
     * Get bestsellers (in-stock only)
     */
    getBestsellers: () => products.filter((p) => p.inStock),
};

module.exports = Product;
