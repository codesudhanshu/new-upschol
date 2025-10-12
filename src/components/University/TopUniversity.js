"use client"
import { useState, useEffect } from "react";
import { searchUniversities } from "@/app/api/admin/apiService";
import { getAllCoursesData } from "@/app/api/candidate/HomePage";
import Link from "next/link";
import Image from "next/image";
import { getuniversityById } from "@/app/api/admin/courseapi";


export default function CollegeListingPage() {
  const [universities, setUniversities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    fetchUniversities();
    fetchCategories();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const result = await searchUniversities();
      if (result.status) {
        setUniversities(result.result);
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getAllCoursesData();
      if (result.status && result.result) {
        setAllCategories(result.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addToCompare = (university) => {
    if (compareList.length >= 3) return;
    if (!compareList.find(item => item._id === university._id)) {
      setCompareList([...compareList, university]);
    }
  };

  const removeFromCompare = (universityId) => {
    setCompareList(compareList.filter(item => item._id !== universityId));
  };

 // Generate comparison URL
const getComparisonUrl = () => {
  const urls = compareList.map(uni => {
    return uni?.universityurl || '';
  }).filter(url => url);
  
  return `/compare-universities/${urls.join('-vs-')}`;
};

  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <img key={i} src="/images/star-on.png" alt={`${i+1}`} title="good" />
        );
      } else {
        stars.push(
          <img key={i} src="/images/star-off.png" alt={`${i+1}`} title="good" />
        );
      }
      if (i < 4) stars.push(<>&nbsp;</>);
    }
    
    return (
      <span className="rating" data-score={rating} title="good">
        {stars}
        <input name="score" type="hidden" value={rating} readOnly />
      </span>
    );
  };

  return (
    <>
    <section className="best_colleges">
      <div className="container">
        <div className="programs_listing">
          <div className="search_by_filters">
            <h2>Search By Filters</h2>
            <a className="filters_menu accordion_filter collapsed" data-bs-toggle="collapse" href="#collapseExample" role="button">
              Search By Filters
            </a>

            <div className="collapse" id="collapseExample">
              <div className="specialisations-filter accordion mt-3" id="filter-accordion">
                <form method="GET" action="/university" className="mws-form specialisations_listing" id="filter_form">
                  
                  {/* PG Courses Accordion */}
                  <div className="accordion-item">
                    <h2 className="accordion-header collapsed">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                        PG Courses
                      </button>
                    </h2>
                    <div id="collapse1" className="accordion-collapse collapse" data-bs-parent="#filter-accordion">
                      <div className="accordion-body">
                        <div className="course_filters">
                          <div className="form-group mb-2 course-search-toggle-wrapper">
                            <h5 className="mb-3 fw-semibold" style={{color: 'white'}}>🎓 Course</h5>
                            <input type="text" id="courseSearchInput1" className="form-control" placeholder="Search courses..." />
                          </div>
                          <div id="courseList1">
                            {/* Courses will be populated here */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other accordion items... */}

                </form>
              </div>
              
              <div className="form-check mt-2 ps-0">
                <a href="/university" className="btn btn-primary">Clear All</a>
              </div>
            </div>
          </div>

          {/* University Listing */}
          <div className="best_college_listing">
            <ul className="management_listing my-0 university-data">
              {loading ? (
                <li>Loading universities...</li>
              ) : (
                universities.map((university) => (
                  <li key={university._id}>
                    <div className="card">
                      {/* Slider */}
                      <div className="slider responsive responsive1">
                        <div className="slick-list draggable">
                          <div className="slick-track">
                            <div className="slick-slide slick-current slick-active">
                              <Image
                                src={university.bannerImage || "/default-banner.jpg"}
                                alt={university.title}
                                width={328}
                                height={200}
                                className="w-100"
                              />
                            </div>
                          </div>
                        </div>
                       
                      </div>

                      <div className="card-body">
                        <div className="management_logo">
                          <Link href={`/university/${university.universityurl}`} className="text-decoration-none text-dark">
                            <figure className="university_logo_explore_program">
                              <Image
                                src={university.logo || "/default-logo.png"}
                                alt="University Logo"
                                width={80}
                                height={80}
                              />
                            </figure>
                          </Link>
                        </div>

                        <Link href={`/university/${university.universityurl}`} className="text-decoration-none text-dark">
                          <h4 className="card-title">{university.title}</h4>
                        </Link>

                        <div className="star_rating">
                          <StarRating rating={university.rating} />
                        </div>

                        <div className="download">
                          <a className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img src="/images/download.svg" alt="" /> Download Prospectus
                          </a>
                        </div>

                        <h6>
                          {university.affiliations?.join(', ')}
                        </h6>
                      </div>

                      <div className="card-footer d-flex">
                        <div className="form-check">
                          <div>
                           <input
  className="form-check-input addToCompare"
  type="checkbox"
  checked={compareList.some(item => item._id === university._id)}
  onChange={() => {
    const isAdded = compareList.some(item => item._id === university._id);
    if (isAdded) {
      removeFromCompare(university._id);
    } else {
      addToCompare(university);
      setShowCompareModal(true); // only call when adding
    }
  }}
  id={`Addtocompare${university._id}`}
/>

                            <label className="form-check-label" htmlFor={`Addtocompare${university._id}`}>
                              Add to compare
                            </label>
                          </div>
                        </div>
                        <Link href={`/university/${university.universityurl}`} className="btn btn-primary">
                          View details
                        </Link>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>

            {universities.length > 0 && (
              <div className="collage_listing_btn seemore">
                <a className="btn btn-primary view_more" href="javascript:void(0);">View More</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="modal fade show" id="compareModal" style={{display: 'block'}}>
        <div
  className="modal-dialog modal-dialog-centered modal-lg"
  style={{
    margin: 0,
    "--bs-modal-width": "100%"
  }}
>

            <div className="modal-content" style={{maxHeight: '100vh', overflowY: 'auto'}}>
              <div className="modal-body" style={{maxHeight: '100vh', overflowY: 'auto'}}>
                <button type="button" className="btn-close" onClick={() => setShowCompareModal(false)}></button>
                <div className="compareList">
                  <h2>Add University To Compare</h2>
                  <div id="universityCompareList">

                    <div className="scroll-container" style={{width: '100% !important', overflowX: 'auto !important', whiteSpace: 'nowrap !important', paddingBottom: '10px !important'}}>
                      <ul className="universities-list d-flex flex-nowrap gap-3 p-2 list-unstyled">
                        {universities.slice(0, 10).map((uni) => (
                          <li key={uni._id} className="flex-shrink-0">
                            <div className="card d-flex flex-column" style={{'--bs-card-bg': 'none', width: '18rem', height: '14rem', boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)'}}>
                              <figure style={{boxShadow: 'none !important'}}>
                                <Image
                                  src={uni.logo || "/default-logo.png"}
                                  alt={uni.title}
                                  width={120}
                                  height={43}
                                  className="img-fluid"
                                />
                              </figure>
                              <div className="card-body d-flex flex-column" style={{flexGrow: '1 !important', display: 'flex !important', flexDirection: 'column !important', justifyContent: 'space-between !important'}}>
                                <h5 className="card-title" style={{textAlign: 'center !important', fontSize: '13px', fontWeight: '600'}}>
                                  {uni.title}
                                </h5>
                                <p className="card-text text-center"></p>
                                <a
                                  href="#"
                                  className={`btn custom-btn ${compareList.find(item => item._id === uni._id) ? 'compare-added-btn' : ''}`}
                                  id={`add-to-list-${uni._id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addToCompare(uni);
                                  }}
                                >
                                  <span className="btn-icon">+</span>
                                  <span className="btn-text">Add to List</span>
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ul className="university-compare-list universities-list d-flex flex-nowrap gap-3 p-2 list-unstyled" style={{overflow: 'auto !important', justifyContent: 'space-around'}}>
                      {compareList.map((uni) => (
                        <li key={uni._id} className="university-card d-flex flex-shrink-0" style={{width: '18rem', height: '18rem'}}>
                          <div className="course_details card flex-grow-1">
                            <a href="javascript:void(0);" className="remove-btn" onClick={() => removeFromCompare(uni._id)}>
                              <img src="/images/close.svg" alt="Img" />
                            </a>
                            <div className="otheruniversities_img">
                              <figure>
                                <Image
                                  src={uni.logo || "/default-logo.png"}
                                  alt={uni.title}
                                  width={120}
                                  height={43}
                                />
                              </figure>
                            </div>
                            <div className="card-body text-center">
                              <h5 style={{fontSize: '13px', fontWeight: '600'}}>{uni.title}</h5>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="compare-btn d-flex justify-content-center">
                      <input type="hidden" name="ids[]" id="universityIDs" value={compareList.map(uni => uni._id).join(',')} />
                      <Link href={getComparisonUrl()} className="btn btn-primary" id="compare-now-btn">
                        Compare Now
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
    <style jsx>{`
     /* Base styles (desktop view) */
table {
    font-size: 1rem;
    word-break: break-word;
}
table th, table td {
    padding: 0.75rem;
    line-height: 1.5;
}

/* Medium screen (tablet) */
@media (max-width: 768px) {
    table {
        font-size: 0.875rem;
    }
    table th,
    table td {
        padding: 0.5rem;
    }
}

/* Small screen (mobile) */
@media (max-width: 480px) {
    table {
        font-size: 0.75rem;
    }
    table th,
    table td {
        padding: 0.3rem;
        line-height: 1.4;
    }

    /* Make sure long words break */
    table td, table th {
        word-break: break-word;
        hyphens: auto;
    }

    /* Optional: Set max-height and scroll for overflow (if many rows) */
    .table-wrapper {
        overflow-x: auto;
    }
}
a.btn.custom-btn {
		background-color: #EC1C24;
		color: #fff;
		animation: AnimatedYoutube_pulse__NaxCe 1s infinite;
	}
	@keyframes AnimatedYoutube_pulse__NaxCe {
		0% {
			box-shadow: 0 0 0 5px #ea8282;
		}
		100% {
			box-shadow: 0 0 0 10px transparent;
		}
	}
	.compare-added-btn  {
		background-color: green !important;
		color: #fff !important;
		animation: added_AnimatedYoutube_pulse__NaxCe 1s infinite !important;
	}
	@keyframes added_AnimatedYoutube_pulse__NaxCe {
		0% {
			box-shadow: 0 0 0 5px green;
		}
		100% {
			box-shadow: 0 0 0 10px transparent;
		}
	}

    .course-item.checked {
  background-color: black; /* or your preferred color */
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.specialisation-list {
    max-height: 250px;
    overflow-y: auto;
    padding: 10px 15px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

 .course-item.checked {
  background-color: black; /* or your preferred color */
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

        .specialisation-list.collapse {
            // display: none;
        }

        .specialisation-list.show {
            display: block;
        }

        .course-wrapper {
            margin-bottom: 1rem;
        }

        .course-search-toggle-wrapper,
        .spec-search-toggle-wrapper {
            position: relative;
        }

        .search-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #555;
            z-index: 2;
        }

        .course-search-toggle-wrapper input,
        .spec-search-toggle-wrapper input {
            padding-right: 30px;
        }
    `}</style>
    </>
  );
}