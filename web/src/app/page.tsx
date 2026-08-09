"use client";

import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import InteractiveChart from '../components/interactive-chart';

// data.json の構造に対応する型定義
interface MarketData {
  market: {
    stocks: { [key: string]: number };
    crypto: { [key: string]: number };
  };
  marketHistory: {
    stocks: { [key: string]: number[] };
    crypto: { [key: string]: number[] };
  };
}

// 銘柄の英語シンボルから日本語の表示名称へのマッピング
const SYMBOL_NAMES: { [key: string]: string } = {
  TELSA: 'TELSA (株)',
  GIGOLE: 'GIGOLE (株)',
  MVIDIA: 'MVIDIA (株)',
  RMN: 'Ramune Coin',
  OPABI: 'Opabium',
  IKISUGI: 'Ikisugi Coin',
};

// IPのフォーマット関数
const formatPrice = (value: number) => {
  const formatted = new Intl.NumberFormat('ja-JP').format(value);
  return `${formatted} IP`;
};

export default function Home() {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('TELSA');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [prevPrices, setPrevPrices] = useState<{ [key: string]: number }>({});
  const [flashStates, setFlashStates] = useState<{ [key: string]: 'up' | 'down' | null }>({});

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Socket.io サーバーに接続 (同じホストのためパスは自動解決)
    const socket = io();
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket.io に接続しました');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket.io から切断しました');
    });

    // 最新データ受信時のハンドラ
    socket.on('market-data', (data: MarketData) => {
      setMarketData((prevData) => {
        if (!prevData) {
          // 初回受信時は比較を行わない
          return data;
        }

        // 価格変動のフラッシュエフェクト用ステート計算
        const newFlashStates: { [key: string]: 'up' | 'down' | null } = {};

        // 株式の変動確認
        Object.keys(data.market.stocks).forEach((sym) => {
          const newPrice = data.market.stocks[sym];
          const oldPrice = prevData.market.stocks[sym];
          if (newPrice > oldPrice) newFlashStates[sym] = 'up';
          else if (newPrice < oldPrice) newFlashStates[sym] = 'down';
        });

        // 仮想通貨の変動確認
        Object.keys(data.market.crypto).forEach((sym) => {
          const newPrice = data.market.crypto[sym];
          const oldPrice = prevData.market.crypto[sym];
          if (newPrice > oldPrice) newFlashStates[sym] = 'up';
          else if (newPrice < oldPrice) newFlashStates[sym] = 'down';
        });

        setFlashStates(newFlashStates);

        // 1秒後にフラッシュ状態をリセット
        setTimeout(() => {
          setFlashStates((prev) => {
            const reset = { ...prev };
            Object.keys(newFlashStates).forEach((sym) => {
              reset[sym] = null;
            });
            return reset;
          });
        }, 1000);

        return data;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!marketData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50">
        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-600">データを読み込み中...</span>
        </div>
      </div>
    );
  }

  // 選択されている銘柄の履歴とタイプを取得
  let selectedHistory: number[] = [];
  let selectedType: 'stock' | 'crypto' = 'stock';
  let selectedName = SYMBOL_NAMES[selectedSymbol] || selectedSymbol;

  if (marketData.marketHistory.stocks[selectedSymbol]) {
    selectedHistory = marketData.marketHistory.stocks[selectedSymbol];
    selectedType = 'stock';
  } else if (marketData.marketHistory.crypto[selectedSymbol]) {
    selectedHistory = marketData.marketHistory.crypto[selectedSymbol];
    selectedType = 'crypto';
  }

  // 直近履歴（1つ前のポイント）との価格変化率を算出する関数
  const getChangePercent = (history: number[]) => {
    if (history.length < 2) return 0;
    const current = history[history.length - 1];
    const prev = history[history.length - 2];
    return ((current - prev) / prev) * 100;
  };

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-800 pb-16 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ナビゲーションバー */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Ikisugi Manager Dashboard</h1>
            </div>
          </div>

          {/* リアルタイムWebSocket接続インジケータ */}
          <div className="flex items-center gap-2 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/40 text-xs font-semibold text-slate-600">
            {isConnected ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-emerald-600 flex items-center gap-1">WebSocket Connected</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                </span>
                <span className="text-[11px] text-red-500">オフラインまたは接続中</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* メインレイアウト */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* 左側：株式と仮想通貨の銘柄リスト */}
        <section className="lg:col-span-5 flex flex-col gap-6">

          {/* 株式カードグループ */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              株
            </h2>
            <div className="flex flex-col gap-2">
              {Object.keys(marketData.market.stocks).map((sym) => {
                const price = marketData.market.stocks[sym];
                const history = marketData.marketHistory.stocks[sym] || [];
                const changePct = getChangePercent(history);
                const isSelected = selectedSymbol === sym;
                const flash = flashStates[sym];

                return (
                  <button
                    key={sym}
                    onClick={() => setSelectedSymbol(sym)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${isSelected
                        ? 'border-emerald-500 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-500/20'
                        : 'border-slate-200/50 bg-white hover:bg-slate-50/50 hover:border-slate-300'
                      } ${flash === 'up' ? 'bg-emerald-100/50 border-emerald-400' : ''
                      } ${flash === 'down' ? 'bg-red-100/50 border-red-400' : ''
                      }`}
                  >
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{SYMBOL_NAMES[sym] || sym}</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">{sym}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-extrabold text-sm transition-colors duration-200 ${flash === 'up' ? 'text-emerald-600 scale-[1.02]' :
                          flash === 'down' ? 'text-red-600 scale-[1.02]' :
                            'text-slate-800'
                        }`}>
                        {formatPrice(price)}
                      </div>
                      <div className={`text-[11px] font-bold mt-1 flex items-center justify-end gap-0.5 ${changePct >= 0 ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                        {changePct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 仮想通貨カードグループ */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              仮想通貨
            </h2>
            <div className="flex flex-col gap-2">
              {Object.keys(marketData.market.crypto).map((sym) => {
                const price = marketData.market.crypto[sym];
                const history = marketData.marketHistory.crypto[sym] || [];
                const changePct = getChangePercent(history);
                const isSelected = selectedSymbol === sym;
                const flash = flashStates[sym];

                return (
                  <button
                    key={sym}
                    onClick={() => setSelectedSymbol(sym)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${isSelected
                        ? 'border-emerald-500 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-500/20'
                        : 'border-slate-200/50 bg-white hover:bg-slate-50/50 hover:border-slate-300'
                      } ${flash === 'up' ? 'bg-emerald-100/50 border-emerald-400' : ''
                      } ${flash === 'down' ? 'bg-red-100/50 border-red-400' : ''
                      }`}
                  >
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{SYMBOL_NAMES[sym] || sym}</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">{sym}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-extrabold text-sm transition-colors duration-200 ${flash === 'up' ? 'text-emerald-600 scale-[1.02]' :
                          flash === 'down' ? 'text-red-600 scale-[1.02]' :
                            'text-slate-800'
                        }`}>
                        {formatPrice(price)}
                      </div>
                      <div className={`text-[11px] font-bold mt-1 flex items-center justify-end gap-0.5 ${changePct >= 0 ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                        {changePct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 右側：インタラクティブ詳細チャート */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {selectedHistory.length > 0 ? (
            <InteractiveChart
              symbol={selectedSymbol}
              name={selectedName}
              history={selectedHistory}
              type={selectedType}
            />
          ) : (
            <div className="w-full bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-center h-[450px]">
              <span className="text-sm text-slate-400 font-medium">表示できるチャートデータがありません</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
