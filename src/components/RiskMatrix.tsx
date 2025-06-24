import React from 'react';

interface RiskMatrixProps {
  selectedLikelihood?: number;
  selectedImpact?: number;
  onCellClick?: (likelihood: number, impact: number) => void;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({
  selectedLikelihood,
  selectedImpact,
  onCellClick,
}) => {
  const likelihoods = [5, 4, 3, 2, 1];
  const impacts = [1, 2, 3, 4, 5];

  const getCellColor = (likelihood: number, impact: number) => {
    const score = likelihood * impact;
    if (score >= 17) return 'bg-red-500/50 hover:bg-red-500/70';
    if (score >= 10) return 'bg-yellow-500/50 hover:bg-yellow-500/70';
    if (score >= 4) return 'bg-yellow-300/50 hover:bg-yellow-300/70';
    return 'bg-green-500/50 hover:bg-green-500/70';
  };

  const isSelected = (likelihood: number, impact: number) =>
    likelihood === selectedLikelihood && impact === selectedImpact;

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      {/* Main matrix container */}
      <div className="relative">
        {/* Impact label at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
          <span className="text-xl font-bold text-gray-700">Impact</span>
        </div>

        {/* Likelihood label on left */}
        <div className="absolute left-0 top-1/2 transform -translate-x-12 -translate-y-1/2">
          <span className="text-xl font-bold text-gray-700" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Likelihood
          </span>
        </div>

        <div className="flex">
          {/* Numbers container */}
          <div className="flex flex-col items-end mr-6">
            {/* Empty top space */}
            <div className="h-12"></div>
            {/* Likelihood numbers */}
            {likelihoods.map((likelihood) => (
              <div
                key={likelihood}
                className="h-16 w-8 flex items-center justify-center font-semibold text-gray-600"
              >
                {likelihood}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            {/* Impact numbers */}
            <div className="flex mb-2">
              {impacts.map((impact) => (
                <div
                  key={impact}
                  className="w-16 h-10 flex items-center justify-center font-semibold text-gray-600"
                >
                  {impact}
                </div>
              ))}
            </div>

            {/* Matrix cells */}
            <div className="grid grid-cols-5 gap-0.5 bg-gray-200">
              {likelihoods.map((likelihood) =>
                impacts.map((impact) => {
                  const score = likelihood * impact;
                  return (
                    <button
                      key={`${likelihood}-${impact}`}
                      onClick={() => onCellClick?.(likelihood, impact)}
                      className={`
                        w-16 h-16 flex items-center justify-center text-gray-700 font-medium
                        ${getCellColor(likelihood, impact)}
                        ${isSelected(likelihood, impact) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        transition-all duration-200 hover:scale-105
                      `}
                    >
                      {score}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500/50"></div>
          <span className="text-sm">Low (1-3)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300/50"></div>
          <span className="text-sm">Medium (4-9)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500/50"></div>
          <span className="text-sm">High (10-16)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500/50"></div>
          <span className="text-sm">Critical (17-25)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskMatrix;