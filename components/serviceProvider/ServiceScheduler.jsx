import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Car,
  Tool,
  AlertTriangle,
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const TimeSlot = ({ slot, selected, onSelect, isAvailable }) => (
  <button
    className={`w-full p-3 rounded-lg text-sm font-medium transition-all
      ${isAvailable 
        ? selected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-50 hover:bg-gray-100'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }`}
    onClick={() => isAvailable && onSelect(slot)}
    disabled={!isAvailable}
  >
    <div className="flex items-center justify-between">
      <span>{slot.time}</span>
      {isAvailable && (
        <Badge variant={slot.priority ? 'success' : 'secondary'} className="text-xs">
          {slot.priority ? 'Priority' : 'Available'}
        </Badge>
      )}
    </div>
  </button>
);

const ServiceOption = ({ service, selected, onSelect }) => (
  <Card 
    className={`cursor-pointer transition-all ${
      selected ? 'border-blue-500 shadow-md' : 'hover:shadow-sm'
    }`}
    onClick={() => onSelect(service)}
  >
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          selected ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Tool className={`h-5 w-5 ${
            selected ? 'text-blue-500' : 'text-gray-500'
          }`} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{service.name}</h4>
          <p className="text-sm text-gray-500 mt-1">
            {service.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-blue-600">
              From ${service.price}
            </span>
            <span className="text-sm text-gray-500">
              ~{service.duration} mins
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const VehicleSelector = ({ vehicles, selected, onSelect }) => (
  <div className="grid grid-cols-2 gap-4">
    {vehicles.map((vehicle) => (
      <Card
        key={vehicle.id}
        className={`cursor-pointer transition-all ${
          selected?.id === vehicle.id ? 'border-blue-500 shadow-md' : 'hover:shadow-sm'
        }`}
        onClick={() => onSelect(vehicle)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Car className={`h-5 w-5 ${
              selected?.id === vehicle.id ? 'text-blue-500' : 'text-gray-500'
            }`} />
            <div>
              <h4 className="font-medium">{vehicle.make} {vehicle.model}</h4>
              <p className="text-sm text-gray-500">
                {vehicle.year} • {vehicle.vin}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ScheduleCalendar = ({ selectedDate, onDateSelect, availableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(currentMonth);
  const days = [...Array(daysInMonth)].map((_, i) => i + 1);

  const isDateAvailable = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return availableDates.some(d => d.getTime() === date.getTime());
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-medium">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-gray-500 py-2">
            {day}
          </div>
        ))}

        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map(day => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isAvailable = isDateAvailable(day);
          const isSelected = selectedDate?.toDateString() === date.toDateString();

          return (
            <button
              key={day}
              onClick={() => isAvailable && onDateSelect(date)}
              disabled={!isAvailable}
              className={`p-2 rounded-lg text-center ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : isAvailable
                    ? 'hover:bg-gray-100'
                    : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ServiceScheduler = ({ provider, onScheduleComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Mock data
  const services = [
    {
      id: 1,
      name: 'Annual Maintenance',
      description: 'Comprehensive annual service package',
      price: 1200,
      duration: 180
    },
    // Add more services
  ];

  const vehicles = [
    {
      id: 1,
      make: 'Ferrari',
      model: 'F8 Tributo',
      year: 2023,
      vin: 'XXX123'
    },
    // Add more vehicles
  ];

  const timeSlots = [
    { time: '9:00 AM', priority: true },
    { time: '10:30 AM', priority: false },
    // Add more time slots
  ];

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Select Service</h3>
            <div className="space-y-3">
              {services.map(service => (
                <ServiceOption
                  key={service.id}
                  service={service}
                  selected={selectedService?.id === service.id}
                  onSelect={setSelectedService}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Select Vehicle</h3>
            <VehicleSelector
              vehicles={vehicles}
              selected={selectedVehicle}
              onSelect={setSelectedVehicle}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Select Date & Time</h3>
            <ScheduleCalendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              availableDates={[new Date()]} // Add actual available dates
            />
            {selectedDate && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot, index) => (
                    <TimeSlot
                      key={index}
                      slot={slot}
                      selected={selectedTime?.time === slot.time}
                      onSelect={setSelectedTime}
                      isAvailable={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Confirm Details</h3>
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Service</div>
                  <div className="font-medium">{selectedService?.name}</div>
                  <div className="text-sm text-blue-600">
                    ${selectedService?.price}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Vehicle</div>
                  <div className="font-medium">
                    {selectedVehicle?.make} {selectedVehicle?.model}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedVehicle?.year}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Date & Time</div>
                  <div className="font-medium">
                    {selectedDate?.toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedTime?.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((stepNum) => (
          <div
            key={stepNum}
            className={`flex items-center ${
              stepNum !== 4 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${step >= stepNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-500'
                }`}
            >
              {step > stepNum ? (
                <Check className="h-5 w-5" />
              ) : (
                stepNum
              )}
            </div>
            {stepNum !== 4 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step > stepNum ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            if (step === 4) {
              onScheduleComplete({
                service: selectedService,
                vehicle: selectedVehicle,
                date: selectedDate,
                time: selectedTime
              });
            } else {
              setStep(step + 1);
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {step === 4 ? 'Confirm Booking' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ServiceScheduler;