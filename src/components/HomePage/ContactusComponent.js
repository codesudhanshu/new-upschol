
import { LeadsAdd } from '@/app/api/candidate/HomePage';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await LeadsAdd(formData)

      if (result.status == true) {
        // Success message with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#7004e5'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
      } else {
        // Error message with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.message || 'Something went wrong!',
          confirmButtonColor: '#7004e5'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Network error! Please try again.',
        confirmButtonColor: '#7004e5'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-us my-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="left-side">
              <h2>Upschol Learner Support</h2>
              <p>Have questions or need guidance? Our team is here to help you every step of the way. Reach out for personalized support.</p>
              <div className="cards-list">
                <div className="card d-block border-0 py-4 ps-4">
                  <a 
                    href="https://wa.me/+919810102541?text=Hello%20there!" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="d-flex justify-content-between align-items-center text-decoration-none"
                  >
                    <div className="content">
                      <p className="mb-0"><b>WhatsApp Number</b></p>
                      <small style={{color: '#000'}}>Connect with us on WhatsApp</small>
                    </div>
                    <img src="/images/whatsappicons-new.png" alt="WhatsApp" />
                  </a>
                </div>
                
                <div className="card d-block mt-3 border-0 py-4 ps-4">
                  <a 
                    href="mailto:info@upschol.com" 
                    className="d-flex justify-content-between align-items-center text-decoration-none"
                  >
                    <div className="content">
                      <p className="mb-0"><b>Send Email</b></p>
                      <small style={{color: '#000'}}>Send us your email</small>
                    </div>
                    <img src="/images/emailicons-new.png" alt="Email Icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card border-0 contact-card align-items-center justify-content-center p-4 mt-s-10">
              <form id="contactForm" onSubmit={handleSubmit} className='col-md-12'>
                
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group my-3">
                  <input 
                    type="email" 
                    id="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    className="form-control" 
                    name="phoneNumber" 
                    maxLength="10"
                    placeholder="Mobile Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group my-3">
                  <textarea 
                    className="form-control" 
                    rows="5"
                    placeholder="Write down your query..."
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <button 
                    type="submit" 
                    className="btn w-100"
                    disabled={loading}
                    style={{backgroundColor: "#7004e5", color: 'white'}}
                  >
                    {loading ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-us .left-side {
          max-width: 450px;
        }

        .contact-us .left-side .card {
          position: relative;
        }

        .contact-us .left-side .card img {
          position: absolute;
          right: 0;
          bottom: 0;
        }

        @media (max-width: 800px) {
          .contact-us .left-side {
            max-width: 100%;
          }
        }

        .btn-red {
          background-color: #7004e5;
          color: white;
          border: none;
          padding: 10px 20px;
        }

        .btn-red:hover:not(:disabled) {
          background-color: #c82333;
        }

        .btn-red:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}