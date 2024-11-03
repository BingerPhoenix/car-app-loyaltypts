import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const FilterSelect = ({ 
  value, 
  onChange, 
  options, 
  placeholder,
  className = "" 
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`p-2 border rounded-lg w-full bg-white ${className}`}
  >
    <option value="">{placeholder}</option>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const ProviderFilters = ({ filters, setFilters }) => {
  const filterOptions = {
    type: [
      { value: "Official Dealership", label: "Official Dealership" },
      { value: "Specialist Workshop", label: "Specialist Workshop" },
      { value: "Performance Center", label: "Performance Center" }
    ],
    brand: [
      { value: "Ferrari", label: "Ferrari" },
      { value: "Lamborghini", label: "Lamborghini" },
      { value: "McLaren", label: "McLaren" },
      { value: "Porsche", label: "Porsche" }
    ],
    service: [
      { value: "maintenance", label: "Maintenance" },
      { value: "performance", label: "Performance" },
      { value: "track", label: "Track Support" },
      { value: "bodywork", label: "Body Work" },
      { value: "detailing", label: "Detailing" }
    ],
    location: [
      { value: "Los Angeles", label: "Los Angeles" },
      { value: "Orange County", label: "Orange County" },
      { value: "San Diego", label: "San Diego" }
    ]
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="bg-gray-50">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterSelect
            value={filters.type}
            onChange={(value) => handleFilterChange('type', value)}
            options={filterOptions.type}
            placeholder="All Types"
          />
          <FilterSelect
            value={filters.brand}
            onChange={(value) => handleFilterChange('brand', value)}
            options={filterOptions.brand}
            placeholder="All Brands"
          />
          <FilterSelect
            value={filters.service}
            onChange={(value) => handleFilterChange('service', value)}
            options={filterOptions.service}
            placeholder="All Services"
          />
          <FilterSelect
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
            options={filterOptions.location}
            placeholder="All Locations"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderFilters;