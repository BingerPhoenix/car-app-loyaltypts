import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-yellow-500 fill-yellow-500' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h4 className="font-medium">{review.authorName}</h4>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge variant={review.verified ? 'success' : 'secondary'}>
            {review.verified ? 'Verified Service' : 'User Review'}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            {renderStars(review.rating)}
            <span className="text-sm text-gray-500 ml-2">
              {review.rating.toFixed(1)}
            </span>
          </div>

          {review.serviceType && (
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{review.serviceType}</Badge>
              <span className="text-sm text-gray-500">
                ${review.serviceCost.toLocaleString()}
              </span>
            </div>
          )}

          <p className="text-gray-600 mt-2">{review.content}</p>

          {review.response && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Provider Response</Badge>
                <span className="text-sm text-gray-500">
                  {new Date(review.response.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{review.response.content}</p>
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-blue-500">
              <ThumbsUp className="h-4 w-4" />
              Helpful ({review.helpfulCount})
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageSquare className="h-4 w-4" />
              Reply
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewsSection = ({ providerId }) => {
  // In a real app, fetch reviews based on providerId
  const reviews = [
    {
      id: 1,
      authorName: "John D.",
      date: "2024-03-15",
      rating: 5,
      content: "Exceptional service! The team went above and beyond...",
      serviceType: "Annual Maintenance",
      serviceCost: 2500,
      verified: true,
      helpfulCount: 12,
      response: {
        date: "2024-03-16",
        content: "Thank you for your kind words, John! We're glad..."
      }
    }
    // Add more reviews as needed
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Average Rating</div>
            <div className="text-3xl font-bold text-blue-600 mt-1">4.9</div>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Verified Reviews</div>
            <div className="text-3xl font-bold text-green-600 mt-1">95%</div>
            <div className="text-sm text-gray-500 mt-2">
              Based on recent services
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Review Count</div>
            <div className="text-3xl font-bold text-purple-600 mt-1">128</div>
            <div className="text-sm text-gray-500 mt-2">
              In the last 12 months
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;