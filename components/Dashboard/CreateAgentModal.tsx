"use client";

import { useState, useEffect } from 'react';
import { X, Info, ArrowRight, Check, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface TradingPair {
    value: string;
    label: string;
    icon: string;
}

interface Frequency {
    value: string;
    label: string;
}

interface Weekday {
    value: string;
    label: string;
}

interface CreateAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateAgent: (agentData: any) => void;
    agentType: 'market-making' | 'dca';
}

interface FormData {
    type: 'market-making' | 'dca';
    name: string;
    pair: string;
    initialBalance: number;
    // Market making specific
    spreadPercentage: number;
    maxOrderSize: number;
    rebalanceThreshold: number;
    // DCA specific
    frequency: string;
    amount: number;
    day: string;
}

interface FormErrors {
    name?: string;
    pair?: string;
    initialBalance?: string;
    spreadPercentage?: string;
    maxOrderSize?: string;
    rebalanceThreshold?: string;
    frequency?: string;
    amount?: string;
    day?: string;
}

const TRADING_PAIRS: TradingPair[] = [
    { value: 'BTC/USDT', label: 'BTC/USDT', icon: '₿' },
    { value: 'ETH/USDT', label: 'ETH/USDT', icon: 'Ξ' },
    { value: 'NEAR/USDT', label: 'NEAR/USDT', icon: 'Ⓝ' },
    { value: 'SOL/USDT', label: 'SOL/USDT', icon: 'Ⓢ' },
    { value: 'AVAX/USDT', label: 'AVAX/USDT', icon: 'A' },
    { value: 'DOT/USDT', label: 'DOT/USDT', icon: '◉' },
];

const FREQUENCIES: Frequency[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
];

