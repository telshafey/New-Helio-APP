import React from 'react';
import { StarIcon } from '../common/Icons';

const Rating: React.FC<{ rating: number; size?: string; }> = ({ rating, size = 'w-5 h-5' }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`${size} ${ i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600' }`} />
        ))}
    </div>
);

export default Rating;
