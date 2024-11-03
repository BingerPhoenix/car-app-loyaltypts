import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Star, 
  Shield, 
  Gift, 
  Check, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { ProgressRing, TierProgress } from '../progress/ProgressIndicators';

const TierCard = ({ tier, isActive, isLocked, progress, benefits }) => {
  const tierIcons = {
    Classic: Star,
    Silver: Shield,
    Gold: Crown,
    Platinum: Gift
  };

  const TierIcon = tierIcons[tier] || Star;

  return (
    <Card className={`relative ${isActive ? 'border-blue-500 shadow-lg' : ''}`}>
      {isActive && (
        <div className="absolute -top-3 left-4">
          <Badge variant="success" className="shadow-sm">
            Current Tier
          </Badge>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TierIcon className={`h-6 w-6 ${
                isLocked ? 'text-gray-400' : 'text-blue-500'
              }`} />
              <h3 className="text-xl font-semibold">{tier}</h3>
            </div>
            {progress && <TierProgress current={progress.current} target={progress.target} />}
          </div>
          {isLocked && <Lock className="h-5 w-5 text-gray-400" />}
        </div>

        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`flex items-start gap-2 ${
                isLocked ? 'text-gray-400' : ''
              }`}
            >
              <Check className={`h-5 w-5 mt-0.5 ${
                isLocked ? 'text-gray-400' : 'text-green-500'
              }`} />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {!isLocked && !isActive && (
          <button className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-colors text-sm flex items-center justify-center gap-2">
            View Requirements
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </CardContent>
    </Card>
  );
};

const TierBenefits = ({ 
  currentTier, 
  tierProgress, 
  allTiers 
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentTier.name} Member
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {tierProgress.pointsToNext.toLocaleString()} points until next tier
              </p>
            </div>
            <ProgressRing 
              progress={tierProgress.percentage} 
              size={100}
              color="#3b82f6"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(allTiers).map(([tierName, tierData]) => (
          <TierCard
            key={tierName}
            tier={tierName}
            isActive={tierName === currentTier.name}
            isLocked={tierData.locked}
            progress={tierData.progress}
            benefits={tierData.benefits}
          />
        ))}
      </div>
    </div>
  );
};

export default TierBenefits;