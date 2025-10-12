'use client'
import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, Percent, TrendingUp, Info, Sparkles, ArrowRight } from 'lucide-react';

export default function ModernEMICalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const time = parseFloat(tenure);

    if (principal && rate && time) {
      const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const totalAmountValue = emiValue * time;
      const totalInterestValue = totalAmountValue - principal;

      setEmi(emiValue);
      setTotalAmount(totalAmountValue);
      setTotalInterest(totalInterestValue);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `float 8s ease-in-out infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl blur opacity-30"></div>
                <div className="relative p-4 bg-white shadow-lg rounded-2xl border border-gray-100">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                EMI Calculator
              </h1>
              <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience intelligent loan planning with our modern EMI calculator
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Loan Configuration
                  </h2>
                </div>
                
                <div className="space-y-10">
                  {/* Loan Amount */}
                  <div className="group/input">
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-3 text-gray-700 font-semibold">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md">
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        Loan Amount
                      </label>
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold shadow-lg">
                        {formatCurrency(loanAmount)}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="10000"
                        max="10000000"
                        step="10000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-3">
                      <span>₹10K</span>
                      <span>₹1Cr</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="group/input">
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-3 text-gray-700 font-semibold">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md">
                          <Percent className="w-4 h-4 text-white" />
                        </div>
                        Interest Rate
                      </label>
                      <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold shadow-lg">
                        {interestRate}%
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-blue"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-3">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="group/input">
                    <div className="flex items-center justify-between mb-4">
                      <label className="flex items-center gap-3 text-gray-700 font-semibold">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-md">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        Loan Tenure
                      </label>
                      <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white font-bold shadow-lg">
                        {tenure} months
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="6"
                        max="360"
                        step="6"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-green"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-3">
                      <span>6 months</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>

                {/* Additional Content for Desktop */}
                <div className="mt-10 space-y-6">
                  {/* Loan Tips Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Smart Loan Tips
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p>Lower interest rates significantly reduce your total payment amount</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p>Shorter tenure means higher EMI but lower total interest</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p>Consider prepayment options to reduce interest burden</p>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-8">
              {/* EMI Result - Hero Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                      <h3 className="text-xl font-semibold text-white">
                        Monthly Payment
                      </h3>
                      <ArrowRight className="w-5 h-5 text-white/70 ml-auto" />
                    </div>
                    <div className="text-5xl font-black text-white mb-3 tracking-tight">
                      {formatCurrency(emi)}
                    </div>
                    <p className="text-white/90 text-lg">
                      For {tenure} months at {interestRate}% interest
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Interest</h4>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                      <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Payment</h4>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-slate-300 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                    <Info className="w-6 h-6 text-purple-600" />
                    Payment Breakdown
                  </h3>
                  
                  <div className="">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 text-lg font-medium">Principal Amount</span>
                      <span className="font-bold text-xl text-gray-800">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 text-lg font-medium">Total Interest</span>
                      <span className="font-bold text-xl text-gray-800">
                        {formatCurrency(totalInterest)}
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t-2 border-purple-200">
                      <div className="flex justify-between items-center py-2">
                        <span className="font-bold text-xl text-gray-700">Total Payable</span>
                        <span className="font-black text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {formatCurrency(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Visual Progress Bar */}
                  <div className="mt-8">
                    <div className="flex justify-between text-sm mb-3 text-gray-600">
                      <span className="font-semibold">Principal vs Interest Ratio</span>
                      <span className="font-bold">{Math.round((parseFloat(loanAmount) / totalAmount) * 100)}% Principal</span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50"></div>
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-md"
                        style={{ 
                          width: `${(parseFloat(loanAmount) / totalAmount) * 100}%`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-shimmer"></div>
                      </div>
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 ease-out relative overflow-hidden shadow-md"
                        style={{ 
                          width: `${(totalInterest / totalAmount) * 100}%`,
                          marginLeft: `${(parseFloat(loanAmount) / totalAmount) * 100}%`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-shimmer delay-300"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-sm text-purple-600 font-semibold">● Principal</span>
                      <span className="text-sm text-blue-600 font-semibold">Interest ●</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
          transition: all 0.3s ease;
          border: 2px solid white;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 25px rgba(168, 85, 247, 0.5);
        }

        .slider-blue::-webkit-slider-thumb {
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .slider-blue::-webkit-slider-thumb:hover {
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
        }

        .slider-green::-webkit-slider-thumb {
          background: linear-gradient(45deg, #10b981, #14b8a6);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .slider-green::-webkit-slider-thumb:hover {
          box-shadow: 0 6px 25px rgba(16, 185, 129, 0.5);
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}