import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Calendar } from 'lucide-react';

const RewardCard = ({ reward, onRedeem }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{reward.title}</h4>
          <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="secondary">
              {reward.category}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Valid until {reward.validUntil}
            </span>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="points" className="mb-2">
            {reward.points} points
          </Badge>
          <button
            onClick={() => onRedeem(reward)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              transition-colors text-sm w-full"
            disabled={reward.points > reward.availablePoints}
          >
            {reward.points > reward.availablePoints ? 'Not Enough Points' : 'Redeem'}
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RewardsSection = ({ rewards, availablePoints, onRedeemReward }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Available Rewards
        </CardTitle>
        <p className="text-sm text-gray-500">
          You have {availablePoints.toLocaleString()} points available to redeem
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={{
                ...reward,
                availablePoints
              }}
              onRedeem={onRedeemReward}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsSection;