import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Eye, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.wishlist);
  const isWished = wishlist.includes(product._id);
  const [imgLoaded, setImgLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm
      hover:shadow-xl transition-all duration-300 overflow-hidden
      border border-gray-100 dark:border-gray-700 animate-fade-in">

      {/* Image */}
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden">
        {!imgLoaded && (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <img
          src={product.images?.[0]?.url || '/placeholder.jpg'}
          alt={product.title}
          className={`w-full h-48 object-cover transition-all duration-500
            group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
          onLoad={() => setImgLoaded(true)}
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-green-500 text-white
            text-xs font-bold px-2 py-0.5 rounded-full">
            {discount}% OFF
          </span>
        )}
        <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5
          rounded-full ${product.condition === 'New'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-amber-100 text-amber-700'}`}>
          {product.condition}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product._id}`}>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm
              line-clamp-2 hover:text-primary-500 transition-colors">
              {product.title}
            </h3>
          </Link>
          <button
            onClick={() => dispatch(toggleWishlist(product._id))}
            className="ml-2 p-1.5 rounded-full hover:bg-gray-100
              dark:hover:bg-gray-700 transition-colors shrink-0">
            <Heart className={`h-4 w-4 ${isWished
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400'}`} />
          </button>
        </div>

        <div className="flex items-baseline space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500
          dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {product.location || product.college}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {product.views}
          </span>
        </div>
      </div>
    </div>
  );
}