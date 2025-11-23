import React, { useEffect, useRef } from 'react';

const UniversityRatingGauge = ({ rating = 4.0, averageRating = 4.0, digitalInfrastructure = 4.0, curriculum = 3.6, valueForMoney = 3.6 }) => {
  const gaugeCanvasRef = useRef(null);

  useEffect(() => {
    if (gaugeCanvasRef.current) {
      drawGauge(rating);
    }
  }, [rating]);

  const drawGauge = (rating) => {
    const canvas = gaugeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY - 10, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#e8e8e8';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Color segments
    const segments = [
      { start: 0, end: 0.2, color: '#ff5252' },
      { start: 0.2, end: 0.4, color: '#ffb300' },
      { start: 0.4, end: 0.6, color: '#fdd835' },
      { start: 0.6, end: 0.8, color: '#9ccc65' },
      { start: 0.8, end: 1, color: '#66bb6a' }
    ];

    segments.forEach(seg => {
      ctx.beginPath();
      const startAngle = Math.PI + (seg.start * Math.PI);
      const endAngle = Math.PI + (seg.end * Math.PI);
      ctx.arc(centerX, centerY - 10, radius, startAngle, endAngle);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    // Draw needle
    const needleAngle = Math.PI + (rating / 5 * Math.PI);
    const needleLength = radius - 15;

    ctx.save();
    ctx.translate(centerX, centerY - 10);
    ctx.rotate(needleAngle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -needleLength);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.restore();
  };

  const renderStars = (value) => {
    const stars = [];
    const full = Math.floor(value);
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <img 
            key={i} 
            src="/images/star-on.png" 
            alt="Filled Star" 
            style={{ marginTop: '6px', marginBottom: '6px', width: '15px' }}
          />
        );
      } else {
        stars.push(
          <img 
            key={i} 
            src="/images/star-off.png" 
            alt="Empty Star" 
            style={{ marginTop: '6px', marginBottom: '6px', width: '15px' }}
          />
        );
      }
    }
    return stars;
  };

  const getActiveStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const activeIndices = [];
    
    for (let i = 1; i <= fullStars; i++) {
      activeIndices.push(i);
    }
    
    if (hasHalf) {
      activeIndices.push(fullStars + 0.5);
    }
    
    return activeIndices;
  };

  const activeStars = getActiveStars(rating);

  return (
    <div className="star_rating" id="gauge-rating" data-rating={rating}>
      <div className="gauge-container">
        <canvas ref={gaugeCanvasRef} id="gaugeCanvas" className="w-100 h-100" width="177" height="177"></canvas>
        <div className="gauge-text">
          <div className="gauge-label">Overall Ratings :</div>
          <div className="gauge-score">
            <span id="scoreValue">{rating.toFixed(1)}</span>
            <span className="gauge-small"> /of 5</span>
          </div>
          {/* <fieldset className="gauge-container-rate">
            <input type="radio" id="rating10" name="rating" value="5" disabled />
            <label htmlFor="rating10" title="5 stars" className={activeStars.includes(5) ? 'active-star' : ''}></label>
            
            <input type="radio" id="rating9" name="rating" value="4.5" disabled />
            <label className={`half ${activeStars.includes(4.5) ? 'active-star' : ''}`} htmlFor="rating9" title="4.5 stars"></label>
            
            <input type="radio" id="rating8" name="rating" value="4" disabled />
            <label htmlFor="rating8" title="4 stars" className={activeStars.includes(4) ? 'active-star' : ''}></label>
            
            <input type="radio" id="rating7" name="rating" value="3.5" disabled />
            <label className={`half ${activeStars.includes(3.5) ? 'active-star' : ''}`} htmlFor="rating7" title="3.5 stars"></label>
            
            <input type="radio" id="rating6" name="rating" value="3" disabled />
            <label htmlFor="rating6" title="3 stars" className={activeStars.includes(3) ? 'active-star' : ''}></label>
            
            <input type="radio" id="rating5" name="rating" value="2.5" disabled />
            <label className={`half ${activeStars.includes(2.5) ? 'active-star' : ''}`} htmlFor="rating5" title="2.5 stars"></label>
            
            <input type="radio" id="rating4" name="rating" value="2" disabled />
            <label htmlFor="rating4" title="2 stars" className={activeStars.includes(2) ? 'active-star' : ''}></label>
            
            <input type="radio" id="rating3" name="rating" value="1.5" disabled />
            <label className={`half ${activeStars.includes(1.5) ? 'active-star' : ''}`} htmlFor="rating3" title="1.5 stars"></label>
            
            <input type="radio" id="rating2" name="rating" value="1" disabled />
            <label htmlFor="rating2" title="1 star" className={activeStars.includes(1) ? 'active-star' : ''}></label>
            
            <input type="radio" id="rating1" name="rating" value="0.5" disabled />
            <label className={`half ${activeStars.includes(0.5) ? 'active-star' : ''}`} htmlFor="rating1" title="0.5 star"></label>
          </fieldset> */}
        </div>
      </div>

      <div className="col-md-6 col-12 PeripheralRating" style={{ marginLeft: '15%' }}>
        <div className="d-flex flex-column">
          <div className="mb-2">
            <span className="fw-semibold" style={{ float: 'left' }}>Peripheral Rating</span>
            <span style={{ fontSize: '.875rem', color: '#999', float: 'left', fontWeight: 400 }}>(Out of 5)</span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontWeight: 400, fontSize: '13px' }}>Average Ratings</div>
            <div className="d-flex align-items-center">
              <span className="me-3 fw-bold">{averageRating.toFixed(1)}</span>
              <div className="d-flex">
                {renderStars(averageRating)}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontWeight: 400, fontSize: '13px' }}>Digital Infrastructure</div>
            <div className="d-flex align-items-center">
              <span className="me-3 fw-bold">{digitalInfrastructure.toFixed(1)}</span>
              <div className="d-flex">
                {renderStars(digitalInfrastructure)}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontWeight: 400, fontSize: '13px' }}>Curriculum</div>
            <div className="d-flex align-items-center">
              <span className="me-3 fw-bold">{curriculum.toFixed(1)}</span>
              <div className="d-flex">
                {renderStars(curriculum)}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontWeight: 400, fontSize: '13px' }}>Value For Money</div>
            <div className="d-flex align-items-center">
              <span className="me-3 fw-bold">{valueForMoney.toFixed(1)}</span>
              <div className="d-flex">
                {renderStars(valueForMoney)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gauge-container {
          position: relative;
          width: 177px;
          height: 177px;
        }

        .gauge-small {
          font-size: 10px;
          vertical-align: baseline;
          color: #666;
          font-weight: 400;
        }

        .gauge-text {
          position: absolute;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
        }

        .gauge-score {
          font-size: 35px;
          font-weight: 700;
          color: #14141f;
        }

        .gauge-label {
          font-size: 11px;
          color: #666;
        }

        .gauge-container-rate {
          display: inline-block;
          border: 0;
        }

        .gauge-container-rate > input {
          display: none;
        }

        .gauge-container-rate > label {
          float: right;
          transition: color 0.3s ease-in-out;
        }

        .gauge-container-rate > label:before {
          display: inline-block;
          margin: 0;
          cursor: pointer;
          font-family: FontAwesome;
          content: "\\f005 ";
          color: #ddd;
        }

        .gauge-container-rate > label:last-child:before {
          content: "\\f006 ";
        }

        .gauge-container-rate .half:before {
          content: "\\f089 ";
          position: absolute;
          padding-right: 0;
        }

        input:checked ~ label,
        label:hover,
        label:hover ~ label {
          color: #FFD700;
        }

        input:checked + label:hover,
        input:checked ~ label:hover,
        input:checked ~ label:hover ~ label,
        label:hover ~ input:checked ~ label {
          color: #FFC107;
        }

        .gauge-container-rate label.active-star:before {
          color: #FFD700 !important;
        }

        @media (max-width: 540px) {
          .PeripheralRating {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .PeripheralRating {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UniversityRatingGauge;