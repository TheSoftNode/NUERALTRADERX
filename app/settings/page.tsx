"use client";

import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Save,
    Copy,
    Check,
    Info,
    Wallet,
    User,
    Bell,
    Lock,
    Mail,
    RefreshCw,
    Trash2,
} from 'lucide-react';
import { NearContext } from '@/near-setup/near';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Type definitions
interface UserSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    tradeNotifications: boolean;
    depositNotifications: boolean;
    withdrawalNotifications: boolean;
    errorNotifications: boolean;
    tradingCurrency: string;
    slippageTolerance: number;
    gasSettings: 'low' | 'medium' | 'high';
    defaultAgent: string;
}

interface ApiKey {
    id: string;
    name: string;
    createdAt: string;
    lastUsed: string | null;
    permissions: string[];
}

const SettingsPage = () => {
    const { signedAccountId } = useContext(NearContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [copied, setCopied] = useState(false);
    const [userSettings, setUserSettings] = useState<UserSettings>({
        emailNotifications: true,
        smsNotifications: false,
        tradeNotifications: true,
        depositNotifications: true,
        withdrawalNotifications: true,
        errorNotifications: true,
        tradingCurrency: 'usd',
        slippageTolerance: 0.5,
        gasSettings: 'medium',
        defaultAgent: 'mm-1'
    });
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([
        {
            id: 'key-1',
            name: 'API Key 1',
            createdAt: '2025-01-15T12:00:00Z',
            lastUsed: '2025-02-28T15:30:45Z',
            permissions: ['read', 'trade']
        },
        {
            id: 'key-2',
            name: 'Read-only Key',
            createdAt: '2025-02-01T09:15:30Z',
            lastUsed: null,
            permissions: ['read']
        }
    ]);

    useEffect(() => {
        // Simulate loading data
        const loadData = async () => {
            setIsLoading(true);
            // In a real app, fetch user settings and API keys from your backend
            await new Promise(resolve => setTimeout(resolve, 800));
            setIsLoading(false);
        };

        loadData();
    }, []);

    const handleSettingChange = (setting: keyof UserSettings, value: any) => {
        setUserSettings({
            ...userSettings,
            [setting]: value
        });
    };

    const saveSettings = async () => {
        setIsSaving(true);
        // In a real app, send settings to your backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const copyAccountId = () => {
        if (signedAccountId) {
            navigator.clipboard.writeText(signedAccountId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Manage your account preferences and API keys
                </p>
            </motion.div>

            {/* Settings Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Tabs defaultValue="account" className="space-y-6">
                    <TabsList className="grid grid-cols-3 sm:w-[400px]">
                        <TabsTrigger value="account" className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Account
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="api" className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            API Keys
                        </TabsTrigger>
                    </TabsList>

                    {/* Account Tab */}
                    <TabsContent value="account">
                        <div className="grid gap-6">
                            {/* Account Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <User className="h-5 w-5 mr-2 text-indigo-500" />
                                        Account Information
                                    </CardTitle>
                                    <CardDescription>
                                        View and manage your account details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="accountId">NEAR Account ID</Label>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 px-2"
                                                                onClick={copyAccountId}
                                                            >
                                                                {copied ? (
                                                                    <Check className="h-4 w-4 text-green-500" />
                                                                ) : (
                                                                    <Copy className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Copy account ID</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <Input
                                                id="accountId"
                                                value={signedAccountId}
                                                readOnly
                                                className="bg-gray-50 dark:bg-gray-800"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" placeholder="your@email.com" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Used for notifications and recovery
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                            Trading Preferences
                                        </h3>
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="tradingCurrency">Default Currency</Label>
                                                <Select
                                                    value={userSettings.tradingCurrency}
                                                    onValueChange={(value) => handleSettingChange('tradingCurrency', value)}
                                                >
                                                    <SelectTrigger id="tradingCurrency">
                                                        <SelectValue placeholder="Select currency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="usd">USD</SelectItem>
                                                        <SelectItem value="eur">EUR</SelectItem>
                                                        <SelectItem value="gbp">GBP</SelectItem>
                                                        <SelectItem value="jpy">JPY</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="slippageTolerance">Slippage Tolerance (%)</Label>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Info className="h-4 w-4 text-gray-400" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="max-w-xs">
                                                                    Maximum allowed price movement before a trade is executed.
                                                                    Lower values may cause trades to fail in volatile markets.
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                                <Input
                                                    id="slippageTolerance"
                                                    type="number"
                                                    min="0.1"
                                                    max="5"
                                                    step="0.1"
                                                    value={userSettings.slippageTolerance}
                                                    onChange={(e) => handleSettingChange('slippageTolerance', parseFloat(e.target.value))}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="gasSettings">Gas Price Settings</Label>
                                                <Select
                                                    value={userSettings.gasSettings}
                                                    onValueChange={(value: 'low' | 'medium' | 'high') => handleSettingChange('gasSettings', value)}
                                                >
                                                    <SelectTrigger id="gasSettings">
                                                        <SelectValue placeholder="Select gas setting" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="low">Low (Slower, cheaper)</SelectItem>
                                                        <SelectItem value="medium">Medium (Balanced)</SelectItem>
                                                        <SelectItem value="high">High (Faster, more expensive)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="defaultAgent">Default Agent</Label>
                                                <Select
                                                    value={userSettings.defaultAgent}
                                                    onValueChange={(value) => handleSettingChange('defaultAgent', value)}
                                                >
                                                    <SelectTrigger id="defaultAgent">
                                                        <SelectValue placeholder="Select default agent" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="mm-1">BTC Market Maker</SelectItem>
                                                        <SelectItem value="dca-1">ETH Weekly DCA</SelectItem>
                                                        <SelectItem value="mm-2">NEAR Market Maker</SelectItem>
                                                        <SelectItem value="dca-2">NEAR Daily DCA</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button
                                        onClick={saveSettings}
                                        disabled={isLoading || isSaving}
                                        className="flex items-center"
                                    >
                                        {isSaving ? (
                                            <>
                                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Connected Wallets */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Wallet className="h-5 w-5 mr-2 text-indigo-500" />
                                        Connected Wallets
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your connected wallets and permissions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-4">
                                                    <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-medium text-gray-900 dark:text-white">NEAR Wallet</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Connected: {signedAccountId ? signedAccountId : 'Not connected'}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="outline">Disconnect</Button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                                                    <Wallet className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-medium text-gray-900 dark:text-white">MetaMask</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Not connected
                                                    </p>
                                                </div>
                                            </div>
                                            <Button>Connect</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="h-5 w-5 mr-2 text-indigo-500" />
                                    Notification Preferences
                                </CardTitle>
                                <CardDescription>
                                    Configure how and when you receive notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Notification Channels
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-5 w-5 text-gray-500" />
                                                <Label htmlFor="emailNotifications" className="cursor-pointer">
                                                    Email Notifications
                                                </Label>
                                            </div>
                                            <Switch
                                                id="emailNotifications"
                                                checked={userSettings.emailNotifications}
                                                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-5 w-5 text-gray-500" />
                                                <Label htmlFor="smsNotifications" className="cursor-pointer">
                                                    SMS Notifications
                                                </Label>
                                            </div>
                                            <Switch
                                                id="smsNotifications"
                                                checked={userSettings.smsNotifications}
                                                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Notification Types
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="tradeNotifications" className="cursor-pointer">
                                                    Trade Executions
                                                </Label>
                                            </div>
                                            <Switch
                                                id="tradeNotifications"
                                                checked={userSettings.tradeNotifications}
                                                onCheckedChange={(checked) => handleSettingChange('tradeNotifications', checked)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="depositNotifications" className="cursor-pointer">
                                                    Deposits
                                                </Label>
                                            </div>
                                            <Switch
                                                id="depositNotifications"
                                                checked={userSettings.depositNotifications}
                                                onCheckedChange={(checked) => handleSettingChange('depositNotifications', checked)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="withdrawalNotifications" className="cursor-pointer">
                                                    Withdrawals
                                                </Label>
                                            </div>
                                            <Switch
                                                id="withdrawalNotifications"
                                                checked={userSettings.withdrawalNotifications}
                                                onCheckedChange={(checked) => handleSettingChange('withdrawalNotifications', checked)}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Label htmlFor="errorNotifications" className="cursor-pointer">
                                                    Errors & Alerts
                                                </Label>
                                            </div>
                                            <Switch
                                                id="errorNotifications"
                                                checked={userSettings.errorNotifications}
                                                onCheckedChange={(checked) => handleSettingChange('errorNotifications', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button
                                    onClick={saveSettings}
                                    disabled={isLoading || isSaving}
                                    className="flex items-center"
                                >
                                    {isSaving ? (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* API Keys Tab */}
                    <TabsContent value="api">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Lock className="h-5 w-5 mr-2 text-indigo-500" />
                                    API Keys
                                </CardTitle>
                                <CardDescription>
                                    Manage your API keys for programmatic access
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Your API Keys
                                    </h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead>Last Used</TableHead>
                                                <TableHead>Permissions</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {apiKeys.map((key) => (
                                                <TableRow key={key.id}>
                                                    <TableCell>{key.name}</TableCell>
                                                    <TableCell>{formatDate(key.createdAt)}</TableCell>
                                                    <TableCell>{formatDate(key.lastUsed)}</TableCell>
                                                    <TableCell>
                                                        {key.permissions.map((permission, index) => (
                                                            <Badge key={index} variant="outline" className="mr-1">
                                                                {permission}
                                                            </Badge>
                                                        ))}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Create New API Key
                                    </h3>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="apiKeyName">Key Name</Label>
                                            <Input id="apiKeyName" placeholder="e.g., Trading Bot Key" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Permissions</Label>
                                            <div className="flex gap-2">
                                                <Badge variant="outline" className="cursor-pointer">
                                                    Read
                                                </Badge>
                                                <Badge variant="outline" className="cursor-pointer">
                                                    Trade
                                                </Badge>
                                                <Badge variant="outline" className="cursor-pointer">
                                                    Withdraw
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button className="flex items-center">
                                            <Lock className="mr-2 h-4 w-4" />
                                            Generate API Key
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
};

export default SettingsPage;