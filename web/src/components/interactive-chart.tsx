"use client";

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// コンポーネントのプロパティ型定義
interface ChartProps {
  symbol: string;
  name: string;
  history: number[];
  type: 'stock' | 'crypto';
}

export default function InteractiveChart({ symbol, name, history, type }: ChartProps) {
  // 履歴データを Recharts 用のデータ形式に変換
  const chartData = history.map((val, index) => ({
    name: `取引履歴 #${index + 1}`,
    price: val,
  }));

  // 最初と最後の値を比較して、上昇（緑）か下落（赤）かを判定
  const isUp = history.length >= 2 ? history[history.length - 1] >= history[0] : true;
  const strokeColor = isUp ? '#10b981' : '#ef4444'; // エメラルドグリーン または レッド
  const fillColor = isUp ? 'url(#colorUp)' : 'url(#colorDown)';

  // IP形式へのフォーマッタ
  const formatPrice = (value: number) => {
    const formatted = new Intl.NumberFormat('ja-JP').format(value);
    return `${formatted} IP`;
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col justify-between h-[450px] transition-all duration-300 hover:shadow-md">
      {/* ヘッダー情報 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded border border-gray-200/55">
            {type === 'stock' ? '株式' : '仮想通貨'}
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-2 flex items-baseline gap-2">
            {name} <span className="text-gray-400 text-xs font-semibold">({symbol})</span>
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 font-medium">現在価格</div>
          <div className={`text-2xl font-extrabold tracking-tight ${isUp ? 'text-emerald-600' : 'text-red-600'} mt-1`}>
            {formatPrice(history[history.length - 1] || 0)}
          </div>
        </div>
      </div>

      {/* チャート描画部分 */}
      <div className="flex-1 w-full relative min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 5, left: -10, bottom: 0 }}
          >
            <defs>
              {/* 上昇時のグラデーション（エメラルドグリーンから透明へ） */}
              <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              {/* 下落時のグラデーション（レッドから透明へ） */}
              <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            {/* 横のグリッド線のみを表示 */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="name" 
              hide={true} 
            />
            
            <YAxis 
              domain={['dataMin - 2%', 'dataMax + 2%']}
              tickFormatter={(v) => {
                if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M IP`;
                if (v >= 1000) return `${(v / 1000).toFixed(0)}K IP`;
                return `${v} IP`;
              }}
              stroke="#94a3b8"
              fontSize={11}
              axisLine={false}
              tickLine={false}
            />
            
            {/* ホバー時に価格と時点を表示するカスタムツールチップ */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-1 pointer-events-none transition-all duration-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{data.name}</span>
                      <span className="text-sm font-extrabold text-slate-800">{formatPrice(data.price)}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={fillColor}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, elevation: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
