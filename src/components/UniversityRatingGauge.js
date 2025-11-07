import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const UniversityRatingGauge = ({ rating = 4.2 }) => {
  // Rating ko 0-100 scale mein convert karo
  const percentage = (rating / 5) * 100;
  
  // Data for gauge chart
  const data = [
    { name: 'Rating', value: percentage },
    { name: 'Remaining', value: 100 - percentage }
  ];
  
  // Star rating calculation
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  
  return (
    <div className="star_rating">
      <div className="gauge-wrapper">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#ff5252', stopOpacity: 1 }} />
              <stop offset="30%" style={{ stopColor: '#ffb300', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#fdd835', stopOpacity: 1 }} />
              <stop offset="70%" style={{ stopColor: '#9ccc65', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#66bb6a', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="gauge-container-modern">
          <div className="gauge-chart-area">
            <PieChart width={280} height={180}>
              <Pie
                data={data}
                cx={140}
                cy={140}
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill="url(#gaugeGradient)" stroke="none" />
                <Cell fill="#e0e0e0" stroke="none" />
              </Pie>
            </PieChart>
          </div>
          
          {/* Center Text */}
          <div className="gauge-content">
            <div className="gauge-label-text">Overall Rating</div>
            <div className="gauge-rating-number">
              {rating.toFixed(1)}
              <span className="rating-max"> /5</span>
            </div>
            
            {/* Star Rating Display */}
            <div className="star-display">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFull = star <= fullStars;
                const isHalf = star === fullStars + 1 && hasHalf;
                
                return (
                  <div key={star} className="star-wrapper">
                    {/* Background star (gray) */}
                    <svg className="star-bg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    
                    {/* Filled star (yellow/gold) */}
                    {(isFull || isHalf) && (
                      <div className="star-fill" style={{ width: isHalf ? '50%' : '100%' }}>
                        <svg className="star-filled" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gauge-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .gauge-container-modern {
          position: relative;
        }

        .gauge-chart-area {
          position: relative;
          width: 280px;
          height: 180px;
        }

        .gauge-content {
          position: absolute;
          top: 120px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
        }

        .gauge-label-text {
          font-size: 13px;
          color: #666;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .gauge-rating-number {
          font-size: 48px;
          font-weight: 700;
          color: #333;
          line-height: 1;
          margin-bottom: 12px;
        }

        .rating-max {
          font-size: 18px;
          font-weight: 400;
          color: #999;
        }

        .star-display {
          display: flex;
          align-items: center;
          gap: 4px;
          justify-content: center;
        }

        .star-wrapper {
          position: relative;
          width: 28px;
          height: 28px;
        }

        .star-bg {
          width: 28px;
          height: 28px;
          color: #d1d5db;
          position: absolute;
          top: 0;
          left: 0;
        }

        .star-fill {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          height: 100%;
        }

        .star-filled {
          width: 28px;
          height: 28px;
          color: #fbbf24;
        }

        @media (max-width: 768px) {
          .gauge-container-modern {
            width: 260px;
            height: 260px;
          }

          .gauge-chart-area {
            width: 260px;
            height: 160px;
          }

          .gauge-rating-number {
            font-size: 42px;
          }

          .star-wrapper {
            width: 24px;
            height: 24px;
          }

          .star-bg,
          .star-filled {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default UniversityRatingGauge;