const WEEKDAYS: Weekday[] = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
];

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
    isOpen,
    onClose,
    onCreateAgent,
    agentType = 'market-making'
}) => {
    const [formData, setFormData] = useState<FormData>({
        type: agentType,
        name: '',
        pair: '',
        initialBalance: 100,
        // Market making specific
        spreadPercentage: 0.5,
        maxOrderSize: 0.01,
        rebalanceThreshold: 5,
        // DCA specific
        frequency: 'weekly',
        amount: 50,
        day: 'Monday',
    });

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [errors, setErrors] = useState<FormErrors>({});

    // Reset form when modal opens or agent type changes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                type: agentType,
                name: agentType === 'market-making' ? 'My Market Maker' : 'My DCA Strategy',
                pair: 'BTC/USDT',
                initialBalance: 100,
                // Market making specific
                spreadPercentage: 0.5,
                maxOrderSize: 0.01,
                rebalanceThreshold: 5,
                // DCA specific
                frequency: 'weekly',
                amount: 50,
                day: 'Monday',
            });
            setCurrentStep(1);
            setErrors({});
        }
    }, [isOpen, agentType]);

    const handleChange = (field: keyof FormData, value: string | number) => {
        setFormData({ ...formData, [field]: value });
        // Clear error for this field if exists
        if (errors[field as keyof FormErrors]) {
            const newErrors = { ...errors };
            delete newErrors[field as keyof FormErrors];
            setErrors(newErrors);
        }
    };

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.pair) newErrors.pair = 'Trading pair is required';
            if (!formData.initialBalance || formData.initialBalance <= 0) {
                newErrors.initialBalance = 'Initial balance must be greater than 0';
            }
        }

        if (step === 2) {
            if (formData.type === 'market-making') {
                if (formData.spreadPercentage <= 0) {
                    newErrors.spreadPercentage = 'Spread must be greater than 0';
                }
                if (formData.maxOrderSize <= 0) {
                    newErrors.maxOrderSize = 'Max order size must be greater than 0';
                }
                if (formData.rebalanceThreshold <= 0) {
                    newErrors.rebalanceThreshold = 'Rebalance threshold must be greater than 0';
                }
            } else { // DCA
                if (!formData.frequency) newErrors.frequency = 'Frequency is required';
                if (formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
                if (formData.frequency === 'weekly' && !formData.day) {
                    newErrors.day = 'Day is required for weekly frequency';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (): void => {
        if (validateStep(currentStep)) {
            setCurrentStep(2);
        }
    };

    const handleBack = (): void => {
        setCurrentStep(1);
    };

    //   const handleSubmit = (e: React.FormEvent): void => {
    //     e.preventDefault();

    //     if (validateStep(currentStep)) {
    //       let finalFormData = { ...formData };

    //       // Add additional data based on agent type
    //       if (formData.type === 'market-making') {
    //         finalFormData = {
    //           ...finalFormData,
    //           status: 'active',
    //           balance: { 
    //             base: formData.initialBalance / 2 / 30000, // Simulate BTC amount at $30,000
    //             quote: formData.initialBalance / 2 
    //           },
    //           profit: { daily: 0, weekly: 0, monthly: 0 },
    //           profitPercent: { daily: 0, weekly: 0, monthly: 0 },
    //           activeOrders: 0,
    //           trades: { daily: 0, total: 0 },
    //           settings: {
    //             spreadPercentage: parseFloat(formData.spreadPercentage.toString()),
    //             maxOrderSize: parseFloat(formData.maxOrderSize.toString()),
    //             rebalanceThreshold: parseFloat(formData.rebalanceThreshold.toString())
    //           }
    //         };
    //       } else { // DCA
    //         finalFormData = {
    //           ...finalFormData,
    //           status: 'active',
    //           balance: { quote: parseFloat(formData.initialBalance.toString()) },
    //           totalInvested: 0,
    //           currentValue: 0,
    //           profit: { total: 0 },
    //           profitPercent: { total: 0 },
    //           nextExecution: getNextExecutionDate(formData.frequency, formData.day),
    //           executionsCompleted: 0,
    //           settings: {
    //             frequency: formData.frequency,
    //             amount: parseFloat(formData.amount.toString()),
    //             day: formData.day
    //           }
    //         };
    //       }

    //       onCreateAgent(finalFormData);
    //     }
    //   };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (validateStep(currentStep)) {
            if (formData.type === 'market-making') {
                const marketMakingAgent = {
                    type: formData.type,
                    name: formData.name,
                    pair: formData.pair,
                    status: 'active' as const,
                    balance: {
                        base: formData.initialBalance / 2 / 30000,
                        quote: formData.initialBalance / 2
                    },
                    profit: { daily: 0, weekly: 0, monthly: 0 },
                    profitPercent: { daily: 0, weekly: 0, monthly: 0 },
                    activeOrders: 0,
                    trades: { daily: 0, total: 0 },
                    settings: {
                        spreadPercentage: parseFloat(formData.spreadPercentage.toString()),
                        maxOrderSize: parseFloat(formData.maxOrderSize.toString()),
                        rebalanceThreshold: parseFloat(formData.rebalanceThreshold.toString())
                    }
                };
                onCreateAgent(marketMakingAgent);
            } else {
                const dcaAgent = {
                    type: formData.type,
                    name: formData.name,
                    pair: formData.pair,
                    status: 'active' as const,
                    balance: { quote: parseFloat(formData.initialBalance.toString()) },
                    totalInvested: 0,
                    currentValue: 0,
                    profit: { total: 0 },
                    profitPercent: { total: 0 },
                    nextExecution: getNextExecutionDate(formData.frequency, formData.day),
                    executionsCompleted: 0,
                    settings: {
                        frequency: formData.frequency,
                        amount: parseFloat(formData.amount.toString()),
                        day: formData.day
                    }
                };
                onCreateAgent(dcaAgent);
            }
        }
    };

    const getNextExecutionDate = (frequency: string, day: string): string => {
        const now = new Date();
        let nextDate = new Date();

        if (frequency === 'daily') {
            nextDate.setDate(now.getDate() + 1);
        } else if (frequency === 'weekly') {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = now.getDay();
            const targetDay = daysOfWeek.indexOf(day);
            const daysToAdd = (targetDay + 7 - today) % 7 || 7;
            nextDate.setDate(now.getDate() + daysToAdd);
        } else if (frequency === 'biweekly') {
            nextDate.setDate(now.getDate() + 14);
        } else if (frequency === 'monthly') {
            nextDate.setMonth(now.getMonth() + 1);
        }

        return nextDate.toISOString().split('T')[0];
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        {formData.type === 'market-making' ? (
                            <>
                                <TrendingUp className="h-5 w-5 mr-2 text-teal-500" />
                                Create Market Making Agent
                            </>
                        ) : (
                            <>
                                <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                                Create DCA Agent
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {formData.type === 'market-making'
                            ? 'Set up an automated market maker to profit from price spreads.'
                            : 'Set up a Dollar-Cost Averaging (DCA) strategy for long-term investing.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Agent Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pair">Trading Pair</Label>
                                <Select
                                    value={formData.pair}
                                    onValueChange={(value) => handleChange('pair', value)}
                                >
                                    <SelectTrigger className={errors.pair ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select trading pair" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TRADING_PAIRS.map((pair) => (
                                            <SelectItem key={pair.value} value={pair.value}>
                                                <div className="flex items-center">
                                                    <span className="mr-2">{pair.icon}</span>
                                                    {pair.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.pair && (
                                    <p className="text-xs text-red-500">{errors.pair}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="initialBalance">Initial Balance (USDT)</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="h-4 w-4 text-gray-400" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="w-[200px] text-xs">
                                                    {formData.type === 'market-making'
                                                        ? 'The total funds allocated to this trading agent. Half will be converted to the base asset.'
                                                        : 'The total funds allocated for your DCA strategy.'}
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="initialBalance"
                                    type="number"
                                    min="10"
                                    value={formData.initialBalance}
                                    onChange={(e) => handleChange('initialBalance', parseFloat(e.target.value))}
                                    className={errors.initialBalance ? 'border-red-500' : ''}
                                />
                                {errors.initialBalance && (
                                    <p className="text-xs text-red-500">{errors.initialBalance}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4 py-4">
                            {formData.type === 'market-making' ? (
                                // Market Making Settings
                                <>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="spreadPercentage">Spread Percentage (%)</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="w-[200px] text-xs">
                                                            The percentage difference between buy and sell prices. Higher spread = higher potential profit but fewer trades.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Input
                                            id="spreadPercentage"
                                            type="number"
                                            min="0.1"
                                            step="0.1"
                                            value={formData.spreadPercentage}
                                            onChange={(e) => handleChange('spreadPercentage', parseFloat(e.target.value))}
                                            className={errors.spreadPercentage ? 'border-red-500' : ''}
                                        />
                                        {errors.spreadPercentage && (
                                            <p className="text-xs text-red-500">{errors.spreadPercentage}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="maxOrderSize">Max Order Size ({formData.pair.split('/')[0]})</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="w-[200px] text-xs">
                                                            The maximum size of each individual order in the base asset.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Input
                                            id="maxOrderSize"
                                            type="number"
                                            min="0.001"
                                            step="0.001"
                                            value={formData.maxOrderSize}
                                            onChange={(e) => handleChange('maxOrderSize', parseFloat(e.target.value))}
                                            className={errors.maxOrderSize ? 'border-red-500' : ''}
                                        />
                                        {errors.maxOrderSize && (
                                            <p className="text-xs text-red-500">{errors.maxOrderSize}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="rebalanceThreshold">Rebalance Threshold (%)</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="w-[200px] text-xs">
                                                            The agent will rebalance assets when the portfolio allocation deviates by this percentage.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Input
                                            id="rebalanceThreshold"
                                            type="number"
                                            min="1"
                                            step="1"
                                            value={formData.rebalanceThreshold}
                                            onChange={(e) => handleChange('rebalanceThreshold', parseFloat(e.target.value))}
                                            className={errors.rebalanceThreshold ? 'border-red-500' : ''}
                                        />
                                        {errors.rebalanceThreshold && (
                                            <p className="text-xs text-red-500">{errors.rebalanceThreshold}</p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                // DCA Settings
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="frequency">Purchase Frequency</Label>
                                        <Select
                                            value={formData.frequency}
                                            onValueChange={(value) => handleChange('frequency', value)}
                                        >
                                            <SelectTrigger className={errors.frequency ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {FREQUENCIES.map((freq) => (
                                                    <SelectItem key={freq.value} value={freq.value}>
                                                        {freq.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.frequency && (
                                            <p className="text-xs text-red-500">{errors.frequency}</p>
                                        )}
                                    </div>

                                    {formData.frequency === 'weekly' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="day">Day of Week</Label>
                                            <Select
                                                value={formData.day}
                                                onValueChange={(value) => handleChange('day', value)}
                                            >
                                                <SelectTrigger className={errors.day ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Select day" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {WEEKDAYS.map((day) => (
                                                        <SelectItem key={day.value} value={day.value}>
                                                            {day.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.day && (
                                                <p className="text-xs text-red-500">{errors.day}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="amount">Purchase Amount (USDT)</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 text-gray-400" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="w-[200px] text-xs">
                                                            The amount to invest on each purchase date.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Input
                                            id="amount"
                                            type="number"
                                            min="5"
                                            step="5"
                                            value={formData.amount}
                                            onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                                            className={errors.amount ? 'border-red-500' : ''}
                                        />
                                        {errors.amount && (
                                            <p className="text-xs text-red-500">{errors.amount}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <DialogFooter className="flex justify-between">
                        {currentStep === 1 ? (
                            <>
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="button" onClick={handleNext}>
                                    Next
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button type="button" variant="outline" onClick={handleBack}>
                                    Back
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700">
                                    <Check className="mr-2 h-4 w-4" />
                                    Create Agent
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAgentModal;