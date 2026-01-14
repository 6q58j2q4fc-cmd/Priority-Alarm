/**
 * Financing Calculator Component
 * Provides mortgage pre-qualification estimates with adjustable parameters
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  TrendingUp,
  CheckCircle,
  Info,
} from "lucide-react";

interface FinancingCalculatorProps {
  homePrice: number;
  onPreQualify?: (data: PreQualificationData) => void;
}

interface PreQualificationData {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

const LOAN_TERMS = [
  { value: 15, label: "15 Years" },
  { value: 20, label: "20 Years" },
  { value: 30, label: "30 Years" },
];

const RATE_SCENARIOS = [
  { rate: 5.5, label: "Excellent Credit (740+)", description: "Best available rates" },
  { rate: 6.0, label: "Good Credit (700-739)", description: "Competitive rates" },
  { rate: 6.5, label: "Fair Credit (660-699)", description: "Standard rates" },
  { rate: 7.0, label: "Average Credit (620-659)", description: "Higher rates apply" },
];

export default function FinancingCalculator({
  homePrice,
  onPreQualify,
}: FinancingCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Calculate mortgage details
  const calculations = useMemo(() => {
    const downPayment = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - loanAmount;

    // Property tax and insurance estimates (annual)
    const propertyTax = homePrice * 0.01; // 1% of home value
    const homeInsurance = homePrice * 0.003; // 0.3% of home value
    const pmi = downPaymentPercent < 20 ? loanAmount * 0.005 : 0; // PMI if < 20% down

    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyPMI = pmi / 12;
    const totalMonthly = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

    return {
      homePrice,
      downPayment,
      downPaymentPercent,
      loanAmount,
      interestRate,
      loanTerm,
      monthlyPayment,
      totalInterest,
      totalCost,
      propertyTax,
      homeInsurance,
      pmi,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
    };
  }, [homePrice, downPaymentPercent, interestRate, loanTerm]);

  const handlePreQualify = () => {
    if (onPreQualify) {
      onPreQualify({
        homePrice: calculations.homePrice,
        downPayment: calculations.downPayment,
        downPaymentPercent: calculations.downPaymentPercent,
        loanAmount: calculations.loanAmount,
        interestRate: calculations.interestRate,
        loanTerm: calculations.loanTerm,
        monthlyPayment: calculations.monthlyPayment,
        totalInterest: calculations.totalInterest,
        totalCost: calculations.totalCost,
      });
    }
  };

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg text-timber flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber" />
          Financing Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Estimate your monthly payments and explore financing options
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Home Price Display */}
        <div className="bg-gradient-to-r from-amber/10 to-timber/10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Home Price</span>
            <span className="font-display text-2xl font-semibold text-timber">
              ${homePrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Down Payment Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-timber flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber" />
              Down Payment
            </label>
            <div className="text-right">
              <span className="font-display text-lg font-semibold text-timber">
                ${calculations.downPayment.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                ({downPaymentPercent}%)
              </span>
            </div>
          </div>
          <Slider
            value={[downPaymentPercent]}
            onValueChange={(value) => setDownPaymentPercent(value[0])}
            min={5}
            max={50}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5%</span>
            <span>20%</span>
            <span>35%</span>
            <span>50%</span>
          </div>
          {downPaymentPercent < 20 && (
            <p className="text-xs text-amber flex items-center gap-1">
              <Info className="w-3 h-3" />
              PMI required for down payments under 20%
            </p>
          )}
        </div>

        {/* Interest Rate Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-timber flex items-center gap-2">
            <Percent className="w-4 h-4 text-amber" />
            Interest Rate Scenario
          </label>
          <div className="grid grid-cols-2 gap-2">
            {RATE_SCENARIOS.map((scenario) => (
              <button
                key={scenario.rate}
                onClick={() => setInterestRate(scenario.rate)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  interestRate === scenario.rate
                    ? "border-amber bg-amber/10"
                    : "border-border hover:border-amber/50"
                }`}
              >
                <div className="font-display font-semibold text-timber">
                  {scenario.rate}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {scenario.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Loan Term Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-timber flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber" />
            Loan Term
          </label>
          <Select
            value={loanTerm.toString()}
            onValueChange={(value) => setLoanTerm(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LOAN_TERMS.map((term) => (
                <SelectItem key={term.value} value={term.value.toString()}>
                  {term.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Monthly Payment Summary */}
        <div className="bg-timber text-white rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Estimated Monthly Payment</span>
            <span className="font-display text-3xl font-bold">
              ${Math.round(calculations.totalMonthly).toLocaleString()}
            </span>
          </div>
          
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-amber text-sm underline"
          >
            {showBreakdown ? "Hide" : "Show"} payment breakdown
          </button>

          {showBreakdown && (
            <div className="space-y-2 pt-2 border-t border-white/20">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Principal & Interest</span>
                <span>${Math.round(calculations.monthlyPayment).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Property Tax (est.)</span>
                <span>${Math.round(calculations.monthlyPropertyTax).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Home Insurance (est.)</span>
                <span>${Math.round(calculations.monthlyInsurance).toLocaleString()}</span>
              </div>
              {calculations.monthlyPMI > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">PMI</span>
                  <span>${Math.round(calculations.monthlyPMI).toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loan Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone/30 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Loan Amount</div>
            <div className="font-display font-semibold text-timber">
              ${calculations.loanAmount.toLocaleString()}
            </div>
          </div>
          <div className="bg-stone/30 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Total Interest</div>
            <div className="font-display font-semibold text-timber">
              ${Math.round(calculations.totalInterest).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Pre-Qualification CTA */}
        <div className="space-y-3">
          <Button
            onClick={handlePreQualify}
            className="w-full bg-amber text-timber hover:bg-amber/90 font-body font-semibold"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Get Pre-Qualified
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Connect with our preferred lenders for personalized rates
          </p>
        </div>

        {/* Qualification Checklist */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-timber mb-3">
            Pre-Qualification Requirements
          </h4>
          <div className="space-y-2">
            {[
              "Proof of income (W-2s, pay stubs)",
              "Credit score of 620 or higher",
              "Debt-to-income ratio under 43%",
              "Down payment funds verification",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
