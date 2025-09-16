import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Filter, Search, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function CongressionalTradesList({ trades = []}) {
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const normalizedTrades = useMemo(() => {
        return trades.map((trade, index) => {
            let transactionDate;
            if (trade.transaction_date) {
                if (typeof trade.transaction_date === 'string' && trade.transaction_date.includes('-') && !trade.transaction_date.includes('T')) {
                    const parts = trade.transaction_date.split('-');
                    if (parts.length === 3 && parts[2].length === 4) {
                        transactionDate = new Date(parts[2], parts[0] - 1, parts[1]);
                    } else {
                        transactionDate = new Date(trade.transaction_date);
                    }
                } else {
                    transactionDate = new Date(trade.transaction_date);
                }
            }

            // Normalize trade type
            const tradeType = (trade.trade_type || '').toLowerCase().trim();
            const isBuy = tradeType === 'purchase' || tradeType === 'buy';
            const normalizedType = isBuy ? 'buy' : 
                                  (tradeType.includes('sale') || tradeType === 'sell') ? 'sell' : tradeType;

            return {
                id: index,
                firstName: trade.first_name || '',
                lastName: trade.last_name || '',
                fullName: `${trade.first_name || ''} ${trade.last_name || ''}`.trim(),
                stockTicker: trade.stock_ticker || trade.stock_id || 'N/A',
                stockId: trade.stock_id,
                tradeType: normalizedType,
                tradeValue: trade.trade_value || 'Unknown',
                transactionDate: transactionDate,
                notifiedDate: trade.notified_date ? new Date(trade.notified_date) : null,
                notes: trade.notes || '',
                trader: trade.trader || 'Self'
            };
        }).filter(trade => 
            trade.stockId && 
            trade.stockId !== 'NA' && 
            trade.stockId !== 'N/A' && 
            trade.stockId !== '' &&
            trade.transactionDate && 
            !isNaN(trade.transactionDate.getTime())
        );
    }, [trades]);

    const filteredAndSortedTrades = useMemo(() => {
        let filtered = normalizedTrades;

        if (filterType !== 'all') {
            filtered = filtered.filter(trade => trade.tradeType === filterType);
        }

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(trade => 
                trade.fullName.toLowerCase().includes(search) ||
                trade.stockTicker.toLowerCase().includes(search) ||
                trade.notes.toLowerCase().includes(search)
            );
        }

        filtered.sort((a, b) => {
            let aVal, bVal;
            
            switch (sortBy) {
                case 'date':
                    aVal = a.transactionDate.getTime();
                    bVal = b.transactionDate.getTime();
                    break;
                case 'name':
                    aVal = a.fullName.toLowerCase();
                    bVal = b.fullName.toLowerCase();
                    break;
                case 'stock':
                    aVal = a.stockTicker.toLowerCase();
                    bVal = b.stockTicker.toLowerCase();
                    break;
                case 'type':
                    aVal = a.tradeType;
                    bVal = b.tradeType;
                    break;
                default:
                    return 0;
            }

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [normalizedTrades, sortBy, sortOrder, filterType, searchTerm]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getTradeIcon = (type) => {
        return type === 'buy' ? 
            <TrendingUp className="w-4 h-4 text-green-500" /> : 
            <TrendingDown className="w-4 h-4 text-red-500" />;
    };

    const getTradeTypeClass = (type) => {
        return type === 'buy' ? 
            'bg-green-100 text-green-800 border-green-200' : 
            'bg-red-100 text-red-800 border-red-200';
    };

    return (
        <div className="w-full text-white p-6 rounded-lg" style={{ backgroundColor: 'rgba(57, 62, 70, 0.564)' }}>
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Congressional Trading Activity</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="relative flex-1 min-w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, stock, or notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                            style={{ backgroundColor: 'rgba(57, 62, 70, 0.8)' }}
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                        style={{ backgroundColor: 'rgba(57, 62, 70, 0.8)' }}
                    >
                        <option value="all">All Trades</option>
                        <option value="buy">Buys Only</option>
                        <option value="sell">Sells Only</option>
                    </select>
                </div>

                <div className="text-sm text-gray-400 mb-4">
                    Showing {filteredAndSortedTrades.length} of {normalizedTrades.length} trades
                </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredAndSortedTrades.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No trades found matching your criteria</p>
                    </div>
                ) : (
                    filteredAndSortedTrades.map((trade) => (
                        <div 
                            key={trade.id} 
                            className="rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
                            style={{ backgroundColor: 'rgba(57, 62, 70, 0.8)' }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {getTradeIcon(trade.tradeType)}
                                    <div>
                                        <h3 className="font-semibold text-white">{trade.fullName}</h3>
                                        <p className="text-sm text-gray-400">
                                            {trade.trader !== 'Self' && `${trade.trader} • `}
                                            {formatDate(trade.transactionDate)}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTradeTypeClass(trade.tradeType)}`}>
                                    {trade.tradeType.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">
                                        {trade.stockTicker.substring(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{trade.stockTicker}</p>
                                        <p className="text-gray-400">Stock</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-green-400" />
                                    <div>
                                        <p className="font-medium text-white">{trade.tradeValue}</p>
                                        <p className="text-gray-400">Value Range</p>
                                    </div>
                                </div>

                                {trade.notes && (
                                    <div className="md:col-span-1">
                                        <p className="font-medium text-white truncate" title={trade.notes}>
                                            {trade.notes}
                                        </p>
                                        <p className="text-gray-400">Company</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Sort Options */}
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                {[
                    { key: 'date', label: 'Date', icon: Calendar },
                    { key: 'name', label: 'Name', icon: null },
                    { key: 'stock', label: 'Stock', icon: null },
                    { key: 'type', label: 'Type', icon: null }
                ].map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => handleSort(key)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                            sortBy === key 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        style={{ 
                            backgroundColor: sortBy === key ? undefined : 'rgba(57, 62, 70, 0.8)'
                        }}
                    >
                        {Icon && <Icon className="w-3 h-3" />}
                        {label}
                        {sortBy === key && (
                            sortOrder === 'asc' ? 
                                <ChevronUp className="w-3 h-3" /> : 
                                <ChevronDown className="w-3 h-3" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}