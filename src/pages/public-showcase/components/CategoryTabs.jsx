import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'all': 'Grid3X3',
    'web': 'Globe',
    'mobile': 'Smartphone',
    'ai-ml': 'Brain',
    'blockchain': 'Link',
    'iot': 'Wifi',
    'gaming': 'Gamepad2',
    'fintech': 'DollarSign',
    'healthtech': 'Heart',
    'edtech': 'GraduationCap',
    'sustainability': 'Leaf'
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => onCategoryChange(category?.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.value
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border'
            }`}
          >
            <Icon 
              name={categoryIcons?.[category?.value] || 'Tag'} 
              size={16} 
            />
            <span>{category?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeCategory === category?.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;