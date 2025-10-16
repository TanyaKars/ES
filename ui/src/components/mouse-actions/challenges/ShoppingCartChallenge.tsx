import React, { useState, useRef, useEffect } from 'react';

interface ShoppingCartChallengeProps {
  onComplete: (success: boolean) => void;
  isActive: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  inCart: boolean;
}

const ShoppingCartChallenge: React.FC<ShoppingCartChallengeProps> = ({ onComplete, isActive }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 'laptop', name: 'Laptop', price: 999, inCart: false },
    { id: 'mouse', name: 'Mouse', price: 25, inCart: false },
    { id: 'keyboard', name: 'Keyboard', price: 75, inCart: false }
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOrder, setDraggedOrder] = useState<string[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      // Reset when challenge becomes active
      setProducts(prev => prev.map(p => ({ ...p, inCart: false })));
      setDraggedOrder([]);
    }
  }, [isActive]);

  useEffect(() => {
    // Check if challenge is complete
    if (draggedOrder.length === 3 && draggedOrder.includes('laptop') && draggedOrder.includes('mouse') && draggedOrder.includes('keyboard')) {
      setTimeout(() => onComplete(true), 500);
    }
  }, [draggedOrder, onComplete]);

  const handleDragStart = (e: React.DragEvent, productId: string) => {
    setDraggedItem(productId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setProducts(prev => 
        prev.map(p => 
          p.id === draggedItem ? { ...p, inCart: true } : p
        )
      );
      setDraggedOrder(prev => [...prev, draggedItem]);
      setDraggedItem(null);
    }
  };

  const cartItems = products.filter(p => p.inCart);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!isActive) return null;

  return (
    <div className="shopping-cart-challenge">
      <div className="challenge-header">
        <h3>🛒 Shopping Cart Challenge</h3>
        <p>Drag the items from the products area to the shopping cart in any order!</p>
      </div>
      
      <div className="challenge-content">
        <div className="products-area">
          <h4>Available Products</h4>
          <div className="products-grid">
            {products.filter(p => !p.inCart).map(product => (
              <div
                key={product.id}
                className="product-item"
                draggable
                onDragStart={(e) => handleDragStart(e, product.id)}
                data-testid={`product-${product.id}`}
              >
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="cart-area"
          ref={cartRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-testid="shopping-cart"
        >
          <h4>Shopping Cart</h4>
          <div className="cart-dropzone">
            {cartItems.length === 0 ? (
              <div className="empty-cart">Drop items here</div>
            ) : (
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total: ${total}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="challenge-status">
        Progress: {draggedOrder.length}/3 items added
      </div>
    </div>
  );
};

export default ShoppingCartChallenge;